// components/testFliter/testFliter.js
import request from '../../service/request.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    type: [ '中考', '期中', '期末', '单元测试卷' ],
    years: [ '2015', '2016', '2017', '2018', '2019', '2020' ],
    province: [ "北京市", "天津市", "上海市", "重庆市", "河北省", "山西省", "台湾省", "辽宁省", "吉林省", "黑龙江省", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "甘肃省", "四川省", "贵州省", "海南省", "云南省", "青海省", "陕西省", "广西壮族自治区", "西藏自治区", "宁夏回族自治区", "新疆维吾尔自治区", "内蒙古自治区", "澳门特别行政区", "香港特别行政区" ],
    grade: ['七年级上册', '八年级上册', '九年级上册', '七年级下册', '八年级下册', '九年级下册', '中考/会考'],
    subject: [ '语文', '数学', '英语', '生物', '政治', '历史', '地理', '物理', '化学' ],
    years: [ '2015', '2016', '2017', '2018', '2019', '2020' ],
    version: ['人教版', '部编版', '北师大版', '湘教版', '浙教版', '沪教版', '译林牛津版', '粤教版', '粤沪版', '华师大版', '鲁教版', '沪科版', '济南版', '教科版', '冀教版', '青岛版', '仁爱版', '苏教版', '苏科版', '外研版', '中图版' ],
    formData: {
      zlModule: '试卷'
    }
  },

<<<<<<< HEAD
  observers: {
    'formData.zlSubject': function(newVal) {
      console.log(newVal);
      if (newVal === '化学') {
        console.log('化学');
        this.setData({
          grade: ['九年级上册', '九年级下册', '中考/会考'],
        })
      } else if (newVal === '物理') {
        console.log('物理');
        this.setData({
          grade: [ '八年级上册', '九年级上册', '八年级下册', '九年级下册', '中考/会考'],
        })
      } else if (newVal === '生物' || newVal === '地理') {
        console.log('生物地理');
        this.setData({
          grade: ['七年级上册', '八年级上册', '七年级下册', '八年级下册', '中考/会考'],
        })
      } else {
        this.setData({
          grade: ['七年级上册', '八年级上册', '九年级上册', '七年级下册', '八年级下册', '九年级下册', '中考/会考'],
        })
      }

      if (this.data.grade.indexOf(this.data.formData.zlGrade) < 0) {
        this.setData({
          'formData.zlGrade': ''
        })
      } 
    },
    'formData.zlGrade': function(newVal) {
      if (newVal && newVal.indexOf('七年级') >= 0) {
        console.log('七年级');
        this.setData({
          subject: [ '语文', '数学', '英语', '生物', '政治', '历史', '地理'],
        })
      }
      if (newVal.indexOf('八年级') >= 0) {
        console.log('八年级');
        this.setData({
          subject: [ '语文', '数学', '英语', '生物', '政治', '历史', '地理', '物理' ],
        })
      }
      if (newVal.indexOf('九年级') >= 0) {
        console.log('九年级');
        this.setData({
          subject: [ '语文', '数学', '英语', '政治', '历史', '物理', '化学' ],
        })
      }
    },
    'formData.zlType': function(newVal) {
      console.log(newVal);
      if (newVal && newVal.indexOf('中考') >= 0) {
        this.setData({
          zhongkao: true,
          others: false,
        })
      } else if (newVal) {
        this.setData({
          zhongkao: false,
          others: true
        })
      }
    },
    'formData.zlPros': function(newVal) {
      console.log(newVal);
      request({
        url: 'Yunying/getCity',
        method: 'POST',
        data: {
          pname: newVal
        },
      }).then(res =>{
        console.log(res);
        this.setData({
          city: res.data.data
        })
      }).catch(err=>{
        console.log(err);          
      })
    }

  },

=======
>>>>>>> 262854573a0ef0ef98b75f99d8c4447710dc936a
  /**
   * 组件的方法列表
   */
  methods: {
    changSelect(e) {
      console.log(e);
      this.changeStatue(e)

      this.setData({
        [`formData.${e.currentTarget.id}`]: e.detail
      })
    },
    changeStatue(e) {
      if (e.currentTarget.id === 'zlType') {
        if (e.detail === '中考') {
          this.setData({
            zhongkao: true,
            others: false
          })
        } else {
          this.setData({
            zhongkao: false,
            others: true
          })
        }
      } else if (e.currentTarget.id === 'zlProvince') {
        this.setData({
          ['formData.zlCity']: "",
          ['formData.zlArea']: e.detail
        })
        this.getCity(e.detail)
      } else if (e.currentTarget.id === 'zlSubject') {
        console.log('zlSubject');
      } else if (e.currentTarget.id === 'zlGrade') {
        console.log('zlGrade');
      }
    },

    confirm() {
      let formData = this.data.formData
      console.log(formData);
      if (formData.zlProvince) {
        formData.zlArea = formData.zlProvince
        if (formData.zlCity) {
          formData.zlArea += formData.zlCity
        }
      }
      this.triggerEvent('sureClick',formData)
    },
    cleanSelect() {
      this.setData({
        formData: { zlModule: '试卷' },
        zhongkao: false,
        others: false
      })
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
    close() {
      this.triggerEvent('hide',{})
    }

  }
})
