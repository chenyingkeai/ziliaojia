// pages/turn/turn.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    code:"",
    turnNum:"",
    pageNum:"",
  },
  // 获取个人信息
  getUserInfo: function(e) {
    let that =this
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            console.log("正在登陆");
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                console.log(res)
                // 可以将 res 发送给后台解码出 unionId
                app.globalData.userInfo = res.userInfo
              }
            })
          }
          console.log(app.globalData.userInfo)
          wx.login({
            success: (res) => {
              console.log("登陆");
              console.log(res);
              wx.request({
                url: 'http://134.175.246.52:8080/wxLogin',
                method:"POST",
                data:{
                  "code": res.code,
                  "userImage": app.globalData.userInfo.avatarUrl,
                  "userName": app.globalData.userInfo.nickName
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success (res) {
                  console.log("登陆成功")
                  console.log(res);
                  console.log("openid",res.data.data);
                  app.globalData.openid=res.data.data.user.openId;
                  app.globalData.userId=res.data.data.user.userId;
                  try {
                    wx.setStorageSync('openid', res.data.data.user.openId)
                    wx.setStorageSync('userid', res.data.data.user.userId)
                    console.log("成功存入setStorageSync");
                    if(that.data.turnNum==1){
                      wx.switchTab({
                        url: '/pages/index/index'
                      }) 
                    }
                    if(that.data.turnNum==2){
                      wx.switchTab({
                        url: '/pages/index/details/details?id'+this.data.pageNum
                      }) 
                    }
                  } catch (e) {
                    console.log("存入setStorageSync出错");
                    console.log(e);
                  }
                }
              })    
            },
          })
        }
      })
      if (this.userInfoReadyCallback) {
        this.userInfoReadyCallback(res)
      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that= this
    that.setData({
      turnNum:options.id,
      pageNum:options.Page
    })
    console.log(this.data.turnNum)
    console.log(this.data.pageNum)
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