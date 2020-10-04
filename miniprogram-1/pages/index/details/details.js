// pages/index/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{
        detailsId:"",//index页传来的数据
        type:"试卷",
        itemName:"广雅中学高中语文·必修三第二单元测试卷",
        itemLook:200,
        itemFollow:316,
        itemCollect:26,
        itemSelect:'人教版·高一·语文·下学期'
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      detailsId:options.id
    })
    wx.downloadFile({
      // 示例 url，并非真实存在
      url: 'http://example.com/somefile.pdf',
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log(res);
            console.log('打开文档成功')
          },
          fail:function (res){
            console.log("打开文档失败")
          }
        })
      },
      fail:function (res){
        console.log(res)
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})