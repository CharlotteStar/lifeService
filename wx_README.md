# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档 
#project.config.json 项目配置文件    云开发movielist33云函数ajax请求

#app.json  项目全局配置文件   在根目录找文件或图片用 / 在根目录下找

#exam01.json  组件配置文件   小程序宽度：375rpx

# "window":{} 全局窗口配置 1.navigationBarBackgroundColor导航条背景颜色  2.navigationBarTitleText 导航条标题
  3.navigationBarTextStyle导航条背景文字颜色，目前只有黑色和白色


# "tabbar" :{}   tabBar回车自动调用，导航栏
    "pagePath": "pagePath",  //点击按钮跳转组件
     "text": "text", //按钮文字
     "iconPath": "iconPath", //按钮默认图标 
     "selectedIconPath": "selectedIconPath" //按钮选中图标
  # 注意：！最少两个按钮  不能使用网络的，只能是    本地的路径图片
    设置pagePath为第二个组件，可以切换

  #lazy-load="true" 图片用的image的懒加载
  
   /* 引入外部文件import "./base.wxss*/
   @import "../../style/common.wxss"

  # 在项目js文件中的data中存数据 还有使用
    {{}} 使用数据
    wx:if="count<1"  true显示，false隐藏
    wx:elif="count<10"  
    wx:elif="count<20"
    wx:else     

    hidden="{{user.length==0}}" 判断条件：true隐藏  false显示

    wx:for="{{list2}}" wx:key="index"  view:{{item.no}} {{item.name}}
      item 当前对象{}   [{},{}]

     # 支持冒泡与不支持冒泡
     支持冒泡：bindtap="handle2"父  bindtap="handle1"子
     不支持冒泡：catchtap="handle2"父  catchtap="handle1"子

    # 带参数跳转：bindtap="jumpaddmin" a跳转  不能返回
    wx.redirectTo({
      url:'/pages/love/love?id=19', //在json不加最前面的/其他地方都加
    });
      从个人中心传了一个参数过去love ,在love打印一下options就收到了


      # 禁止用户下拉操作：全局app.json    也可以单个组件
       "enablePullDownRefresh":false

    # 初始化默认云数据库
           const db=wx.cloud.database ({ 
             //第二个环境 env:"环境id" 
           });
            addData: function(){
    # 此方法完成向mydatabase云数据库集合添加数据
    db.collection("mydatabase").add({
      data:{  //添加数据
          name:"文华",age:60

      },
      success:(res)=>{ //添加成功回调
        console.log(res);
      },

      fail:(err)=>{ //添加失败回调
        console.log(err);
      }
    });
  },

   # 改变数据
    update:function(){ //更新数据  
    db.collection('web1903user'). //集合
      doc('13dba11c5d2edf7d09666fa60f03dcac') //id  在云开发中
      .update({   //更新
        data:{age:"33"}  //没有这个属性就添加
      }).then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      });
  },

   remove: function(){  //删除数据
    db.collection("web1903user").doc('13dba11c5d2edf7d09666fa60f03dcac').remove().then(res=>{console.log(res)}).catch(err=>{
      console.log(err);
    })
  },

   selectAll(){ //查找web1903emp集合中所有数据
      db.collection('web1903emp').get(
        ).
      then(res=>{
        console.log(res)
        this.setData({
          list: res.data
        });
        
        }).catch(err=>{console.log(err)})
   },

    selectWhere(){ // 查询name:www用户 指定数据
      db.collection('web1903emp').where({name:'www'}).get()
      .then(res=>{console.log(res)
       //将请求回来的数据存在data变量中
         this.setData({
        list:res.data
      });

      }).catch(err=>{console.log(err)})
   },

   #选择图片上传到云存储，并且将图片地址fileID保存到数据库中
        wx.chooseImage({ //选择图片
       count:1, //1次一张
       sizeType:['original','compressed'],
       sourceType:['album','camera'],
       success:(res)=>{
         //上传图片
         console.log(res.tempFiles)
         
       },
       fail:(err=>{console.log(err)})
     });

     #上传图片文件并且为图片起新名字
           //2.2给图片起一个新名字
         var newFile=new Date().getTime()+'.jpg';
         wx.cloud.uploadFile({  //上传文字的方法函数
            cloudPath:newFile, //起一个新名字为图片
            filePath:file,  //起新的图片路径
            success:(res)=>{
              console.log(res)
              },
              fail:(err)=>{
                console.log(err)
              }
         })
         
         下载ajax请求库
   npm install --save request
   npm install --save request-promise 

  //注意：如果添加了两个环境  env:"环境id"
         data数据中绑定了可以在控制台APPData中查看
         #FileID 文件路径
- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

