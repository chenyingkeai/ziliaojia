// pages/data/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag1:false,//筛选
    flag2:false,//排序
    show1:false,//第一个下拉框
    selectData1:['中考真题','中考模拟','期中','期末','单元测试卷'],//下拉列表的数据
    index1:0,//选择的下拉列表下标
    show2:false,//第2个下拉框
    selectData2:['七年级上册','七年级下册','八年级上册','八年级下册','九年级上册','九年级下册'],//下拉列表的数据
    index2:0,//选择的下拉列表下标
    show3:false,//第3个下拉框
    selectData3:['语文','数学','英语','物理','化学','生物','历史','地理','道德与法治'],//下拉列表的数据
    index3:0,//选择的下拉列表下标
    show4:false,//第4个下拉框
    selectData4:['2015','2016','2018','2019','2020'],//下拉列表的数据
    index4:0,//选择的下拉列表下标
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
  onTapSelect(){
    let that = this
    this.setData({
      flag1:!that.data.flag1
    })
  },
  selectTap1(){
    this.setData({
     show1: !this.data.show1
    });
    if(this.data.show1==true){
      this.setData({
        show2:false,
        show3:false,
        show4:false,
      });
    }
    },
  // 点击下拉列表
  optionTap1(e){
    console.log(e);
    let Index1=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
    index1:Index1,
    show1:!this.data.show1,
    });
  },
  selectTap2(){
    this.setData({
     show2: !this.data.show2
    });
    if(this.data.show2==true){
      this.setData({
        show1:false,
        show3:false,
        show4:false,
      });
    }
  },
  // 点击下拉列表
  optionTap2(e){
    console.log(e);
    let Index2=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
    index2:Index2,
    show2:!this.data.show2,
    });
    if(Index2==0||Index2==1){
      this.setData({
        selectData3:['语文','数学','英语','生物','历史','地理','道德与法治'],//下拉列表的数据
      })
    }
    if(Index2==2||Index2==3){
      this.setData({
        selectData3:['语文','数学','英语','物理','生物','历史','地理','道德与法治'],//下拉列表的数据
      })
    }
    if(Index2==4||Index2==5){
      this.setData({
        selectData3:['语文','数学','英语','物理','化学','生物','历史','地理','道德与法治'],//下拉列表的数据
      })
    }
  },
  selectTap3(){
    this.setData({
     show3: !this.data.show3
    });
    if(this.data.show3==true){
      this.setData({
        show1:false,
        show2:false,
        show4:false,
      });
    }
  },
  // 点击下拉列表
  optionTap3(e){
    console.log(e);
    let Index3=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
    index3:Index3,
    show3:!this.data.show3,
    });
  },
  selectTap4(){
    this.setData({
     show4: !this.data.show4
    });
    if(this.data.show4==true){
      this.setData({
        show1:false,
        show2:false,
        show3:false,
      });
    }
  },
  // 点击下拉列表
  optionTap4(e){
    console.log(e);
    let Index4=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
    index4:Index4,
    show4:!this.data.show4,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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