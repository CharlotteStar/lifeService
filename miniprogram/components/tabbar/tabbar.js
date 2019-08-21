// components/tabbar/tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    active: {
      type:String,
      value:"shouye"
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleTab(e){
      var active = e.currentTarget.dataset.name;
      this.setData({ active: this.data.active});
      // var url="";
      // switch(active){
      //   case 'shouye':
      //     url = "/pages/index/index";break;
      //   case "serviceDesc":
      //     url = "/pages/serviceDesc/serviceDesc"; break;
      //   case "onlineRepairs":
      //     url = "/pages/onlineRepairs/onlineRepairs"; break;
      //   case "busCardList":
      //     url = "/pages/busCardList/busCardList"; break;
      //   case "me":
      //     url = "/pages/me/me";
      // }
      // wx.switchTab({url});
      console.log(this.data.active)
    }
  }
})
