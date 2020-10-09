// pages/manager/login/login.js
import request from '../../../service/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginId:"",
    passWord:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow() {
    this.hasLogin()
  },

  input(e) {
    this.setData({
      [`${e.target.id}`]: e.detail.value
    });
  },

  managerLogin(e) {
    const {loginId: adminName, passWord: adminPassword } = e.detail.value;
    console.log(adminName, adminPassword);
    if (adminName && adminPassword) {
      wx.showLoading({
        title: '正在登录中',
        mask: true,
      });
      request({
        url: 'Yunying/login',
        method: 'POST',
        data: {
          adminName,
          adminPassword
        }
      }).then(res =>{
        console.log(res);
        wx.hideLoading();
        const { code, data } = res.data;
        if (code === 200) {
          this.saveTeacherInfo(adminName, adminPassword)
          this.loginSuccess()
        } else {
          wx.showToast({
            title: '账号或密码错误！请检查输入',
            icon: 'none',
            duration: 1500,
            mask: false,
          });
        }
      }).catch(err=>{
        console.log(err);          
      })
    } else {
      wx.showToast({
        title: '请输入完整账号密码',
        icon: 'none',
        duration: 1500,
        mask: false,
      });        
        
    }
    
  },

  loginSuccess() {
    wx.redirectTo({
      url: '../dataList/dataList',
    });
    
  },

  saveTeacherInfo(loginId, passWord) {
    const teacherInfo = {
      loginId,
      passWord
    }
    console.log(teacherInfo);
    wx.setStorage({
      key: 'teacherInfo',
      data: teacherInfo,
    });
      
  },

  hasLogin() {
    wx.getStorage({
      key: 'teacherInfo',
      success: (result) => {
        this.setData({
          hasLogin: true,
          loginId: result.data.loginId,
          passWord: result.data.passWord
        })
      },
      fail: () => {
        this.setData({
          hasLogin: false
        })
      },
    });
  }
})
