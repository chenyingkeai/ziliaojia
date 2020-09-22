// pages/manager/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    password:"",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  Mlogin: function(e) {
    console.log( e.detail.value);
      wx.navigateTo({
        url: '/pages/manager/dataList/dataList',
        success: function(res){
          console.log("跳转至管理资料列表");
        },
      })
    },
//   getUserName: function(e) {
//     var value = e.detail.value; //获取输入的内容
//     this.setData({
//       username:value,//改变page--data中username的值
//     })
//     console.log(this.data.username);
    
//     //wx.setStorageSync('username', value);//将获取到的username值存入本地缓存空间
//   },
//   getPassword:function(e) {
//     var value = e.detail.value;
//     this.setData({
//       password: value,
//     })
//     console.log(this.data.password);

//     //wx.setStorageSync('password', value);
//   },
})
