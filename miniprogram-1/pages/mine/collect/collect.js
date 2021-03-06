// pages/mine/collect/collect.js
import request from '../../../service/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    refreshData: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.openid = options.openid
    this.getMyCollect(options.openid || 'oz1uB4lw87FZsFeCBjo4xHLsBma8')
  },
  onShow() {
    let refreshData = this.data.refreshData
    if (refreshData) {
      console.log('刷新数据');
      this.getMyCollect(this.data.openid)
      this.data.refreshData = false
    }
  },

  getMyCollect(openId) {
    console.log(openId);
    request({
      url: 'myInfo/getPeopleFavoriteList',
      method: 'POST',
      data: {
        openId,
      }
    }).then( res => {
      console.log(res);
      if (res.data.code === 200) {
        this.setData({
          myCollect: res.data.data
        })
      }
    })
  },

  toDetail(e) {
    wx.navigateTo({
      url: `/pages/index/details/details?id=${e.currentTarget.dataset.id}`,
    });
  }
})