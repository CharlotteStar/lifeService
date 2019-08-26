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
      { name: "two", value: "周二", checked: true},
      { name: "three", value: "周三" ,checked: true},
      { name: "four", value: "周四", checked: true},
      { name: "five", value: "周五", checked: true},
      { name: "six", value: "周六", checked: true},
      { name: "seven", value: "周日" }
    ],
    canAppointWeek: ["one", "two", "three", "four", "five", "seven"],
    isServiceHour:'false',
    isSpecial: 'false',
    isDispark: 'false',
    disparkDate:7,

    selectedTimeInterval:1,  //选中的时间间隔
    workTimeList:{},   //工作时间列表
    canAppointTime:[],   //选中的工作时间

    yearIndex:0,        //选中的年份的小标
    yearArray: [],      //年份数组
    monthIndex:0,       //选中的月份下标
    monthArray:[],      //月份数组
    weekArray:['一','二','三','四','五','六','日'],
    selectedWeek:0,
    dateArray:[],
  },
  //组件页面显示时调用的函数
  attached() {
    
    this.showWorkTime();
    this.selectedWorkTime();  //默认设置可以预约的小时
    this.setYearArray();    //设置显示的年份
    this.setMonthArray(this.data.yearArray[this.data.yearIndex]);   //设置显示的月份
    this.showCalendar();    //显示日历
  },
  /**
   * 组件的方法列表
   */
  methods: {
    hideSetTime(){
      this.triggerEvent('hideSetTime');
    },
    confirmDate(){
      var canAppointDate=this.getCanAppointDate();
      var canAppointTime = this.data.canAppointTime;
      var canAppointWeek = this.data.canAppointWeek;

      this.triggerEvent("confirm",{
        canAppointDate, canAppointTime, canAppointWeek
      });
      console.log(canAppointDate, canAppointTime, canAppointWeek);
      this.hideSetTime();
    },

    getCanAppointDate(){
      var canAppointDate = [];
      var disparkDate = this.data.disparkDate;
      var dateArray = this.data.dateArray;
      for (var item of dateArray) {
        if (item.isWorkDate) {
          canAppointDate.push(item.value);
          if (canAppointDate.length >= this.data.disparkDate) { break };
        }
      }
      if (canAppointDate.length < disparkDate) {
        var year = this.data.yearArray[this.data.yearIndex];
        var month = this.data.monthArray[this.data.monthIndex];
        var nextMonthDate = this.getNextMonthCount(year, month);
        var n = disparkDate - canAppointDate.length;
        for (var i = 0; i < n; i++) {
          canAppointDate.push(nextMonthDate[i].value);
        };
      }
      return canAppointDate;
    },
    yearPickerChange(e){      //选择的年份改变时
      this.setData({ yearIndex: e.detail.value });
      this.showCalendar();
    },
    monthPickerChange(e){     //选择的月份改变时
      this.setData({ monthIndex: e.detail.value });
      this.showCalendar();
    },
    preMonth(){   //上个月
      if (this.data.monthIndex == 0 && this.data.yearIndex==0){
        return;
      }
      var monthIndex = this.data.monthIndex;
      var yearIndex = this.data.yearIndex;
      monthIndex--;
      if (monthIndex < 0) {
        this.setMonthArray(this.data.yearArray[this.data.yearIndex]-1);
        monthIndex = this.data.monthArray.length-1;
        yearIndex = yearIndex-1;
      }
      this.setData({ monthIndex, yearIndex});
      this.showCalendar();
    },
    nextMonth(){    //下个月
      var monthIndex = this.data.monthIndex;
      var yearIndex = this.data.yearIndex;
      monthIndex++;
      if (monthIndex == this.data.monthArray.length ) {
        this.setMonthArray(this.data.yearArray[this.data.yearIndex] +1 )
        monthIndex = 0;
        yearIndex = yearIndex +1;
      }
      this.setData({ monthIndex, yearIndex });
      this.showCalendar();
    },
    //显示日历
    showCalendar(){
      var year = this.data.yearArray[this.data.yearIndex];      //获取当前选中的年份
      var month = this.data.monthArray[this.data.monthIndex]-1;  //获取当前选中的月份
      this.setData({ selectedWeek: this.getWeekday(year, month) -1 });

      var dateArray = this.getMonthCount(year, month);
      this.setData({ dateArray });
    },
    setYearArray(){  //设置年份数组
      var years=[];
      var year = new Date().getFullYear();
      for(var i=0;i<20;i++){
        years.push(year);
        year++;
      }
      this.setData({ yearArray:years});
    },
    setMonthArray(yearIndex){   //设置月份数组
      var monthArray=[];
      var now = new Date()
      if (yearIndex == now.getFullYear()){
        for (var i = now.getMonth()+1;i<=12;i++){
          monthArray.push(i);
        }
      }else{
        for(var i=1;i<=12;i++){
          monthArray.push(i);
        }
      }
      this.setData({ monthArray});
    },
    //选择工作日期
    selectWorkDate(e){

      var index=e.currentTarget.dataset.index;
      var dateArray = this.data.dateArray;
      if (this.data.yearIndex == 0 && this.data.monthIndex == 0 && index + 1 < new Date().getDate()){return};
      dateArray[index].isWorkDate = !dateArray[index].isWorkDate;
      this.setData({ dateArray });
    },

    // 1.为了获得每个月的日期有多少，需要判断 平年闰年[四年一闰，百年不闰，四百年再闰]
    isLeapYear  (year) {
      return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
    },
    // 2.获得每个月的日期有多少，注意 month - [0-11]
    getMonthCount(year, month) {
      let arr = [
        31, null, 31, 30,
        31, 30, 31, 31,
        30, 31, 30, 31
      ];
      let count = arr[month] || (this.isLeapYear(year) ? 29 : 28);
      var dateArr=[];
      for(var i=0;i<count;i++){
        dateArr[i]={};
        if (this.data.yearIndex==0&&this.data.monthIndex==0&&i+1<new Date().getDate()){
          dateArr[i].isWorkDate = false;
        }else{
          dateArr[i].isWorkDate = true;
        }
        dateArr[i].value=i+1;
      }
      return dateArr;
    },
    // 3.获得某年某月的 1号 是星期几，这里要注意的是 JS 的 API-getDay() 是从 [日-六](0-6)，返回 number
    getWeekday (year, month)  {
      let date = new Date(year, month, 1);
      return date.getDay();
    },
    // 4.获得上个月的天数
    getPreMonthCount  (year, month) {
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
      this.setData({ canAppointWeek: e.detail.value });
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
    selectedWorkTime(){
      var canAppointTime = [];
      for (var item of this.data.workTimeList) {
        if (item.isWorkTime) {
          canAppointTime.push(item.value);
        }
      }
      this.setData({ canAppointTime })
    },
    //选择工作时间
    selectWorkTime(e){
      var workTimeList = this.data.workTimeList;    //获取工作时间的列表
      var index = e.currentTarget.dataset.index;
      workTimeList[index].isWorkTime = !workTimeList[index].isWorkTime;
      this.setData({ workTimeList });
      this.selectedWorkTime();
    },


  }
})
