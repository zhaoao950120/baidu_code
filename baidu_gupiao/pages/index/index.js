/**
 * @file index.js
 * @author swan
 */
const app = getApp()

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: swan.canIUse('button.open-type.getUserInfo'),
        list:[
            {id:0,image:"http://img61.ddimg.cn/topic_img/gys_0015115/2019.8.12ydjdd750x315.jpg"},
            {id:1,image:"http://img51.ddimg.cn/9003260124427591.jpg"},
            {id:2,image:"http://img60.ddimg.cn/upload_img/00478/0609/FHC750x315_dl_0318-wy-1565781010.jpg"}
        ],
        obj:[],
        objPage:[],
        pageIndex:1,
        isScrolling:false,
    },
    onShow() {
        swan.setPageInfo({
            title: '中亿财经股票网_提供股票行情与资讯查询_股票百科入门学习',
            keywords: '股票行情，股票入门，股票查询',
            description: '中亿财经股票网，7X24报道最及时全面的股票资讯要闻信息，提供国内外股票资讯、股票行情查询、股票知识、股票软件、股票社区、股票观点策略等股票市场内容，打造全方位股票市场信息服务平台。',
        })
    },
    onLoad() {
        // 监听页面加载的生命周期函数
        let that = this;
        swan.showLoading({ title: '数据加载中',mask: true,});
        swan.request({
            url: 'https://lts.zhongyi9999.com/lts/app/article/page',
            method: 'POST',  dataType: 'json',
            data: { siteId:123474,pageSize:10,pageNum:1},
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                swan.hideLoading();
                // that.setData({news_list:res.data.data.news_list.data});
                that.setData({obj:res.data.data});
                console.log(res.data.data)
            }
        }); 
    },
    getUserInfo(e) {
        swan.login({
            success: () => {
                swan.getUserInfo({
                    success: (res) => {
                        this.setData({
                            userInfo: res.userInfo,
                            hasUserInfo: true
                        });
                    },
                    fail: () => {
                        this.setData({
                            userInfo: e.detail.userInfo,
                            hasUserInfo: true
                        });
                    }
                });
            },
            fail: () => {
                swan.showModal({
                    title: '未登录',
                    showCancel: false
                });
            }
        });
    },
    gotoPage(option){
        let id = option.currentTarget.dataset.s;
        console.log(id)
        swan.navigateTo({
            url: "/pages/detail/detail?id="+id
        });
    },
    lower() {
        //  console.log(666)
        // swan.showToast({
        //     title: '到底了',
        //     icon: 'none'
        // });
        if(this.data.isScrolling===true)
        return;
        this.data.isScrolling=true;
        this.data.pageIndex = this.data.pageIndex +1
        //业务逻辑代码
        let that = this
        swan.showLoading({ title: '数据加载中',mask: true,});
        swan.request({
            url: 'https://lts.zhongyi9999.com/lts/app/article/page',
            method: 'POST',  dataType: 'json',
            data: { siteId:123474,pageSize:10,pageNum:that.data.pageIndex},
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                console.log(665)
                swan.hideLoading();
                // that.setData({news_list:res.data.data.news_list.data});
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
        console.log(this.data.pageIndex)
       
    },
})
