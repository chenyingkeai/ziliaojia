// pages/manager/detail/detail.js
import request from '../../../service/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = 12
    this.getMaterianInfo(id)
  },

  getMaterianInfo(id){
    request({
      url: 'Yunying/getMaterialInfo',
      method: 'POST',
      data: id
    }).then(res =>{
      let that = this
      const { code, data } = res.data;
      if (code === 200) {
        this.setData({
          materianInfo: data
        })
      } else {
        console.log('获取失败');
      }
    }).catch(err=>{
      console.log(err);          
    })
  }
})