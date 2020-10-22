// pages/integral/integral.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveShare: 0,
    points: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    if (e.shareTicket) {
      wx.getShareInfo({
        shareTicket: e.shareTicket,
        success: res => {
          console.error(res)
          console.error({
            referrer: e.query.inviter_id,//分享人的用户id
            encryptedData: res.encryptedData,
            iv: res.iv
          })
        }
      })
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let myOpenid = wx.getStorageSync("openid")
    return {
      title: '海量初中学习资料',
      path: `/pages/index/index?hisOpenid=${myOpenid}`,
     // imageUrl: 'http://static.e-mallchina.com/pic/product/brand/detail/hgds.jpg'//自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
    }
  }
})
