Page({
  data: {
    curTab: 0,
    current: 0,
    obj:[],
    classid:204,
    objPage:[],
    pageIndex:1,
    isScrolling:false,
    tabList: [{
        id: 204,
        name: "证券要闻",
        index:0
      },
      {
        id: 165,
        name: " P2P概念",
        index:1
      },
      {
        id: 155,
        name: " 交易软件",
        index:2
      }, {
        id: 178,
        name: "新股上市",
        index:3
      },
      {
        id: 327,
        name: " 股票基金",
        index:4
      },
      {
        id: 179,
        name: "股票社区",
        index:5
      },
      {
        id: 180,
        name: " 股票观点",
        index:6
      },
    ]
  },
   onLoad() {
        // 监听页面加载的生命周期函数
        let that = this;
        swan.showLoading({ title: '数据加载中',mask: true,});
        swan.request({
            url: 'https://lts.zhongyi9999.com/lts/app/article/page',
            method: 'post',  dataType: 'json',
            data: { pageSize:10,pageNum:1,siteId:123474,columnId:that.data.classid},
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                swan.hideLoading();
                // that.setData({news_list:res.data.data.news_list.data});
                that.setData({obj:res.data.data});
                // console.log(res.data.data)
            }
        });
    },
    onShow() {
        swan.setPageInfo({
            title: '中亿财经股票网_提供股票行情与资讯查询_股票百科入门学习',
            keywords: '股票行情，股票入门，股票查询',
            description: '中亿财经股票网，7X24报道最及时全面的股票资讯要闻信息，提供国内外股票资讯、股票行情查询、股票知识、股票软件、股票社区、股票观点策略等股票市场内容，打造全方位股票市场信息服务平台。',
        })
    },
  selectTab(e) {
        console.log(e)
        let index = e.target.dataset.index;
        this.setData({
        curTab: index,
        current: index,
       
    })
    this.data.pageIndex = 1
    this.data.classid = e.target.dataset.data;
    console.log(this.data.classid)
 
    let that = this
    swan.request({
            url: 'https://lts.zhongyi9999.com/lts/app/article/page',
            method: 'post',  dataType: 'json',
            data: { pageSize:10,pageNum:1,siteId:123474,columnId:that.data.classid},
             header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                swan.hideLoading();
                // that.setData({news_list:res.data.data.news_list.data});
                that.setData({obj:res.data.data});
                // console.log(res.data.data)
            }
    });
  },
  lower(){
        if(this.data.isScrolling===true)
        return;
        this.data.isScrolling=true;
        //业务逻辑代码
        var that = this
        that.data.pageIndex = that.data.pageIndex +1
        console.log(that.data.pageIndex)
        swan.request({
            url: 'https://lts.zhongyi9999.com/lts/app/article/page',
            method: 'post',  dataType: 'json',
            data: { pageSize:10,pageNum:that.data.pageIndex,siteId:123474,columnId:that.data.classid},
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                swan.hideLoading();
                // that.setData({objPage:res.data.data});
                // console.log(res.data.data)
                // that.objPage = that.data.obj;
                // for(index in res.data.data) {
                //     that.data.objPage.push(res.data.data[index]);
                // }
                // that.setData({obj:that.data.objPage});
                // console.log(that.data.objPage)
                // that.data.isScrolling=false;

                that.setData({objPage:res.data.data});
                // console.log(res.data.data)
                that.objPage = that.data.obj;
                for(index in res.data.data) {
                    that.objPage.push(res.data.data[index]);
                }
                that.setData({obj:that.objPage});
                that.data.isScrolling=false;
            }
        });
    
  },
  onReachBottom(){
      
  },
    gotoPage(option){
        let id = option.currentTarget.dataset.s;
        console.log(id)
        swan.navigateTo({
            url: "/pages/detail/detail?id="+id
        });
    },
})