// pages/manager/detail/detail.js
import request from '../../../service/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test: ['删除资料', '修改资料']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = 12
    this.setData({
      id,
    })
    this.getMaterianInfo(id)
  },

  getMaterianInfo(id){
    request({
      url: 'Yunying/getMaterialInfo',
      method: 'POST',
      data: {
        zlId: id
      }
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
  },

  //是否删除资料
  isDetlete() {
    this.setData({
      showModal: true
    })
  },
  deleteMaterial() {
    const id = this.data.id
    request({
      url: 'Yunying/deleteMaterial',
      method: 'POST',
      data: {
        id,
      }
    }).then(res =>{
      console.log(res);
      if (res.data.code === '200') {
        console.log('删除成功');
      }
    }).catch(err=>{
      console.log(err);          
    })
  },
  hideModel() {
    this.setData({
      showModal: false
    })
  },

  //修改资料
  changeMaterial() {
    console.log('修改');
  },
})