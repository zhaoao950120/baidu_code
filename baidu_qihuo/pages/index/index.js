const app = getApp()
Page({
    data: {
        curTab:0,
        userInfo: {},
        hasUserInfo: false,
        canIUse: swan.canIUse('button.open-type.getUserInfo'),
        list:[],
        slideshowList:[],
        objPage:[],
        pageIndex:1,
        isScrolling:false,
        articleId:"",
        classid:"",
        lunboFlag:true,
        tabList: [
        {
        id:229,
        name: "期货要闻",
        index:0,
        image:"../../images/icon_whzx.png"
      },
      {
        id: 230,
        name: "期货聚焦",
        index:0,
        image:"../../images/icon_whzx.png"
      },
      {
        id: 231,
        name: "  期货报告",
        index:1,
        image:"../../images/icon_ozyh.png"
      },
      {
        id: 270,
        name: " 原油期货",
        index:2,
        image:"../../images/icon_zgyh.png"
      }, {
        id: 245,
        name: "期货开户",
        index:3,
        image:"../../images/icon_mlc.png"
      },
      {
        id: 241,
        name: " 期货入门",
        index:4,
        image:"../../images/icon_hyhd.png"
      },
      {
        id: 247,
        name: "技术分析",
        index:5,
        image:"../../images/icon_whjq.png"
      },
    ]
    },
    onShow() {
        swan.setPageInfo({
            title: '中亿财经期货网_提供期货行情价格与市场资讯_期货入门学习',
            keywords: '期货价格，期货入门，期货学习',
            description: '中亿财经期货网是广大期货投资者都在使用的期货门户，提供期货市场动态，期货交易所动态与查询，期货价格数据，期货百科入门知识，期货学习，期货交易技巧等信息内容，帮助广大投资者全方位渗透期货市场。',
        })
    },
    onLoad() {
        console.log(this.data.lunboFlag)
        // 列表数据
        var that = this;
        swan.showLoading({ title: '数据加载中',mask: true,});
        // console.log(that.data.classid)
        swan.request({
            url: 'https://lts.zhongyi9999.com/lts/app/article/page',
            method: 'POST',  dataType: 'json',
            data: { siteId:123502,pageSize:10,pageNum:1,columnId:that.data.classid},
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                swan.hideLoading();
                // that.setData({news_list:res.data.data.news_list.data});
                that.setData({list:res.data.data});
                // console.log(res.data.data)
            }
        });
        // 轮播图
        swan.request({
            url: 'https://lts.zhongyi9999.com/lts/app/article/page',
            method: 'POST',  dataType: 'json',
            data: { siteId:123502,pageSize:10,pageNum:1},
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                swan.hideLoading();
                // that.setData({news_list:res.data.data.news_list.data});
                that.setData({slideshowList:res.data.data});
                // console.log(res.data.data)
            }
        });
    },
    // 分类筛选
    selectTab(e) {
        // console.log(e)
        let index = e.currentTarget.dataset.index;
     
        console.log( this.data.lunboFlag)
        this.setData({
            curTab: index,
        })
        this.data.pageIndex = 1
        this.data.classid = e.currentTarget.dataset.classid;
        // console.log(this.data.classid)
        let that = this
        swan.request({
            url: 'https://lts.zhongyi9999.com/lts/app/article/page',
            method: 'post',  dataType: 'json',
            data: { pageSize:10,pageNum:1,siteId:123502,columnId:that.data.classid},
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                   // this.data.lunboFlag = false
                    if(index!=0){
                        that.setData({lunboFlag:false});
                    }else{
                        that.setData({lunboFlag:true});
                    }
                swan.hideLoading();
                // that.setData({news_list:res.data.data.news_list.data});
                that.setData({list:res.data.data});
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
        //业务逻辑代码
        let that = this
        console.log(that.data.classid)
        swan.showLoading({ title: '数据加载中',mask: true,});
        swan.request({
            url: 'https://lts.zhongyi9999.com/lts/app/article/page',
            method: 'POST',  dataType: 'json',
            data: { siteId:123502,pageSize:10,pageNum:that.data.pageIndex,columnId:that.data.classid},
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
})
