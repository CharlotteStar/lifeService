// pages/addBusCard/addBusCard.js 
const db = wx.cloud.database({
  env: "wei-6pifm"
});

Page({

  /** 
   * 页面的初始数据 
   */
  data: {
    name: '',
    phone: '',
    post: '',
    email: '',
    wxid: '',
    city: '',
    specific: '',
    avatar: '',
    aboutMe: '',
    showAvatar: ''
  },
  //上传头像 
  chooseAvatar() {
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "carmera"],
      success: (res) => {
        var filePath = res.tempFilePaths[0];
        this.setData({
          showAvatar: filePath
        });
      }
    })
  },
  uploadAvatar() {
    var suffixReg = /.(jpg|png)$/
    var suffix = suffixReg.exec(this.data.showAvatar)[0]; //截取后缀名 
    var newPath = new Date().getTime() + Math.random().toString(32).substr(2, 6) + suffix; //拼接新的路径 
    wx.cloud.uploadFile({
      cloudPath: newPath,
      filePath: this.data.showAvatar,
      success: (res) => {
        if (res.statusCode == 200) {
          var fileID = res.fileID
          this.setData({
            avatar: fileID
          });
          this.saveData();
        }
      }
    })
  },
  saveData() {
    var empData = {
      name: this.data.name,
      phone: this.data.phone,
      post: this.data.post,
      email: this.data.email,
      wxid: this.data.wxid,
      address: {
        city: this.data.city,
        specific: this.data.specific,
      },
      avatar: this.data.avatar,
      aboutMe: this.data.aboutMe
    }
    db.collection("staff").add({
      data: empData,
      success: (res) => {
        console.log(res);
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  //获取姓名 
  onNameChange(event) {
    this.setData({
      name: event.detail
    })
  },
  //电话 
  onPhoneChange(event) {
    this.setData({
      phone: event.detail
    })
  },
  //岗位 
  onPostChange(event) {
    this.setData({
      post: event.detail
    })
  },
  //邮箱 
  onEmailChange(event) {
    this.setData({
      email: event.detail
    })
  },
  //微信号 
  onWxidChange(event) {
    this.setData({
      wxid: event.detail
    })
  },
  //地址-城市 
  onCityChange(event) {
    this.setData({
      city: event.detail
    })
  },
  //地址-具体地址 
  onSpecificChange(event) {
    this.setData({
      specific: event.detail
    })
  },

  //关于我 
  onAboutMeChange(event) {
    this.setData({
      aboutMe: event.detail
    })
  },

  commitData() {
    this.uploadAvatar();
  },

  onLoad: function(options) {

  },

  /** 
   * 生命周期函数--监听页面初次渲染完成 
   */
  onReady: function() {

  },

  /** 
   * 生命周期函数--监听页面显示 
   */
  onShow: function() {

  },

  /** 
   * 生命周期函数--监听页面隐藏 
   */
  onHide: function() {

  },

  /** 
   * 生命周期函数--监听页面卸载 
   */
  onUnload: function() {

  },

  /** 
   * 页面相关事件处理函数--监听用户下拉动作 
   */
  onPullDownRefresh: function() {

  },

  /** 
   * 页面上拉触底事件的处理函数 
   */
  onReachBottom: function() {

  },

  /** 
   * 用户点击右上角分享 
   */
  onShareAppMessage: function() {

  }
})