const app = getApp()
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: swan.canIUse('button.open-type.getUserInfo'),
        list:[],
        obj:[],
        objPage:[],
        pageIndex:1,
        isScrolling:false,
        articleId:"",
        classid:149,
        tabList: [
        {
        id: 149,
        name: "外汇资讯",
        index:0,
        image:"../../images/icon_whzx.png"
      },
      {
        id: 118,
        name: "  欧洲央行",
        index:1,
        image:"../../images/icon_ozyh.png"
      },
      {
        id: 120,
        name: " 中国央行",
        index:2,
        image:"../../images/icon_zgyh.png"
      }, {
        id: 117,
        name: "美联储",
        index:3,
        image:"../../images/icon_ozyh.png"
      },
      {
        id: 188,
        name: " 行业活动",
        index:4,
        image:"../../images/icon_hyhd.png"
      },
      {
        id: 132,
        name: "外汇技巧",
        index:5,
        image:"../../images/icon_whjq.png"
      },
      {
        id: 126,
        name: " 外汇知识",
        index:6,
        image:"../../images/icon_whzs.png"
      },
    ]
    },
    onShow() {
        swan.setPageInfo({
            title: '中亿财经外汇网_提供外汇资讯与汇率行情查询_外汇百科入门学习',
            keywords: '外汇汇率，外汇行情，外汇学习',
            description: '国内广大外汇投资者都在使用的外汇学习平台，为炒外汇投资者提供外汇热点、汇市热门资讯、今日时事新闻等内容,助您了解更多的外汇交易知识,为您的外汇投资提供数据参考依据。',
        })
    },
    onLoad() {
        // 列表数据
        var that = this;
        swan.showLoading({ title: '数据加载中',mask: true,});
        // console.log(that.data.classid)
        swan.request({
            url: 'https://lts.zhongyi9999.com/lts/app/article/page',
            method: 'POST',  dataType: 'json',
            data: { siteId:123470,pageSize:10,pageNum:1,columnId:that.data.classid},
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                swan.hideLoading();
                // that.setData({news_list:res.data.data.news_list.data});
                that.setData({list:res.data.data});
                console.log(res.data.data)
            }
        });

        swan.request({
            url: 'https://openapi.baidu.com/oauth/2.0/token',
            method: 'get',  dataType: 'json',
            data: { grant_type:"client_credentials",client_id:16212869,client_secret:"YHeavmbjUuz6egw0XDKxWXXZTzQ8C9t2",scope:"smartapp_snsapi_base"},
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                console.log(res)
            }
        });
        // 轮播图
        swan.request({
            url: 'https://lts.zhongyi9999.com/lts/app/article/page',
            method: 'POST',  dataType: 'json',
            data: { siteId:123470,pageSize:10,pageNum:1},
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                swan.hideLoading();
                // that.setData({news_list:res.data.data.news_list.data});
                that.setData({obj:res.data.data});
                // console.log(res.data.data)
            }
        });
    },
    // 详情跳转
    gotoPage(option){
        console.log(option)
        this.data.articleId=option.currentTarget.dataset.s
        this.data.classid = option.currentTarget.dataset.classid;
        console.log(this.data.classid)
        swan.navigateTo({
            url: "/pages/detail/detail?classid="+this.data.classid+'&articleId='+this.data.articleId
        });
    },
    // 滚动底部加载
    lower() {
        if(this.data.isScrolling===true)
        return;
        this.data.isScrolling=true;
        this.data.pageIndex = this.data.pageIndex +1
        console.log( this.data.pageIndex)
        //业务逻辑代码
        let that = this
        console.log(that.data.classid)
        swan.showLoading({ title: '数据加载中',mask: true,});
        swan.request({
            url: 'https://lts.zhongyi9999.com/lts/app/article/page',
            method: 'POST',  dataType: 'json',
            data: { siteId:123470,pageSize:10,pageNum:that.data.pageIndex,columnId:that.data.classid},
            header: { 'content-type': 'application/x-www-form-urlencoded' },
             success: function (res) {
                swan.hideLoading();
                that.data.objPage = that.data.list;
                for(var i=0;i<res.data.data.length;i++){
                    that.data.objPage.push(res.data.data[i])
                }
                console.log(that.data.objPage)
                that.setData({list:that.data.objPage});
                that.data.isScrolling=false;
            }
        }); 
        // console.log(this.data.pageIndex)
    },
    // 分类筛选
    selectTab(option){
        // console.log(option.currentTarget.dataset.data)
        var id = option.currentTarget.dataset.data
        console.log(id)
        this.data.classid = id
        let that = this
        this.data.pageIndex = 1
        swan.showLoading({ title: '数据加载中',mask: true,});
        swan.request({
            url: 'https://lts.zhongyi9999.com/lts/app/article/page',
            method: 'POST',  dataType: 'json',
            data: { siteId:123470,pageSize:10,pageNum:that.data.pageIndex,columnId:id},
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                // console.log(res.data.data)
                swan.hideLoading();
                // that.setData({news_list:res.data.data.news_list.data});
                that.setData({list:res.data.data});
            }
        }); 
    }
})
