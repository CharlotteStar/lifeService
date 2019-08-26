// pages/onlineRepairs/onlineRepairs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTab: ['全部', '厨卫维修', '家电维修', '电子产品'],
    currentTab: 0,  //切换tab内容
    sendList: [],
  },
  currentTab: function (e) { //点击切换内容
    if (this.data.currentTab == e.currentTarget.dataset.idx) {
      return;
    }
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    /*this.select = {
      page: 1,
      size: 6,
      isEnd: false
    }*/
    this.data.sendList = [];
    //this.getData()
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