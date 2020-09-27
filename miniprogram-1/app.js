//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: (res) => {
        this.globalData.code = res.code
        this.globalData.userInfo = res.userInfo
        console.log("登陆");
        console.log(this.globalData);
      },
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          console.log("正在登陆");
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              let that =this
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res);
              console.log(this.globalData);
              wx.request({
                url: 'http://134.175.246.52:8080/wxLogin',
                method:"POST",
                data:{
                  "code": this.globalData.code,
                  "userImage": this.globalData.userInfo.avatarUrl,
                  "userName": this.globalData.userInfo.nickName
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success (res) {
                  console.log("登陆成功")
                  console.log(res);
                  console.log("openid",res.data.data);
                  that.globalData.openid=res.data.data.openId;
                  that.globalData.userId=res.data.data.userId;
                  try {
                    wx.setStorageSync('openid', res.data.data.openId)
                  } catch (e) {
                    console.log("存入setStorageSync出错");
                    console.log(e);
                   }
                }
              })              
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
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
    userId:null,
  },
})