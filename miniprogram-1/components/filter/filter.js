// components/filter/filter.js
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
    selectList1:["七年级上册","七年级下册","八年级上册","八年级下册","九年级上册","九年级下册","中考","会考"],
    selectList2:['语文','数学','英语','物理','化学','道德与法治'],
    selectList3:['知识点','教案','课件'],
    seleteCondition: {
      zlModule: '资料'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectChange(e){
      let query = e.currentTarget.dataset;
      if (query.num === query.prenum) {
        query.value = ''
        query.num = -1
      }
      this.setData({
        [`seleteCondition.${query.name}`]: query.value,
        [query.item]: query.num,
      })
    },
    cleanSelect() {
      this.setData({
        selectNum1: -1,
        selectNum2: -1,
        selectNum3: -1,
        seleteCondition: {
          zlModule: '资料'
        }
      })
    },

    confirm() {
      this.triggerEvent('sureClick',this.data.seleteCondition)
    },
    close() {
      this.triggerEvent('hide',{})
    }
  }
})
