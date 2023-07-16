// pages/modifyUserimf/modifyUserimf.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        img: '',
        a:'',
        b:'',
        c:'',
        d:'',
        e:'',
        f:'',
        g:'',
    },

    // 昵称
    a(e) {
        console.log(e.detail.value);
        this.setData({
            a: e.detail.value
        })
    },

    // 性别
    b(e) {
        console.log(e.detail.value);
        this.setData({
            b: e.detail.value
        })
    },

    // 手机号
    c(e) {
        console.log(e.detail.value);
        this.setData({
            c: e.detail.value
        })
    },

    // 微信号 
    d(e) {
        console.log(e.detail.value);
        this.setData({
            d: e.detail.value
        })
    },

    // 称呼
    e(e) {
        console.log(e.detail.value);
        this.setData({
            e: e.detail.value
        })
    },

    // 城市
    f(e) {
        console.log(e.detail.value);
        this.setData({
            f: e.detail.value
        })
    },

    // 年龄
    g(e) {
        console.log(e.detail.value);
        if (e.detail.value<0) {
            wx.showToast({
                title: '输入错误',
                icon: 'none', //没有图标
                duration: 2000 //持续的时间
              })
        }else{
            this.setData({
                g: e.detail.value
            })
        }
        
    },

    // 上传图片
uploadImg(){
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log("成功",res);
        that.uploadImage(res.tempFilePaths[0]);
      }
    })
  },
  // 上传到云存储
  uploadImage(fileURL) {
    wx.cloud.uploadFile({
      cloudPath:new Date().getTime()+'.png', // 上传至云端的路径
      filePath: fileURL, // 小程序临时文件路径
      success: res => {
        //获取图片的http路径
        this.imgPath(res.fileID)  // res.fileID 是上传图片的 fileID
      },
      fail: console.error
    })
  },
   
   // 获取图片上传后的https的url路径地址  参数是上传图片的 fileId
    imgPath(fileId) {
      console.log(fileId)
      wx.cloud.getTempFileURL({
        fileList: [fileId],
        success: res => {
          console.log("获取url地址：",res.fileList[0].tempFileURL);
          this.setData({
              img:res.fileList[0].tempFileURL
          })
        },
        fail: console.error
      })
    },

    // 保存
    primary(){
         var that=this
         if (that.data.img==''||
         that.data.a==''||
         that.data.b==''||
         that.data.c==''||
         that.data.d==''||
         that.data.e==''||
         that.data.f==''||
         that.data.g==''
     ) {
          

wx.showToast({
 title: '请输入完整信息',
 icon: 'none', //没有图标
 duration: 2000 //持续的时间
})
     }else{
         db.collection("userlist").where({
            _openid: wx.getStorageSync('openId')
          }).get({
            success(e) {
              console.log("查询结果",e)
              if (e.data.length==0) {
                db.collection("userlist").add({
                    data: {
                        img: that.data.img,
                        a:that.data.a,
                        b:that.data.b,
                        c:that.data.c,
                        d:that.data.d,
                        e:that.data.e,
                        f:that.data.f,
                        g:parseFloat(that.data.g),
                    },
                    success(p) {
                      console.log("已加入", p)
                      wx.switchTab({
                        url: '../user/user',
                      })
                    },
                    fail(p) {
                      console.log("加入失败",p)
                    }
                  })
              }else{
                db.collection('userlist').where({
                    //先查询
                    _openid: wx.getStorageSync('openId')
                  }).update({
                    data: {
                        img: that.data.img,
                        a:that.data.a,
                        b:that.data.b,
                        c:that.data.c,
                        d:that.data.d,
                        e:that.data.e,
                        f:that.data.f,
                        g:that.data.g,
                      }
                  }).then(res => {
                    console.log('更新成功')
                    wx.switchTab({
                        url: '../user/user',
                      })
                  }).catch(err => {
                    console.log('更新失败',err)//失败提示错误信息
                  })
              }
            }
          })
        }

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.user() //用户信息获取
    },
        //用户信息获取
        user() {
            var that = this
            db.collection("userlist").where({
                _openid: wx.getStorageSync('openId')
            }).get({
                success(e) {
                    console.log("查询结果", e)
                    wx.setStorageSync('user', e.data[0])
                    that.setData({
                        img: e.data[0].img,
                        a:e.data[0].a,
                        b:e.data[0].b,
                        c:e.data[0].c,
                        d:e.data[0].d,
                        e:e.data[0].e,
                        f:e.data[0].f,
                        g:e.data[0].g,
                    })
    
                }
            })
        },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})