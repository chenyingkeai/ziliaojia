// pages/manager/dataList/dataList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select1:"筛选1",
    select2:"筛选2",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  showModel() {
    this.setData({
      showSelect: true
    })
  },

  upload() {
    wx.navigateTo({
      url: '../upload/upload',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  },

})