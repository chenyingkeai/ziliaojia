// pages/manager/dataList/dataList.js
import request from '../../../service/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select1:"筛选1",
    select2:"筛选2",
    xzq: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMaterialList()
  },

  getMaterialList() {
    request({
      url: 'Yunying/getAllMaterialList',
      method: 'POST',
      data: {
        zlModule: '试卷'
      }
    }).then(res =>{
      if (res.data.code === 200) {
        this.setData({
          materialList: res.data.data
        })
      }
    }).catch(err=>{
      console.log(err);          
    });
  },

  getXzq() {
    request({
      url: 'material/getXzq',
      method: 'POST',
    }).then(res =>{
     this.setData({
       xzq: res.data.data
     });
    }).catch(err=>{
      console.log(err);          
    });
  },

  showSelect() {
    this.setData({
      showSelect: true
    });
  },

  //下载券相关
  setting() {
    if (!this.data.xzq) {
      this.getXzq()
    };
    this.setData({
      showModal: true
    });
  },
  hideModel() {
    this.setData({
      showModal: false
    });
  },
  inputXzq(e) {
    this.setData({
      xzq: e.detail.value
    });
  },
  changeXzq() {
    if (this.data.xzq) {
      request({
        url: 'Yunying/setXzq',
        method: 'POST',
        data: {
          number: this.data.xzq
        }
      }).then(res =>{
        if (res.data.code === 200) {
          wx.showToast({
            title: '修改成功',
            icon: 'none',
          });
          setTimeout(() => {
            this.hideModel()
          }, 1000);
        }
      }).catch(err=>{
        console.log(err);          
      });
    } else {
      wx.showToast({
        title: '请输入下载券数量',
        icon: 'none',
        duration: 1500,
      });
    }
  },

  // 上传材料
  toUpload() {
    // wx.navigateTo({
    //   url: '../upload/upload',
    // });
    console.log('---');
  },
  toDetail(e) {
    console.log(e);
    console.log('++++');
    // wx.navigateTo({
    //   url: `../detail/detail?id=${e}`,
    // });
  }

})