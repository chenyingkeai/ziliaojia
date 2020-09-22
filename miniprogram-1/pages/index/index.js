//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    flag:false,
    selectNum1:-1,//年级选择
    selectNum2:-1,//科目选择
    selectNum3:-1,//类型选择
    selectList1:["七年级上册","七年级下册","八年级上册","八年级下册","九年级上册","九年级下册","中考","会考"],
    selectList2:['语文','数学','英语','物理','化学','道德与法治'],
    selectList3:['知识点','教案','课件'],
    selectNum:"",//筛选
    item:[
      {
        type:"试卷",
        itemName:"广雅中学高中语文·必修三第二单元测试卷",
        itemLook:200,
        itemFollow:316,
      },
      {
        type:"试卷",
        itemName:"2222222广雅中学高中语文·必修三第二单元测试卷广雅中学高中语文·必修三第二单元测试卷",
        itemLook:200,
        itemFollow:316,
      }
    ]
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo);
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
      console.log(app.globalData.userInfo);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  toSearch(){
    wx.navigateTo({
      url: '/pages/index/search/search',
      success: function(res){
        console.log("跳转至搜索页");
      },
    })
  },
  toDetails(){
    wx.navigateTo({
      url: "/pages/index/details/details",
      success: function(res){
        console.log("跳转至详情页");
      },
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onTap(e){
    let that = this
    this.setData({
      flag:!that.data.flag
    })
  },
  subjectChange1(e){//改变学科
    console.log(e.currentTarget.dataset.num);
    this.setData({
      selectNum1:  e.currentTarget.dataset.num,
   })
  },
  subjectChange2(e){//改变学科
    console.log(e.currentTarget.dataset.num);
    this.setData({
      selectNum2:  e.currentTarget.dataset.num,
   })
  },
  subjectChange3(e){//改变学科
    console.log(e.currentTarget.dataset.num);
    this.setData({
      selectNum3:  e.currentTarget.dataset.num,
   })
  },

})
