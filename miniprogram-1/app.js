//app.js
import request from "./service/request.js";
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

  addXzq(e) {
    
    request({
      url: 'addXzq',
      method: 'POST',
      data: {
        openId: e.openid
      }
    }).then( res => {
      console.log(res);
      if (res.data.code === 200) {
        console.log('增加成功');
      }
    })
  },

  setWatcher(data, watch) { // 接收index.js传过来的data对象和watch对象
    Object.keys(watch).forEach(v => { // 将watch对象内的key遍历
      this.observe(data, v,watch[v]); // 监听data内的v属性，传入watch内对应函数以调用
    })
  },
  /**
   * 监听属性 并执行监听函数
   */
  observe(obj, key,watchFun) {
    let val = obj[key]; // 给该属性设默认值
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set: function(value) {
        val = value;
        watchFun(value,val); // 赋值(set)时，调用对应函数
      },
      get: function() {
        return val;
      }
    })
  }
})