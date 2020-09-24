// components/toast/toast.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // statue: {
    //   type: String,
    //   value: 'success'
    // },
    // message: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showToast(title , statue = 'success', timeout = 1500 ) {
      this.setData({
        isShow: true,
        title, 
        statue
      })

      setTimeout(() => {
        this.setData({
          isShow: false
        })
      }, timeout);
        
    }
  }
})
