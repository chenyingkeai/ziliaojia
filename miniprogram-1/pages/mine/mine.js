// pages/mine/mine.js
const app = getApp()
import request from '../../service/request.js'

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
    wx.getStorage({
      key: 'openId',
      success: (result) => {
        this.setData({
          openid: result.data
        })
        this.getUserInfo(result.data)
      },
    });
    
  },
  onShow() {
    if (app.globalData.refreshMine) {
      this.getUserInfo(this.data.openid)
      app.globalData.refreshMine = false
    }
  },
  getUserInfo(openid) {
    request({
      url: 'myInfo/getUserInfo',
      method: 'POST',
      data: {
        openId: openid 
      }
    }).then( res => {
      console.log(res);
      if (res.data.code === 200) {
        this.setData({
          myInfo: res.data.data
        })
      }
    })
    return true
  },

  toCollect() {
    wx.navigateTo({
      url: `./collect/collect?openid=${this.data.myInfo.openId}`
    });
      
  },
  toManager() {
    wx.navigateTo({
      url: '../manager/login/login'
    });
      
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('---');
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getUserInfo(this.data.openid)
    setTimeout(() => {
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh();
    }, 1000);
    console.log("刷新了")
    
  },
})
