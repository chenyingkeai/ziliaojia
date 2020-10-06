// pages/manager/dataList/dataList.js
import request from '../../../service/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activetab: 0,
    xzq: 0,
    testSelect: false,
    materialSelect: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMaterialList()

  },

  getMaterialList(e) {
    let data = { zlModule: '资料' }
    if (e) {
      data = e.detail;
      if (e.detail.zlModule === '试卷') {
        this.setData({
          activetab: 1
        })
      } else {
        this.setData({
          activetab: 0
        })
      }
    }
    request({
      url: 'Yunying/getAllMaterialList',
      method: 'POST',
      data,
    }).then(res =>{
      if (res.data.code === 200) {
        this.setData({
          materialList: res.data.data,
          materialSelect: false,
          testSelect: false
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

  materialSelect() {
    this.setData({
      materialSelect: !this.data.materialSelect
    });
  },
  testSelect() {
    this.setData({
      testSelect: !this.data.testSelect
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
    wx.navigateTo({
      url: '../upload/upload',
    });
  },
  toDetail(e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: `../detail/detail?id=${e.currentTarget.dataset.id}`,
    });
  },

})