
//初始化数据
function tabbarinit() {
  return [
    {
      "current": 0,
      "selectedIconPath": "/images/icon/icon_shouye_press.png",
      "iconPath": "/images/icon/icon_shouye.png",
      "pagePath": "../pages/index/index",
      "text": "首页"
    },
    {
      "current": 0,
      "selectedIconPath": "/images/icon/icon_serviceDesc_press.png",
      "iconPath": "/images/icon/icon_serviceDesc.png",
      "pagePath": "/pages/serviceDesc/serviceDesc",
      "text": "服务说明"
    },
    {
      "current": 0,
      "iconPath": "/images/icon/icon_onlineRepairs.png",
      "pagePath": "/pages/onlineRepairs/onlineRepairs",
      "isSpecial": true,
      "text": "在线报修"
    },
    {
      "current": 0,
      "selectedIconPath": "/images/icon/AFEI4-c2EAQYACDCi6vqBSjczoSVATAgOCBAZQ.png",
      "iconPath": "/images/icon/AFEI4-c2EAQYACDCi6vqBSiM75mRBDAgOCBAZQ.png",
      "pagePath": "/pages/busCardList/busCardList",
      "text": "名片列表"
    },
    {
      "current": 0,
      "selectedIconPath": "/images/icon/icon_me_press.png",
      "iconPath": "/images/icon/icon_me.png",
      "pagePath": "/pages/me/me",
      "text": "我的"
    }
  ]

}
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar
  that.setData({ bindData });
}

module.exports = {
  tabbar: tabbarmain
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: tabbarmain
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