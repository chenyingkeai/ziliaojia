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

  input(e) {
    this.setData({
      [`${e.target.id}`]: e.detail.value
    });
  },

  managerLogin(e) {
    const {loginId: adminName, passWord: adminPassword } = e.detail.value;
    console.log(adminName, adminPassword);
    if (adminName && adminPassword) {
      request({
        url: 'Yunying/login',
        method: 'POST',
        data: {
          adminName,
          adminPassword
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }).then(res =>{
        console.log(res);
        const { code, data } = res.data;
        if (code === 200) {
          console.log('登录成功');
        } else {
          console.log('登录失败');
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
