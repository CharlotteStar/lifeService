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

    selectedTimeInterval:1,  //选中的时间间隔
    workTimeList:{},   //工作时间列表
    selectedWorkTimeList:[],   //选中的工作时间

    yearIndex: 0,
    yearArray: [2019,2020],
    monthIndex:0,
    monthArray:[8,9],
    weekArray:['一','二','三','四','五','六','日']
  },
  //组件页面显示时调用的函数
  attached() {
    this.data.isServiceHour == "true" ? this.showWorkTime() : null; 
    var year = new Date().getFullYear();
    var month = new Date().getMonth();
    console.log(this.getWeekday(year, month));
    console.log(this.getMonthCount(year, month));
    console.log(this.getPreMonthCount(year, month));
    console.log(this.getNextMonthCount(year, month));
    console.log(this.isLeapYear(year));
  },
  /**
   * 组件的方法列表
   */
  methods: {
    yearPickerChange(e){
      this.setData({ yearIndex: e.detail.value });
    },
    monthPickerChange(e){
      this.setData({ monthIndex: e.detail.value });
    },

    setYearMonthArray(){
      var year = new Date().getFullYear();
      var years=[];
      for(var i=0;i<20;i++){
        var year = new Date().getFullYear();
      }
      console.log(year)
    },

    // 1.为了获得每个月的日期有多少，我们需要判断 平年闰年[四年一闰，百年不闰，四百年再闰]
    isLeapYear  (year) {
      return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
    },
    // 2.获得每个月的日期有多少，注意 month - [0-11]
    getMonthCount  (year, month) {
      let arr = [
        31, null, 31, 30,
        31, 30, 31, 31,
        30, 31, 30, 31
      ];
      let count = arr[month] || (isLeapYear(year) ? 29 : 28);
      return Array.from(new Array(count), (item, value) => value + 1);
    },
    // 3.获得某年某月的 1号 是星期几，这里要注意的是 JS 的 API-getDay() 是从 [日-六](0-6)，返回 number
    getWeekday (year, month)  {
      let date = new Date(year, month, 1);
      return date.getDay();
    },
    // 4.获得上个月的天数
    getPreMonthCount  (year, month)  {
      if (month === 0) {
        return this.getMonthCount(year - 1, 11);
      } else {
        return this.getMonthCount(year, month - 1);
      }
    },
    // 5.获得下个月的天数
    getNextMonthCount  (year, month)  {
      if (month === 11) {
        return this.getMonthCount(year + 1, 0);
      } else {
        return this.getMonthCount(year, month + 1);
      }
    },


    //设置预约时间
    checkboxTimeChange(e) {
      this.setData({ serviceWeek: e.detail.value });
    },
    isServiceHourChange(event){
      this.setData({
        isServiceHour: event.detail
      });
      event.detail == "true" ? this.showWorkTime() : null ;
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

    //选择工作时间间隔
    selectTimeInterval(e){
      var interval=e.target.dataset.interval;
      this.setData({ selectedTimeInterval:interval});
      this.showWorkTime();
    },
    //显示时间列表
    showWorkTime(){
      var interval = this.data.selectedTimeInterval //获取选中的时间间隔
      var workTimeList = [];  //创建工作时间列表
      
      //循环给工作时间列表赋值
      for (var i = 0; i < 24 / interval; i++) {
        var timeOption = new Date(1000 * 60 * 60 * (i * interval)).toUTCString().split(" ")[4].substr(0, 5);
        workTimeList[i] = {};
        //是否是工作时间  设置默认8点至22点为工作时间
        workTimeList[i].isWorkTime = i * interval >= 8 && i * interval <= 22 ? true : false;
        workTimeList[i].value = timeOption;  //工作时间列表
      };
      this.setData({ workTimeList });
    },

    //选择工作时间
    selectWorkTime(e){
      var workTimeList = this.data.workTimeList;    //获取工作时间的列表
      var index = e.currentTarget.dataset.index;
      workTimeList[index].isWorkTime = !workTimeList[index].isWorkTime;
      this.setData({ workTimeList });
    },


  }
})
