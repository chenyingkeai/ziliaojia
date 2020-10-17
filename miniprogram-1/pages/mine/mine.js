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
      key: 'openid',
      success: (result) => {
        this.setData({
          openid: result.data
        })
        this.getUserInfo(result.data)
      },
    });
    
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
  
})
