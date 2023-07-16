// pages/detail/detail.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    close(e) {
        var that=this
        wx.showModal({
          editable:true,//显示输入框
          placeholderText:'输入感谢话语。',//显示输入框提示信息
          success: res => {
            if (res.confirm) { //点击了确认
              console.log(res.content)//用户输入的值
console.log(that.data.user[0].a+that.data.user2[0].a);
               
db.collection("txt").add({
    data: {
      txt:res.content,
      name:that.data.user[0].a,
      name2:that.data.user2[0].a,
      size:0,
    },
    success(p) {
      console.log("已加入", p)
      wx.switchTab({
        url: '../thank/thank',
      })
    },
    fail(p) {
      console.log("加入失败",p)
    }
  })

            } else {
              console.log('用户点击了取消')
            }
          }
        })
      },


    // 查看物主
    foods_user(){
        
        var that=this
        console.log(that.data.goods[0]._openid);
        wx.navigateTo({
          url: '../foods_user/foods_user?openid='+that.data.goods[0]._openid,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that=this
        db.collection("goods").where({
            _id: options.id
          }).get({
            success(e) {
              console.log("查询结果",e)
              that.setData({
                  id:e.data[0]._id,
                  goods:e.data
              })

              db.collection("userlist").where({
                _openid: e.data[0]._openid
            }).get({
                success(res) {
                    console.log("查询结果", res)
                    
                    that.setData({
                        user2: res.data,
                    })
    
                }
            })

            }
          })

          db.collection("userlist").where({
            _openid: wx.getStorageSync('openId')
        }).get({
            success(e) {
                console.log("查询结果", e)
                wx.setStorageSync('user', e.data[0])
                that.setData({
                    user: e.data,
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