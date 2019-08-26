// components/inputNumber/input.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    maxlength:{
      type:Number,
      value:100
    },
    value:{
      type:Number,
      value:10
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
    add(){
      this.setData({ value: ++this.data.value});
      this.triggerEvent("add");
    },
    reduce(){
      this.setData({ value: --this.data.value });
      this.triggerEvent("reduce");
    }
  }
})
