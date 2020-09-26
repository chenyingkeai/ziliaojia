// pages/manager/childCpn/btn-area/btn-area.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    btnText:{
      type: Array,
      value: []
    },
    deleteBtn: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    firstBtn() {
      this.triggerEvent('firstBtn',{})
    },
    secBtn() {
      this.triggerEvent('secBtn',{})
    }
  }
})
