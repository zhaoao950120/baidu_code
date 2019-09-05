// 
Page({
    data: {
        articleId:"",
        classid:""
    },
    onLoad: function (options) {
        console.log(options)
        this.setData({articleId:options.articleId})
        this.setData({classid:options.classid})
        // 监听页面加载的生命周期函数
        var that = this
        this.setData({
            url:"http://duocai.jiaxunmedia.com/index0826.html?articleId="+that.data.articleId
        });
    },
    onReady: function() {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function() {
        // 监听页面显示的生命周期函数
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