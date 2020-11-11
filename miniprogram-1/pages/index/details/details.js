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
    showType1:Boolean,
    showType2:Boolean,
    showType3:Boolean
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
  getMaterianInfo(){
    let that =this
    request({
      url: 'Yunying/getMaterialInfo',
      method: 'POST',
      data: {
        zlId: this.data.detailsId
      }
    }).then(res =>{
      let that = this
      const { code, data } = res.data;
      if (code === 200) {
        this.setData({
          materianInfo: data,
          zlGood:res.data.data.zlGood
        })
        console.log(data);
        if(that.data.materianInfo.zlType=="课件"||that.data.materianInfo.zlType=="知识点"){
          that.setData({
            showType1:true,
            showType2:false,
            showType3:false,
          })  
          console.log("知识点");
          
        }
        if(that.data.materianInfo.zlType=="中考真题"||that.data.materianInfo.zlType=="中考模拟"||that.data.materianInfo.zlType=="中考"){
          that.setData({
            showType1:false,
            showType2:true,
            showType3:false,
          })  
          console.log("真题");
          
        }else{
          that.setData({
            showType1:false,
            showType2:false,
            showType3:true,
          })          
          console.log("试卷");
          
        }
      } else {
        console.log('获取失败');
      }
    }).catch(err=>{
      console.log(err);          
    })
  },
  getGoodAndFavor(){
    let that = this
    let openId =wx.getStorageSync('openid');
    let userId =wx.getStorageSync('userid');
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
    tapGood(e){
      let that =this
      let openid =wx.getStorageSync('openid');
      console.log(openid);
      let index =this.data.detailsId;
      console.log(index);
      request({
        url: 'material/setGood/{openId}/{zlId}?openId='+openid+'&zlId='+index,
        method: 'POST',
        data: {
          "openId" : openid,
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
      let openid =wx.getStorageSync('openid');
      console.log(openid);
      let index =e.currentTarget.dataset.index;
      console.log(index);
      request({
        url: 'material/setFavorite/{openId}/{zlId}?openId='+openid+'&zlId='+index,
        method: 'POST',
        data: {
          "openId" : openid,
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
      let userId =app.globalData.userid;
      let zlDownload=this.data.materianInfo.zlDownload
      let index =this.data.detailsId;
      console.log(userId,zlDownload,index);
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
        let Keyword =this.data.materianInfo.zlKeyword
        console.log(res.data);
        if (res.data.code === 200) {
          console.log("兑换成功");
          that.setData({
            isDownLoad:true
          })
          wx.navigateTo({
            url: '/pages/index/details/haszl/haszl?id='+Keyword
            })
        } else {
        }
      }).catch(err=>{
        console.log(err);          
      }) 
    },
    checkKeyword(){
      let Keyword =this.data.materianInfo.zlKeyword
      wx.navigateTo({
        url: '/pages/index/details/haszl/haszl?id='+Keyword
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
  onShow() {
    let openid =wx.getStorageSync('openid');
    console.log(openid);
    if(openid){
      console.log("登陆成功");
    }else{
      wx.redirectTo({
        url: '/pages/turn/turn?id='+2+'?page'+that.data.detailsId
      })   
    }
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
    let myOpenid = wx.getStorageSync("openid")
    let zlId = this.data.detailsId
    return {
      title: '海量初中学习资料',
      path: `/pages/details/details?hisOpenid=${myOpenid}&id=${zlId}`,
     // imageUrl: 'http://static.e-mallchina.com/pic/product/brand/detail/hgds.jpg'//自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
    }
  }
})