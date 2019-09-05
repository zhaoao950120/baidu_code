/**
 * @file index.js
 * @author swan
 */
var bdParse = require('../../bdParse/bdParse.js');
const app = getApp()

Page({
    data: {
        userInfo: {},
        obj:{},
        id:"",
        content:"",
        list:[],
        seoTitle:"",
        seoKeyword:"",
        seoDescribe:"",
        classid:"",
        flag:false
    },

    onLoad(options) {
        console.log(options)
        this.setData({id:options.articleId})
        this.setData({classid:options.classid})
        console.log(this.data.classid)
        // 监听页面加载的生命周期函数
        let that = this;
        swan.showLoading({ title: '数据加载中',mask: true,});
        // 详情
        swan.request({
            url: 'https://lts.zhongyi9999.com/ucapi/article/'+options.articleId,
            method: 'get',  dataType: 'json',
            data: { },
            header: { 'content-type': 'application/json' },
            success: function (res) {
                console.log(res.data)
                swan.hideLoading();
                that.setData({obj:res.data});
                // // that.setData({content:res.data.detail})
                // that.setData({ content:bdParse.bdParse('article', 'html', content, that, 5), })
                // // that.setData({classid:res.data.columnId})

                let result = res.data.detail;
                let result1 = "";
                const regex = new RegExp('<img', 'gi');
                const regex1 = new RegExp('<table', 'gi');
                result = result.replace(regex, `<img style="max-width: 100%;display:block;margin:0 auto;height:auto"`);
                result1 = result.replace(regex1, `<table style="max-width: 100%;display:block;margin:0 auto;height:auto"`);
                console.log("result768678"+result1)
                that.setData({content:result1})
                // this.$apply();

                // TDK
                that.setData({seoDescribe:res.data.seoDescribe})
                that.setData({seoTitle:res.data.seoHeadline})
                that.setData({seoKeyword:res.data.seoKeyword})
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
    },
    gotoPage(option){
        // console.log(option)
        this.data.articleId=option.currentTarget.dataset.s
        this.data.classid = option.currentTarget.dataset.classid;
        console.log(this.data.classid)
        swan.navigateTo({
            url: "/pages/detail/detail?classid="+this.data.classid+'&articleId='+this.data.articleId
        });
    }
})
