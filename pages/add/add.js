// pages/add/add.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        a:'',
        b:'',
        c:'',
        d:'',
        e:'',
        f:'',
        g:'',
        h:'',
        i:'',
        j:'',
        k:'',
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

    // 名称
    a(e) {
        console.log(e.detail.value);
        this.setData({
            a: e.detail.value
        })
    },

    // 数量
    b(e) {
        console.log(e.detail.value);
        this.setData({
            b: e.detail.value
        })
    },

    // 生产日期
    c(e) {
        console.log(e.detail.value);
        this.setData({
            c: e.detail.value
        })
    },

    // 保质期 
    d(e) {
        console.log(e.detail.value);
        this.setData({
            d: e.detail.value
        })
    },

    // 损坏程度
    e(e) {
        console.log(e.detail.value);
        this.setData({
            e: e.detail.value
        })
    },

    // 使用说明
    f(e) {
        console.log(e.detail.value);
        this.setData({
            f: e.detail.value
        })
    },

    // 禁用人群
    g(e) {
        console.log(e.detail.value);
        this.setData({
            g: e.detail.value
        })
    },

    // 生产地址
    h(e) {
        console.log(e.detail.value);
        this.setData({
            h: e.detail.value
        })
    },

    // 购买日期
    i(e) {
        console.log(e.detail.value);
        this.setData({
            i: e.detail.value
        })
    },

        // 查看年龄范围
        j(e) {
            var that=this
            console.log(e.detail.value);
            if (that.data.k=='') {
                if (e.detail.value<0) {
                    that.setData({
                        j: 0
                    })
                    wx.showToast({
                        title: '输入错误',
                        icon: 'none', //没有图标
                        duration: 2000 //持续的时间
                      })
    
                }else{
                    that.setData({
                        j: e.detail.value
                    })
                }
            }else{
                if (e.detail.value<0|| e.detail.value>parseFloat(that.data.k)) {
                    that.setData({
                        j: 0
                    })
                    wx.showToast({
                        title: '输入错误',
                        icon: 'none', //没有图标
                        duration: 2000 //持续的时间
                      })
    
                }else{
                    that.setData({
                        j: e.detail.value
                    })
                }
            }
            
           
        },

        // 查看年龄范围
        k(e) {
            var that=this
            console.log(e.detail.value);
            console.log(that.data.j);
            if (e.detail.value<0 || e.detail.value<parseFloat(that.data.j)) {
                 
                wx.showToast({
                    title: '输入错误',
                    icon: 'none', //没有图标
                    duration: 2000 //持续的时间
                  })

            }else{
                that.setData({
                    k: e.detail.value
                })
            }
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
            that.data.g==''||
            that.data.h==''||
            that.data.i==''||
            that.data.j==''||
            that.data.k==''||that.data.j>that.data.k) {
             
 
   wx.showToast({
    title: '请输入完整信息',
    icon: 'none', //没有图标
    duration: 2000 //持续的时间
  })
        }else{
            db.collection("goods").add({
                data: {
                    img: that.data.img,
                    a:that.data.a,
                    b:that.data.b,
                    c:that.data.c,
                    d:that.data.d,
                    e:that.data.e,
                    f:that.data.f,
                    g:that.data.g,
                    h:that.data.h,
                    i:that.data.i,
                    j:parseFloat(that.data.j),
                    k:parseFloat(that.data.k),

                },
                success(p) {
                  console.log("已加入", p)
                  wx.switchTab({
                    url: '../donate/donate',
                  })
                },
                fail(p) {
                  console.log("加入失败",p)
                }
              })
        }

   },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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