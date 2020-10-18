// pages/data/list/list.js
import request from '../../../service/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag1:false,//筛选
    flag2:false,//排序
    show1:false,//第一个下拉框
    type:"",//传入的文字
    testSelect: false,
    // selectData1:['中考真题','中考模拟','期中','期末','单元测试卷'],//下拉列表的数据
    // index1:0,//选择的下拉列表下标
    // show2:false,//第2个下拉框
    // selectData2:['七年级上册','七年级下册','八年级上册','八年级下册','九年级上册','九年级下册'],//下拉列表的数据
    // index2:0,//选择的下拉列表下标
    // show3:false,//第3个下拉框
    // selectData3:['语文','数学','英语','物理','化学','生物','历史','地理','道德与法治'],//下拉列表的数据
    // index3:0,//选择的下拉列表下标
    // show4:false,//第4个下拉框
    // selectData4:['2015','2016','2018','2019','2020'],//下拉列表的数据
    // index4:0,//选择的下拉列表下标
    zlList:[],
    showActionsheet:false,//智能排序选择
    groups: [//智能排序选项
      { text: '智能排序', value: 1 },
      { text: '点赞量', value: 2 },
      { text: '时间', value: 3 },
    ],
    groupsChoose:1,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    that.setData({
      type:options.id
    })
    request({
      url: 'material/selectMaterialByTag',
      method: 'POST',
      data: {
        "zlType":options.id
      }
    }).then(res =>{
      if (res.data.code === 200) {
        console.log("成功获得对应资料列表");
        if(res.data.data!="无相关结果"){
          this.setData({
            zlList:res.data.data
          })
        }
      } else {
        console.log('获得对应资料列表失败');
      }
    }).catch(err=>{
      console.log(err);          
    })
  },
  // 下拉菜单
  testSelect() {
    this.setData({
      testSelect: !this.data.testSelect
    });
  },
  // 智能排序
  close: function () {
    this.setData({
        showActionsheet: false
    })
  },
  upClick(){
    this.setData({
      showActionsheet: true
  })
  },
  btnClick(e) {
    console.log(e.detail.value)
    this.close()
    this.setData({
      groupsChoose:e.detail.value
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