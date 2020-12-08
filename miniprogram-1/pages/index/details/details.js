// pages/index/details/details.js
import request from '../../../service/request.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailsId:"",//index页传来的数据
    isGood:'',
    zlGood:'',
    isDownLoad:"",
    isCollect:"",
    materianInfo:"",
    SecTap:'',//二号按键
    haveShare: 0,
    points: 0,
    ifLogin:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var that = this;
    if (options.hisOpenid) {
      wx.setStorage({
        key: 'hisOpenid',
        data: options.hisOpenid,
      });        
    }
    that.setData({
      detailsId:options.id
    })
    if (options.shareTicket) {
      wx.getShareInfo({
        shareTicket: options.shareTicket,
        success: res => {
          console.error(res)
          console.error({
            referrer: options.query.inviter_id,//分享人的用户id
            encryptedData: res.encryptedData,
            iv: res.iv
          })
        }
      })
    }
    this.getGoodAndFavor()

    this.getMaterianInfo()
  },
  // 请求资料数据
  getMaterianInfo(){
      request({
        url: 'Yunying/getMaterialInfo',
        method: 'POST',
        data: {
          zlId: this.data.detailsId
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
  getGoodAndFavor(){
    let that = this
    let openId =wx.getStorageSync('openId');
    let userId =wx.getStorageSync('userId');
    console.log(openId,userId,that.data.detailsId);
    request({
      url: 'material/getGoodAndFavorite',
      method: 'POST',
      data: {
        "openId":openId ,
        "userId":userId ,
        "zlId" :that.data.detailsId
      }
    }).then(res =>{
      console.log(res.data);
      if (res.data.code === 200) {
        console.log("成功获得点赞收藏信息");
        that.setData({
          isGood:res.data.data.isGood,
          isCollect:res.data.data.isCollect,
          isDownLoad:res.data.data.isDownLoad
        })
        console.log(res.data.data.isDownLoad);
      } else {
        console.log('获得对应点赞收信息失败');
      }
    }).catch(err=>{
      console.log(err);          
    })
  },
  // 点赞资料
  tapGood(){
      let that =this
      let openId =wx.getStorageSync('openId');
      console.log(openId);
      let index =this.data.detailsId;
      console.log(index);
      request({
        url: 'material/setGood/{openId}/{zlId}?openId='+openId+'&zlId='+index,
        method: 'POST',
        data: {
          "openId" : openId,
          "zlId" :index
        }
      }).then(res =>{
        console.log(res.data);
        if (res.data.code === 200) {
          console.log("点赞/取消点赞成功");
          console.log(res.data);
          that.getGoodAndFavor()
          console.log(res.data.data)
          if(!this.data.isGood){
            let zlGood=+that.data.materianInfo.zlGood+1
            this.setData({
                ['materianInfo.zlGood']:zlGood
            })
            console.log(zlGood)
          }else{
            let zlGood=+that.data.materianInfo.zlGood-1
            this.setData({
                ['materianInfo.zlGood']:zlGood
            })
            console.log(zlGood)
          }
        } else {
          console.log('点赞失败');
        }
      }).catch(err=>{
        console.log(err);          
      })
  },
  // 收藏
  tapCollect(e){
      let openId =wx.getStorageSync('openId');
      console.log(openId);
      let index =e.currentTarget.dataset.index;
      console.log(index);
      request({
        url: 'material/setFavorite/{openId}/{zlId}?openId='+openId+'&zlId='+index,
        method: 'POST',
        data: {
          "openId" : openId,
          "zlId" :index
        }
      }).then(res =>{
        let that = this
        console.log(res.data);
        if (res.data.code === 200) {
          console.log("收藏成功");
          that.setData({
            isCollect:!this.data.isCollect,
          })
          let pages = getCurrentPages();
          let prepage = pages[pages.length-2];
          prepage.setData({
            refreshData: true
          })
        } else {
        }
      }).catch(err=>{
        console.log(err);          
      }) 
  },
  // 兑换
  buyKeyword(){
    console.log(app.globalData);
      let userId =app.globalData.userid || app.globalData.userId;
      let zlDownload=this.data.materianInfo.zlDownload
      let index =this.data.detailsId;
      let Keyword =this.data.materianInfo.zlKeyword
      console.log(userId,zlDownload,index);
      wx.showModal({
        title: '提示',
        content: '确定要兑换该资料吗',
        success : (res) => {
          if (res.confirm) {
            request({
              url: 'material/updateXzqByUserId',
              method: 'POST',
              data: {
                "userId" : userId,
                "xzq":zlDownload,
                "zlId" :index
              }
            }).then(res =>{
              let that = this
              console.log(res);
              console.log(res.data);
              console.log(Keyword);
              if (res.data.code === 200) {
                wx.navigateTo({
                  url: '/pages/index/details/haszl/haszl?id='+Keyword
                })
                that.setData({
                  isDownLoad:true
                })
              } else if (res.data.code === 404) {
                wx.showModal({
                  title: '兑换失败',
                  content: '下载券不够，兑换失败~快去邀请好友赚下载券吧',
                  showCancel: false,
                  confirmText: '确定',
                  confirmColor: '#3CC51F',
                });
                  
              } else {
                console.log(res);
                wx.showToast({
                  title: "兑换失败",
                  icon: 'none',
                  duration: 2000
                })
              }
            }).catch(err=>{
              console.log(err); 
              wx.showToast({
                title: "兑换失败",
                icon: 'none',
                duration: 2000
              })         
            }) 
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
  },
  
  checkKeyword(){
      let Keyword =this.data.materianInfo.zlKeyword
      wx.navigateTo({
        url: '/pages/index/details/haszl/haszl?id='+Keyword
        })
  },
    // 登陆覆盖
  toLoginPage(){
    wx.navigateTo({
      url: '/pages/turn/turn?id='+2+'?page'+this.data.detailsId
    })       
  },
    
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.popup = this.selectComponent("#popup");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let that = this
    let openId =wx.getStorageSync('openId');
    if(openId){
      console.log("登陆成功");
      this.setData({
        ifLogin:false
      })
      wx.showTabBar()
    }else{
      this.setData({
        ifLogin:true
      })
      wx.hideTabBar()
    }
    // if(openId){
    //   console.log("登陆成功");
    // }else{
    //   wx.redirectTo({
    //     url: '/pages/turn/turn?id='+2+'?page'+that.data.detailsId
    //   })   
    // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let myOpenid = wx.getStorageSync("openId")
    let zlId = this.data.detailsId
    return {
      title: '海量初中学习资料',
      path: `/pages/details/details?hisOpenid=${myOpenid}&id=${zlId}`,
     // imageUrl: 'http://static.e-mallchina.com/pic/product/brand/detail/hgds.jpg'//自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
    }
  }
})