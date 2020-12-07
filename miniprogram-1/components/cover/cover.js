// components/cover/cover.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: true
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
    toLogin(){
      this.triggerEvent('toLoginPage',{})
      // wx.redirectTo({
      //   url: '/pages/turn/turn?id='+1
      // })   
    }

  }
})
