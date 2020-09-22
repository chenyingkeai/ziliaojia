Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    index:Number,
    show:Boolean,
    project: {
      type: String,
      value: '',
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  options: {
    addGlobalClass: true,
  },
  methods: {
    // 这里是一个自定义方法
    optionTap(e){
      console.log(e);
      let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
      this.setData({
      index:Index,
      show:!this.data.show,
      'formSubmit.join_group':Index+1
      });
      console.log(this.data.formSubmit.join_group);
    },
  }
})