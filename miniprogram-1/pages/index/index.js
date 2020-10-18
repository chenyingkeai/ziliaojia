//index.js
//获取应用实例
const app = getApp()
import request from '../../service/request.js'

Page({
  data: {
    // motto: 'Hello World',
    userInfo: {},
    hasUserInfo: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    materialSelect:false,//遮罩层是否
    activetab: 0,
    shadeLeng:"",
    // selectNum1:-1,//年级选择
    // selectNum2:-1,//科目选择
    // selectNum3:-1,//类型选择
    // selectList1:["七年级上册","七年级下册","八年级上册","八年级下册","九年级上册","九年级下册","中考","会考"],
    // selectList2:['语文','数学','英语','物理','化学','道德与法治'],
    // selectList3:['知识点','教案','课件'],
    // selectNum:"",//筛选
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
  onLoad: function (options) {
    this.getzlList();
  },
  onShow() {
    let openid =wx.getStorageSync('openid');
    console.log(openid);
    if(openid){
      console.log("登陆成功");
    }else{
      wx.redirectTo({
        url: '/pages/turn/turn?id='+1
      })   
    }
  },
  // 获取资料列表
  getzlList(){
    console.log('---')
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
    // let that=this;
    // wx.request({
    //   url: "http://134.175.246.52:8080/material/selectByGood",
    //   method:"POST",
    //   success(res) {
    //     that.setData({
    //       zlList:res.data.data
    //     })
    //   },
    // })
  },
  // 遮罩层
  materialSelect() {
    this.setData({
      materialSelect: !this.data.materialSelect
    });
  },
  getMaterialList(e) {
    let data = { zlModule: '资料' }
    // if (e) {
    //   data = e.detail;
    //   if (e.detail.zlModule === '试卷') {
    //     this.setData({
    //       activetab: 1
    //     })
    //   } else {
    //     this.setData({
    //       activetab: 0
    //     })
    //   }
    // }
    request({
      url: 'Yunying/getAllMaterialList',
      method: 'POST',
      data,
    }).then(res =>{
      if (res.data.code === 200) {
        this.setData({
          zlList: res.data.data,
          materialSelect: false
        })
      }
    }).catch(err=>{
      console.log(err);          
    });
  },
  // closeMask(e){
  //   let that =this
  //   console.log(e.detail.y);
  //   let leng=e.detail.y
  //   if(that.data.flag){
  //     if(leng>that.data.shadeLeng){
  //       that.setData({
  //         flag:!that.data.flag
  //       })
  //       console.log("成功关闭");
        
  //     }

  //   }
  // },
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
  // 打开遮罩层
  // onTap(e){
  //   let that = this
  //   this.setData({
  //     flag:!that.data.flag
  //   })
  //   var query = wx.createSelectorQuery()
  //   query.select('.shade').boundingClientRect(function (res) {
  //     console.log("shade长度");
  //     console.log(res.bottom);
  //     that.setData({
  //       shadeLeng:res.bottom
  //     })
  //   }).exec();
  // },
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
    let openid =wx.getStorageSync('openid');
    let key1=this.selectList1[this.selectNum1];
    let key2=this.selectList2[this.selectNum2];
    let key3=this.selectList3[this.selectNum3];
    request({
      url: 'material/selectMaterialByTag',
      method: 'POST',
      data: {
        "openId" : openid,
        "zlId" :index
      }
    }).then(res =>{
      let that = this
      console.log(res.data);
      if (res.data.code === 200) {
        console.log("筛选成功");
        that.setData({
          zlList:res.data.data
        })
      } else {
        console.log('筛选失败');
      }
    }).catch(err=>{
      console.log(err);          
    })          
  },
})
