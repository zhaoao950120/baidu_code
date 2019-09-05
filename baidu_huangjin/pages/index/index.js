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
        name: "推荐",
        index:0,
        image:"../../images/icon_whzx.png"
      },
      {
        id: 302,
        name: "国际黄金",
        index:0,
        image:"../../images/icon_whzx.png"
      },
      {
        id: 303,
        name: "  期货黄金",
        index:1,
        image:"../../images/icon_ozyh.png"
      },
      {
        id: 306,
        name: " 现货黄金",
        index:2,
        image:"../../images/icon_zgyh.png"
      }, {
        id: 311,
        name: "白银期货",
        index:3,
        image:"../../images/icon_mlc.png"
      },
      {
        id: 318,
        name: " 黄金要闻",
        index:4,
        image:"../../images/icon_hyhd.png"
      },
      {
        id: 319,
        name: "金市时讯",
        index:5,
        image:"../../images/icon_whjq.png"
      },
      {
        id: 321,
        name: " 黄金百科",
        index:6,
        image:"../../images/icon_whzx.png"
      },
    ]
    },
    onShow() {
        swan.setPageInfo({
            title: '今日黄金价格_黄金走势分析_金价查询,中亿财经黄金网专注黄金领域',
            keywords: '黄金价格行情，黄金多少钱一克，黄金走势分析',
            description: '中亿财经黄金网是专业的金融投资服务平台，全方位提供金融市场行情及行业资讯，包括国际国内黄金、黄金投资、黄金交易、黄金价格行情、黄金现价实时行情等内容，聚力为',
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
            data: { siteId:123503,pageSize:10,pageNum:1,columnId:that.data.classid},
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
            data: { siteId:123503,pageSize:10,pageNum:1},
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
            data: { pageSize:10,pageNum:1,siteId:123503,columnId:that.data.classid},
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
            data: { siteId:123503,pageSize:10,pageNum:that.data.pageIndex,columnId:that.data.classid},
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
