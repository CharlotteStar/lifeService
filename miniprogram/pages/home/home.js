// pages/home/home.js
const db = wx.cloud.database({
  env: "yuan-p9q0n"
});


Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:'shouye',
  },

  toggleTab(e) {
    var active = e.currentTarget.dataset.name;
    this.setData({ active });
    wx.setStorage({
      key: "active",
      data: active
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'active',
      success:res=> {
        var active=res.data
        if(active){
          this.setData({active});
        }
      }
    });
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
    // db.collection("comment").where({
    //   _openid: "oKAww5ajWbOw4qkWnGE8Nx-uM0sA"
    // }).get().then(res => {
    //   var mbg01='background-image:url(' + res.data[0].mbg + ')';
    //   wx.setStorage({
    //     key: "mbg01",
    //     data: mbg01
    //   })
    // });
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