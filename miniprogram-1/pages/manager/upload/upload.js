// pages/manager/upload/upload.js
import request from '../../../service/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    module: [ '试卷', '资料' ],
    type: [ '知识点', '课件', '教案' ],
    type2: [ '中考', '期中', '期末', '单元测试卷' ],
    subject: [ '语文', '数学', '英语', '物理', '化学', '生物', '政治', '历史', '地理' ],
    formData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.selectComponent('#toast').showToast('修改成功', 'success', 10000)
  },

  baseInput(e) {
    this.setData({
      [`formData.${e.target.id}`]: e.detail.value
    });
  },
  uploadFile() {
    let that = this
    wx.chooseMessageFile({
      count: 1,
      success (res) {
        const tempFilePaths = res.tempFiles
        wx.uploadFile({
          url: 'http://134.175.246.52:8080/uploadImage',
          filePath: tempFilePaths[0].path,
          name: 'file',
          header: {
            'content-type': 'multipart/form-data'
          },
          success: (res) => {
            let rtnData = JSON.parse(res.data)
            if (rtnData.code === 200) {
              that.setData({
                ['formData.zlAddress']: rtnData.data
              })
            }
          }
        });
  
      }
    })
  },
})