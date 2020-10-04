// pages/manager/upload/select/select.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    propArray: Array,
    placeholder: String,
    nowText: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    selectShow:false,
    animationData:{},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showOption(){
      let nowShow = this.data.selectShow;//获取当前option显示的状态
      //创建动画
      let animation = wx.createAnimation({
        timingFunction: "ease"
      })
      this.animation = animation;
      if(nowShow){
        animation.rotate(0).step();
        this.setData({
          animationData: animation.export()
        })
      }else{
        animation.rotate(90).step();                
        this.setData({
          animationData: animation.export()
        })
      }
      this.setData({
        selectShow: !nowShow
      })
    },

    //设置内容
    setText(e){
      let nowData = this.properties.propArray;
      let nowIdx = e.target.dataset.index;
      let nowText = nowData[nowIdx];
      this.triggerEvent('changSelect',nowData[nowIdx])
      //再次执行动画
      this.animation.rotate(0).step();
      this.setData({
          selectShow: false,
          nowText: nowText,
          animationData: this.animation.export()
      })
    }
  }
})
