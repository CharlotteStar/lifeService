// pages/busCardList/busCardList.js
const db = wx.cloud.database({
  env: "wei-6pifm"
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
    empData: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toEmpDetail(e) {
      var eid=e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '/pages/empDetail/empDetail?eid='+eid,
      })
    }
  },
  attached: function() {
    db.collection("staff").get().then(res => {
      var empData = res.data;
      this.setData({
        empData
      });
    });

  }
})