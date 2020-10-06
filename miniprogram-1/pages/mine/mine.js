// pages/mine/mine.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    avatarUrl:'',
    nickName:"",
    openid:"",


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        console.log(app.globalData.userInfo);
        console.log(app.globalData.openid);
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          nickName:res.userInfo.nickName,
          openid:app.globalData.openid
        })
      }
    })

  },

  toCollect() {
    wx.navigateTo({
      url: './collect/collect'
    });
      
  },
  toManager() {
    wx.navigateTo({
      url: '../manager/login/login'
    });
      
  },
  
})
