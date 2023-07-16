// app.js
App({

    data: {
  
    }, 
    
    onLaunch: function () {
  
      wx.cloud.init({
        env: "cloud1-1gqx3ugm4244089e"
      })
  
  
      // 获取openid
   
        wx.cloud.callFunction({
          name: 'getOpenId', // 打开微信云开发控制平台，左上角点击[云函数]
          data: {},
          success: res => {
            console.log(res.result.openid)
    
            wx.setStorageSync('openId', res.result.openid)
            
            console.log('openId',wx.getStorageSync('openId'))
  
        
  
          },
          fail: err => {
            console.error('获取失败：', err)
          }
        })
    
  
  
      
  
  
    },
  
  
  
  })
  