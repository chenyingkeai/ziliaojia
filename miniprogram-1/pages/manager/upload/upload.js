// pages/manager/upload/upload.js
import request from '../../../service/request.js'
import { watch } from "../../../app.js";
const app =  getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {},
    module: [ '试卷', '资料' ],
    typeList: {
      type: [ '中考真题', '中考模拟', '期中', '期末', '单元测试卷' ],
      type2: [ '知识点', '课件', '教案' ],
    },
    grade: ['七年级上册', '八年级上册', '九年级上册', '七年级下册', '八年级下册', '九年级下册', '中考/会考'],
    subject: [ '语文', '数学', '英语', '生物', '政治', '历史', '地理', '物理', '化学' ],
    version: ['人教版', '部编版', '北师大版', '湘教版', '浙教版', '沪教版', '译林牛津版', '粤教版', '粤沪版', '华师大版', '鲁教版', '沪科版', '济南版', '教科版', '冀教版', '青岛版', '仁爱版', '苏教版', '苏科版', '外研版', '中图版' ],
    province: [ "北京市", "天津市", "上海市", "重庆市", "河北省", "山西省", "台湾省", "辽宁省", "吉林省", "黑龙江省", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "甘肃省", "四川省", "贵州省", "海南省", "云南省", "青海省", "陕西省", "广西壮族自治区", "西藏自治区", "宁夏回族自治区", "新疆维吾尔自治区", "内蒙古自治区", "澳门特别行政区", "香港特别行政区" ],
    uploadImg: [
      
    ],
    img: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    options.formData && this.setDefaultData(options.formData)
    let years = this.getYears()
    this.setData({
      years
    })
  },
  setDefaultData(data) {
    let formData = JSON.parse(data)
    this.haveModule(formData.zlModule)
    this.setData({
      formData,
      isUpdata: true,
      uploadImg: formData.zlAddress
    })
  },
  getYears(starY = 2015) {
    let date= new Date;
    let y = date.getFullYear()
    let years = []
    for (let i = starY; i <= y; i++) {
      years.push(i)
    }
    return years 
  },

  getCity(city) {
    request({
      url: 'Yunying/getCity',
      method: 'POST',
      data: {
        pname: city
      },
    }).then(res =>{
      console.log(res);
      this.setData({
        city: res.data.data
      })
    }).catch(err=>{
      console.log(err);          
    })
  },

  cancel() {
    wx.navigateBack({
      delta: 1
    })
  },
  comfirmBtn() {
    if (this.data.isUpdata) {
      this.updata()
    } else {
      this.upload()
    }
  },
  upload() {
    let formData = this.data.formData
    if (formData.zlPros) {
      formData.zlArea = formData.zlPros + formData.zlCity
    }
    formData.zlAddress = this.data.uploadImg.toString()
    request({
      url: 'Yunying/insertZl',
      method: 'POST',
      data: formData
    }).then(res =>{
      console.log(res);
      if (res.statusCode === 200 && res.data.code === 404) {
        this.selectComponent('#toast').showToast('请填写完整信息', 'none', 1500)

      } else if (res.statusCode === 200 && res.data.code === 200) {
        this.selectComponent('#toast').showToast('上传资料成功', 'success', 1500)
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          });
        }, 1500);
        let pages = getCurrentPages();
        let prepage = pages[pages.length-2];
        prepage.setData({
          refreshData: true
        })
      } else {
        wx.showToast({
          title: '上传失败，请稍后重试',
          icon: 'none',
          duration: 1500,
          mask: false,
        });
      }
    }).catch(err=>{
      console.log(err);          
    })
  },
  updata() {
    let formData = this.data.formData
    if (formData.zlProvince) {
      formData.zlArea = formData.zlProvince + formData.zlCity
    }
    formData.zlAddress = this.data.uploadImg.toString()
    request({
      url: 'Yunying/updateMaterialByZlId',
      method: 'POST',
      data: formData
    }).then(res =>{
      console.log(res);
      if (res.statusCode === 200 && res.data.code === 404) {
        wx.showToast({
          title: '请填写完整信息',
          icon: 'none',
          duration: 1500,
          mask: false,
        });
      } else if (res.statusCode === 200 && res.data.code === 200) {
        this.selectComponent('#toast').showToast('修改资料成功', 'success', 1500)
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          });
        }, 1500);
        let pages = getCurrentPages();
        let prepage = pages[pages.length-2];
        prepage.setData({
          refreshData: true
        })
      } else {
        wx.showToast({
          title: '上传失败，请稍后重试',
          icon: 'none',
          duration: 1500,
          mask: false,
        });
      }
    }).catch(err=>{
      console.log(err);          
    })
  },

  baseInput(e) {
    this.setData({
      [`formData.${e.target.id}`]: e.detail.value
    });
  },
  changSelect(e) {
    if (e.currentTarget.id === 'zlModule') {
      if (this.data.formData.zlModule === e.detail ) {
        return
      }
      this.haveModule(e.detail)
      this.setData({
        ['formData.zlType']: null,
      })
    } else if (e.currentTarget.id === 'zlType') {
      this.haveType()
    } else if (e.currentTarget.id === 'zlPros') {
      this.getCity(e.detail)
      this.setData({
        ['formData.zlCity']: null,
      })
    }else if (e.currentTarget.id === 'zlGrade') {
      if (e.detail.includes('八年级')) {
        console.log('八年级');
        this.setData({
          subject: [ '语文', '数学', '英语', '生物', '政治', '历史', '地理', '物理' ],
        })
      } else if (e.detail.includes('九年级')) {
        console.log('九年级');
        this.setData({
          subject: [ '语文', '数学', '英语', '政治', '历史', '物理', '化学' ],
        })
      } else if (e.detail.includes('七年级')) {
        console.log('七年级');
        this.setData({
          subject: [ '语文', '数学', '英语', '生物', '政治', '历史', '地理'],
        })
      } else if (e.detail.includes('中考')) {
        console.log('中考');
        this.setData({
          subject: [ '语文', '数学', '英语', '生物', '政治', '历史', '地理', '物理', '化学' ],
        })
      }
    }
    this.setData({
      [`formData.${e.currentTarget.id}`]: e.detail
    });
  },
  uploadFile() {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
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
              let uploadImg = this.data.uploadImg
              uploadImg.push(rtnData.data)
              that.setData({
                uploadImg
              })
            }
          }
        });
      },
      fail: () => {},
      complete: () => {}
    });
      
    
  
  
  },
  deleteImg(e) {
    let index = e.currentTarget.dataset.index
    let uploadImg = this.data.uploadImg
    wx.showModal({
      title: '是否删除图片',
      content: '',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          uploadImg.splice(index,1)
          this.setData({
            uploadImg,
          })
        }
      },
    });
      
  },

  // 监听模块跟类型的选择
  haveModule(module) {
    let type
    if (module === '试卷') {
      type = this.data.typeList.type
    } else {
      type = this.data.typeList.type2
    }
    this.setData({
      haveModule: true,
      haveType: false,
      ['formData.zlType']: null,
      type
    })
  },
  haveType() {
    this.setData({
      haveType: true
    })
  },

})