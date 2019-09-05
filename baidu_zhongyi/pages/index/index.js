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
        classid:"0",
        lunboFlag:true,
        tabList: [
        {
        id:0,
        name: "全部",
        index:0,
        image:"../../images/icon_whzx.png"
      },
      {
        id: 82,
        name: "资讯",
        index:0,
        image:"../../images/icon_whzx.png"
      },
      {
        id: 285,
        name: "商品",
        index:1,
        image:"../../images/icon_ozyh.png"
      },
      {
        id: 163,
        name: "原创",
        index:2,
        image:"../../images/icon_zgyh.png"
      }, {
        id: 321,
        name: "证劵",
        index:3,
        image:"../../images/icon_mlc.png"
      },
      {
        id: 320,
        name: " 期货",
        index:4,
        image:"../../images/icon_hyhd.png"
      },
      {
        id: 322,
        name: "外汇",
        index:5,
        image:"../../images/icon_whjq.png"
      },
        {
        id: 3,
        name: "百科",
        index:6,
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
        // 列表数据 + 轮播图
        var that = this;
        swan.showLoading({ title: '数据加载中',mask: true,});
        // console.log(that.data.classid)
        swan.request({
            url: 'https://api.jiaxunmedia.com/BaiduApplicationApi/index',
            method: 'get',  dataType: 'json',
            data: {  pageSize:10,typeid:0,pageIndex:that.data.pageIndex},
            header: { 'content-type': 'application/json'  },
            success: function (res) {
                swan.hideLoading();
                // that.setData({news_list:res.data.data.news_list.data});
                that.setData({slideshowList:res.data.data.swiper});
                that.setData({list:res.data.data.news_list.data});
                console.log(that.data.list)
            }
        });
    },
    // 分类筛选
    selectTab(e) {
        console.log(e)
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
            url: 'https://api.jiaxunmedia.com/BaiduApplicationApi/index',
            method: 'post',  dataType: 'json',
            data: { pageSize:10,typeid:that.data.classid},
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                console.log(res)
                swan.hideLoading();
                // that.setData({news_list:res.data.data.news_list.data});
                that.setData({list:res.data.data.news_list.data});
                that.setData({slideshowList:res.data.data.swiper});
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
        console.log(this.data.pageIndex)
        swan.showLoading({ title: '数据加载中',mask: true,});
        swan.request({
            url: 'https://api.jiaxunmedia.com/BaiduApplicationApi/index',
            method: 'get',  dataType: 'json',
            data: { pageSize:10,pageIndex:that.data.pageIndex,typeid:that.data.classid},
            header: { 'content-type': 'application/json'  },
            success: function (res) {
                console.log(res)
                swan.hideLoading();
                that.data.objPage = that.data.list;
                for(var i=0;i<res.data.data.news_list.data.length;i++){
                    that.data.objPage.push(res.data.data.news_list.data[i])
                }
                console.log(that.data.objPage)
                that.setData({list:that.data.objPage});
                that.data.isScrolling=false;
            }
        }); 
        // console.log(this.data.pageIndex)
    },
})
