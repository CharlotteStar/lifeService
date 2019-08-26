// pages/addService/addService.js
const db = wx.cloud.database({
  env: "wei-6pifm"
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",      //名称
    digest:"",     //摘要
    priceType:'moren',
    price:"",
    promotion:"",
    isAstrict:"on",
    isAppoint:"off",
    showImage:[],
    fakeCount:1,
    serviceType: ['厨卫维修', '家电维修', '电子产品'],
    selectedService: '厨卫维修',
    showServiceType:false,
    showSetTime: false,
    fileIDs:[],

    appoint:{
      canAppointDate: [25, 26, 27, 28, 29, 30, 31],
      canAppointTime: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
      canAppointWeek: ["one", "two", "three", "four", "five", "seven"]
    },
  },

  saveData() {
    /////将图片上传到云存储/////
    var images = this.data.showImage;
    var promiseArr = [];
    for (var i = 0; i < images.length; i++) {
      //创建promise对象
      promiseArr.push(
        new Promise((reslove, reject) => {
          //获取当前图片
          var item = images[i];
          //创建正则表达式拆分文件后缀名
          var suffix = /.(jpg|png)$/.exec(item)[0]; //截取后缀名 
          var newFile = new Date().getTime() + Math.random().toString(32).substr(2, 6) + suffix; //拼接新的路径 
          //上传图片并且将fileID保存数组
          wx.cloud.uploadFile({
            cloudPath: newFile, //新文件名
            filePath: item, //选中文件
            success: res => { //上传成功
              var fid = res.fileID;
              var ids = this.data.fileIDs.concat(fid);
              this.setData({
                fileIDs: ids
              });
              reslove();
            },
            fail: err => {
              console.log(err);
            }
          })
          //将当前promise任务追加任务列表中
          //上传失败输出错误消息
        })
      )
    };
    ///////将图片保存数据库/////////
    Promise.all(promiseArr).then(res => {
      // this.uploadImages();
      var data = this.data;
      var serviceData = {
        name: data.name,
        digest: data.digest,
        images:this.data.fileIDs ,
        serviceType: data.selectedService,
        appoint: data.appoint,
        price: data.price,
        fakeCount: data.fakeCount
      };
      console.log(serviceData);
      db.collection("service").add({
        data: serviceData
      }).then(res => {
        console.log(res);
        wx.hideLoading();
        wx.showToast({
          title: "发表成功"
        })
      }).catch(err => {
        console.log(err);
        wx.hideLoading();
        wx.showToast({
          title: "发表失败"
        })
      })
    })
  },

  onNameChange(e){
    this.setData({ name: e.detail});
  },
  onDigestChange(e){
    this.setData({ digest:e.detail})
  },
  getAppointData(e){
    this.setData({ appoint :e.detail});
  },
  
  add() {
    this.setData({ fakeCount: ++this.data.fakeCount });
  },
  reduce() {
    this.setData({ fakeCount: --this.data.fakeCount });
  },

  hideSetTime(){
    this.setData({ showSetTime: false});
  },
  
  selectServiceType(){
    this.setData({ showServiceType: true });
  },

  onSelectedServiceConfirm(event){
    const { picker, value, index } = event.detail;
    this.setData({ selectedService: value });
    this.onSelectedServiceClose();
  },
  onSelectedServiceClose() {
    this.setData({ showServiceType: false });
  },
  onSelectedServiceCancel(){
    this.onSelectedServiceClose();
  },
  
  setAppointmentTime() {
    this.setData({ showSetTime: true })
  },
  setTimeClose() {
    this.setData({ showSetTime: false });
  },
  onServiceTypeChange(e){

  },
  onPriceTypeChange(e){
    var priceType = e.detail
    this.setData({priceType });
    if (priceType==mianfei){
      this.setData({ price:0 })
    }
  },
  onPriceChange(e){
    this.setData({price:e.detail});
  },
  onPromotionChange(e){
    this.setData({promotion:e.detail});
  },
  onAstrictChange(e){
    this.setData({ isAstrict: e.detail })
  },
  onIsAppointChange(e) {
    this.setData({ isAppoint: e.detail });
  },
  onFakeChange(){
    
  },
  chooseImage(){
    wx.chooseImage({
      sizeType: ["original", "compressed"],
      sourceType: ["album", "carmera"],
      success:(res)=>{
        var showImage=res.tempFilePaths;
        this.setData({showImage})
      }
    })
  },
  uploadImages() {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})