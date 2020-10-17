// pages/index/details/details.js
import request from '../../../service/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailsId:"",//index页传来的数据
    item:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      detailsId:options.id
    })
    this.openDetail()
    // wx.downloadFile({
    //   // 示例 url，并非真实存在
    //   url: 'http://example.com/somefile.pdf',
    //   success: function (res) {
    //     const filePath = res.tempFilePath
    //     wx.openDocument({
    //       filePath: filePath,
    //       success: function (res) {
    //         console.log(res);
    //         console.log('打开文档成功')
    //       },
    //       fail:function (res){
    //         console.log("打开文档失败")
    //       }
    //     })
    //   },
    //   fail:function (res){
    //     console.log(res)
    //   }
    // })
  },
  // 请求资料数据
  openDetail(){
    let that =this
    request({
      url: 'material/getMaterialInfo',
      method: 'POST',
      data: {
        "zlId" :this.data.detailsId
      }
    }).then(res =>{
      console.log(res.data);
      if (res.data.code === 200) {
        console.log("成功获得对应文件信息");
        this.setData({
          item:res.data.data
        })
      } else {
        console.log('获得对应文件信息失败');
      }
    }).catch(err=>{
      console.log(err);          
    })
  },
    // 点赞资料
    tapGood(e){
      let openid =wx.getStorageSync('openid');
      console.log(openid);
      let index =e.currentTarget.dataset.index;
      console.log(index);
      request({
        url: 'material/setGood/{openId}/{zlId}?openId='+openid+'&zlId='+index,
        method: 'POST',
        data: {
          "openId" : openid,
          "zlId" :index
        }
      }).then(res =>{
        let that = this
        console.log(res.data);
        if (res.data.code === 200) {
          console.log("点赞成功");
        } else {
          console.log('点赞失败');
        }
      }).catch(err=>{
        console.log(err);          
      })
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})