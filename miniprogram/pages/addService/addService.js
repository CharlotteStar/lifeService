// pages/addService/addService.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceType:'moren',
    appointment:"on",
    astrict:"off",
    showImage:[],
    fakeCount:1,
    serviceType: ['厨卫维修', '家电维修', '电子产品'],
    selectedService: '厨卫维修',
    showServiceType:false
  },

  selectServiceType(){
    this.setData({ showServiceType: true });
  },
  onConfirm(event){
    const { picker, value, index } = event.detail;
    this.setData({ selectedService: value });
  },
  onCancel(){
    this.setData({ showServiceType: false });
  },
  onClose() {
    this.setData({ showServiceType: false });
  },
  onServiceTypeChange(e){

  },
  onPriceTypeChange(e){
    this.setData({priceType:e.detail})
  },
  onPriceChange(e){
    
  },
  onAppointmentChange(e){
    this.setData({ appointment: e.detail })
  },
  onAstrictChange(e) {
    this.setData({ astrict: e.detail })
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