// pages/manager/upload/select/select.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selectShow:false,
    nowText:"热门点击",
    animationData:{},
    propArray: [1,2,3,4]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showOption(){
      var nowShow=this.data.selectShow;//获取当前option显示的状态
      //创建动画
      var animation = wx.createAnimation({
          timingFunction:"ease"
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
      console.log(this.data.animationData);
      this.setData({
          selectShow: !nowShow
      })
    },
  //设置内容
    setText(e){
      var nowData = this.data.propArray;
      var nowIdx = e.target.dataset.index;
      var nowText = nowData[nowIdx];
      this.triggerEvent('changType',nowData[nowIdx].type)
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
