//index.js
//获取应用实例
const app = getApp()
import request from '../../service/request.js'

Page({
  data: {
    // motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    flag:false,//遮罩层是否
    shadeLeng:"",
    selectNum1:-1,//年级选择
    selectNum2:-1,//科目选择
    selectNum3:-1,//类型选择
    selectList1:["七年级上册","七年级下册","八年级上册","八年级下册","九年级上册","九年级下册","中考","会考"],
    selectList2:['语文','数学','英语','物理','化学','道德与法治'],
    selectList3:['知识点','教案','课件'],
    selectNum:"",//筛选
    zlList:[],
    showActionsheet:false,//智能排序选择
    groups: [//智能排序选项
      { text: '智能排序', value: 1 },
      { text: '点赞量', value: 2 },
      { text: '时间', value: 3 },
    ],
    groupsChoose:1,
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
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
    };
    try {
      var value = wx.getStorageSync('openid')
      if (value) {
        // Do something with return value
        console.log("value",value);
      }
    } catch (e) {
      // Do something when catch error
    }
    this.getzlList();
  },
  // 获取资料列表
  getzlList(){
    let that=this;
    wx.request({
      url: "http://134.175.246.52:8080/material/selectByGood",
      method:"POST",
      success(res) {
        that.setData({
          zlList:res.data.data
        })
      },
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
        this.getzlList();
      } else {
        console.log('点赞失败');
      }
    }).catch(err=>{
      console.log(err);          
    })
  },
  // 点击任意位置关闭遮罩层
  closeMask(e){
    let that =this
    console.log(e.detail.y);
    let leng=e.detail.y
    if(that.data.flag){
      if(leng>that.data.shadeLeng){
        that.setData({
          flag:!that.data.flag
        })
        console.log("成功关闭");
        
      }

    }
  },
  // 跳转到搜索页
  toSearch(){
    wx.navigateTo({
      url: '/pages/index/search/search',
      success: function(res){
        console.log("跳转至搜索页");
      },
    })
  },
  // 跳转到详情页
  toDetails(e){
    let that =this;
    let num =e.currentTarget.dataset.id;
    console.log("num",num);
    wx.navigateTo({
      url: "/pages/index/details/details?id="+num,
      success: function(res){
        console.log("跳转至详情页");
      },
    })
  },
  // 获取个人信息
  getUserInfo: function(e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      console.log(e.detail.userInfo)      
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
        code:app.globalData.code
      })
      console.log(this.data.code);
      let that =this
      // 可以将 res 发送给后台解码出 unionId
         
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      if (this.userInfoReadyCallback) {
        this.userInfoReadyCallback(res)
      }
    }
  },
  // 打开遮罩层
  onTap(e){
    let that = this
    this.setData({
      flag:!that.data.flag
    })
    var query = wx.createSelectorQuery()
    query.select('.shade').boundingClientRect(function (res) {
      console.log("shade长度");
      console.log(res.bottom);
      that.setData({
        shadeLeng:res.bottom
      })
    }).exec();
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
  // 清除选择
  tapClear(){
    this.setData({
      selectNum1:-1,
      selectNum2:-1,
      selectNum3:-1
    })
  },
  tapConfirm(){ 
    let that=this;                 
    wx.request({
      url: "http://134.175.246.52:8080/material/selectMaterialByTag",
      method:"POST",
      data:{

      },
      success(res) {
        that.setData({
          zlList:res.data.data
        })
        console.log("成功点赞资料：",e.currentTarget.dataset.index);
        console.log(res);
      },
    })   
  },
})
