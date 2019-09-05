// 
Page({
    data: {
        articleId:"",
        classid:"",
        obj:"",
        content:""
    },
    // onLoad: function (options) {
    //     console.log(options)
    //     this.setData({articleId:options.articleId})
    //     this.setData({classid:options.classid})
    //     // 监听页面加载的生命周期函数
    //     var that = this
    //     this.setData({
    //         url:"https://duocai.jiaxunmedia.com/index_zy.html?articleId="+that.data.articleId+"&classid="+that.data.classid
    //         // url:"https://api.jiaxunmedia.com/baiduApp/arctle?aid="+options['articleId']+"&class_id="+options['classid']
    //     });
    // },
    // onReady: function() {
    //     // 监听页面初次渲染完成的生命周期函数
    // },
    // onShow: function() {
    //     // 监听页面显示的生命周期函数
    // },
    onLoad(options) {
        console.log(options)
        this.setData({articleId:options.articleId})
        this.setData({classid:options.classid})
        console.log(this.data.classid)
        // 监听页面加载的生命周期函数
        let that = this;
        swan.showLoading({ title: '数据加载中',mask: true,});
        // 详情
        swan.request({
            url: 'https://api.jiaxunmedia.com/BaiduApplicationApi/getNewsCnotext',
            method: 'POST',  dataType: 'json',
            data: {
                aid:that.data.articleId
            },
            header: { 'content-type': 'application/json' },
            success: function (res) {
                console.log(res.data.data)
                swan.hideLoading();
                that.setData({obj:res.data.data});
                // // that.setData({content:res.data.detail})
                // that.setData({ content:bdParse.bdParse('article', 'html', content, that, 5), })
                // // that.setData({classid:res.data.columnId})

                let result = res.data.data.new_content;
                let result1 = "";
                const regex = new RegExp('<img', 'gi');
                const regex1 = new RegExp('<table', 'gi');
                result = result.replace(regex, `<img style="max-width: 100%;display:block;margin:0 auto;height:auto"`);
                result1 = result.replace(regex1, `<table style="max-width: 100%;display:block;margin:0 auto;height:auto"`);
                // that.setData({content:result1})
                result1=result1.replace(/\\/g,"");
                console.log(result1);
                that.setData({content:result1});
                // this.$apply();

                // TDK
                // that.setData({seoDescribe:res.data.seoDescribe})
                // that.setData({seoTitle:res.data.seoHeadline})
                // that.setData({seoKeyword:res.data.seoKeyword})
            }
        }); 
        
    },
    onShow(){
        var that = this
        swan.setPageInfo({
            title: that.data.seoTitle,
            keywords: that.data.seoKeyword,
            description: that.data.seoDescribe,
            articleTitle: '晒元宵节活动红包，爱奇艺60张年卡、600张季卡等你拿！',
        })
        // 推荐
        swan.request({
            url: 'https://api.jiaxunmedia.com/BaiduApplicationApi/index',
            method: 'POST',  dataType: 'json',
            data: {  pageSize:10,typeid:that.data.classid},
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                swan.hideLoading();
                // that.setData({news_list:res.data.data.news_list.data});
                that.setData({list:res.data.data.news_list.data});
                console.log(res.data.data.news_list.data)
            }
        });
    },
    gotoPage(option){
        // console.log(option)
        this.data.articleId=option.currentTarget.dataset.s
        this.data.classid = option.currentTarget.dataset.classid;
        console.log(this.data.classid)
        swan.navigateTo({
            url: "/pages/detail/detail?classid="+this.data.classid+'&articleId='+this.data.articleId
        });
    },
    onHide: function() {
        // 监听页面隐藏的生命周期函数
    },
    onUnload: function() {
        // 监听页面卸载的生命周期函数
    },
    onPullDownRefresh: function() {
        // 监听用户下拉动作
    },
    onReachBottom: function() {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }
});