// pages/index/index.js
const db = wx.cloud.database({
  env: "wei-6pifm"
});
Page({
  /**
   * 页面的初始数据
   */
  data: {
    "bnrUrl": [{
      "url": "../../images/index/lunbotu1.jpg"
    }, {
        "url": "../../images/index/lunbotu2.jpg"
    }],
    currentSwiper: 0,
    autoplay: true,
    radio: '',  //选中的服务
    sms:'',    //
    makeimg:''    //保修预约的图片
  },
  //轮播图选中的原点
  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  onChange(event) {   //选中的服务
    console.log(event);
    this.setData({
      radio: event.detail
    });
  },
  tianjia(){ //上传图片
    //1.添加图片
    wx.chooseImage({
      count: 1, //一次性选中几张图片
      sizeType: ['original', 'compressed'], //原图，压缩
      sourceType: ['album', 'camera'], //图片来源，相册，相机
      success: function (res) {
        var list = res.tempFilePaths;
        var file = list[0];
        //2.上传图片 云存储
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + 'jpg',
          filePath: file,
          success: res => {
            //3.图片地址添加到数据库中
            db.collection('subscribe').add({
              data: {
                makeimg: file
              },
              success: (res) => {
                console.log(res)
              }
            })
          }
        });

      }
    });
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