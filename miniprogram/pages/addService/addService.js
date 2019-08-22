// pages/addService/addService.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceType:'moren',
    appointment:"on",
    isAstrict:"off",
    showImage:[],
    fakeCount:1,
    serviceType: ['厨卫维修', '家电维修', '电子产品'],
    selectedService: '厨卫维修',
    showServiceType:false,
    showSetTime: false,
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
    this.setData({priceType:e.detail});
    console.log(this.data.priceType);
  },
  onPriceChange(e){
    
  },
  onAppointmentChange(e){
    this.setData({ appointment: e.detail })
  },
  onIsAstrictChange(e) {
    this.setData({ isAstrict: e.detail });
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