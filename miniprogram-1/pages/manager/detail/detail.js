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
    let id = options.id || 8
    this.setData({
      id,
    })
    this.getMaterianInfo(id)
  },
  onShow() {
    // 是否需要更新页面
    if (this.data.refreshData === true) {
      const id = this.data.id
      this.getMaterianInfo(id)
      this.setData({
        refreshData: false
      })

      const pages = getCurrentPages();
      const prepage = pages[pages.length-2];
      prepage.setData({
        refreshData: true
      })
    }
  },

  getMaterianInfo(id){
    request({
      url: 'Yunying/getMaterialInfo',
      method: 'POST',
      data: {
        zlId: id
      }
    }).then(res =>{
      console.log(res);
      const { code, data } = res.data;
      if (code === 200) {
        data.zlAddress = data.zlAddress.split(",");
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
      if (res.data.code === 200) {
        this.setData({
          showModal: false
        })
        this.selectComponent('#toast').showToast('删除成功', 'success', 1500)
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          });
        }, 1500);
        let pages = getCurrentPages();
        let prepage = pages[pages.length-2];
        prepage.setData({
          refreshData: true
        })
        app.globalData.renewIndex = true
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
    let formData = JSON.stringify(this.data.materianInfo)
    wx.navigateTo({
      url: `../upload/upload?formData=${formData}&isChange=1`,
    });
      
  },
})