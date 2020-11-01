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
    zlType:"",//传入的文字
    isZhongkao:false,
    isOthers:false,
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
      zlType:options.id,
    })
    if(that.data.zlType=="中考真题"||that.data.zlType=="中考模拟"){
      this.setData({
        isZhongkao:true,
        isOthers:false,
      })
    }
    if(that.data.zlType=='期中考试'||that.data.zlType=='期末考试'||that.data.zlType=='单元同步检测'){
      this.setData({
        isZhongkao:false,
        isOthers:true,
      })
    }
    console.log(that.data.isZhongkao,that.data.isOthers);
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

  getMaterialList(e) {
    let data = e.detail;
    console.log(e.detail);
    request({
      url: 'material/selectMaterialByTag',
      method: 'POST',
      data,
    }).then(res =>{
      console.log(res);
      if (res.data.code === 200) {
        this.setData({
          zlList: res.data.data,
          materialSelect: false,
          testSelect: false
        })
      }
    }).catch(err=>{
      console.log(err);          
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
    if(e.detail.value==1){
      console.log("智能排序")
      request({
        url: 'material/selectByGood',
        method: 'POST',
      }).then( res => {
        console.log('----')
        if (res.data.code === 200) {
          this.setData({
            zlList: res.data.data
          })
        }
      })
    }
    if(e.detail.value==2){
      request({
        url: 'material/selectByGood',
        method: 'POST',
      }).then( res => {
        console.log('----')
        if (res.data.code === 200) {
          this.setData({
            zlList: res.data.data
          })
        }
      })
    }else{
      request({
        url: 'material/getMaterialByTime',
        method: 'POST',
      }).then( res => {
        console.log('----')
        if (res.data.code === 200) {
          this.setData({
            zlList: res.data.data
          })
        }
      })
    }
},
// 筛选
testSelect() {
  this.setData({
    testSelect: !this.data.testSelect
  });
},
  // 跳转到详情页
  toDetail(e){
    let that =this;
    let num =e.currentTarget.dataset.id;
    console.log("num",num);
    request({
      url: 'material/setView',
      method: 'POST',
      data: {
        "openId" : wx.getStorageSync('openid'),
        "zlId" :num
      }
    }).then(res =>{
      let that = this
      console.log(res.data);
      if (res.data.code === 200) {
        console.log("浏览量增加");
      } else {
        console.log('浏览量增加失败');
      }
    }).catch(err=>{
      console.log(err);          
    })
    wx.navigateTo({
      url: "/pages/index/details/details?id="+num,
      success: function(res){
        console.log("跳转至详情页");
      },
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