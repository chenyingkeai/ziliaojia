// components/modal/modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showIcon: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ''
    },
    content: {
      type: String,
      value: ''
    },
    comfirmColor: {
      type: String,
      value: '#999999'
    },
    slotContent: {
      type: Boolean,
      value: false
    }
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
    hideModel() {
      this.triggerEvent('hideModel',{})
    },
    sureClick() {
      this.triggerEvent('sureClick',{})
    },
  }
})
