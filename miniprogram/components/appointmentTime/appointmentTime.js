// components/appointmentTime/appointmentTime.js
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
    selectServiceWeek: [
      { name: "one", value: "周一", checked: true },
      { name: "two", value: "周二" },
      { name: "three", value: "周三" },
      { name: "four", value: "周四" },
      { name: "five", value: "周五" },
      { name: "six", value: "周六" },
      { name: "seven", value: "周日" }
    ],
    serviceWeek: [],
    isServiceHour:'false',
    isSpecial: 'false',
    isDispark: 'false',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //设置预约时间
    checkboxTimeChange(e) {
      this.setData({ serviceWeek: e.detail.value });
    },
    isServiceHourChange(event){
      this.setData({
        isServiceHour: event.detail
      });
    },
    isDisparkChange(event) {
      this.setData({
        isDispark: event.detail
      });
    },
    isSpecialChange(event) {
      this.setData({
        isSpecial: event.detail
      });
    },
  }
})
