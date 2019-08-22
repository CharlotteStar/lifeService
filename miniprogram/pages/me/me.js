// pages/me/me.js
const db = wx.cloud.database({
  env: "yuan-p9q0n"
});

// components/tabbar/tabbar.js
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
    mbg01: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo() {
      wx.getUserInfo({
        success(res) {
          console.log(res.userInfo);
          wx.setStorage({
            key: 'userInfo',
            data: res.userInfo,
          })
        }
      })
    },
    login() {
      // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
      wx.getSetting({
        success(res) {
          console.log(res.authSetting['scope.userInfo']);
          if (!res.authSetting['scope.userInfo']) {

          }
        }
      })
    },
  },
  attached: function () {
    // wx.getStorage({
    //   key: 'mbg01',
    //   success:(res)=> {
        
    //   }
    // })
    // db.collection("comment").where({
    //   _openid: "oKAww5ajWbOw4qkWnGE8Nx-uM0sA"
    // }).get().then(res => {
    //   this.setData({ mbg01: `background-image:url(${res.data[0].mbg})` });
    // });
  }
})

