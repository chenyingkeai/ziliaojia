//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const that = this;
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            console.log("正在登陆");
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                let that =this
                // 可以将 res 发送给后台解码出 unionId
                that.globalData.userInfo = res.userInfo
                that.globalData.openid = wx.getStorageSync('openId')
                that.globalData.userid = wx.getStorageSync('userId')
                console.log(that.globalData);
                
              }
            })
          }
        }
      })
  },
  globalData: {
    userInfo: null,
    code:null,
    openid:null,
    userid:null,
  },
  // 设置监听器
  watch: function (ctx, obj) {
    Object.keys(obj).forEach(key => {
      this.observer(ctx.data, key, ctx.data[key], function (value) {
        obj[key].call(ctx, value)
      })
    })
  },
  // 监听属性，并执行监听函数
  observer: function (data, key, val, fn) {
    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get: function () {
        return val
      },
      set: function (newVal) {
        if (newVal === val) return
        fn && fn(newVal)
        val = newVal
      },
    })
  }
})