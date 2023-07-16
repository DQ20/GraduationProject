// pages/thank/thank.js
const db = wx.cloud.database()
let  dianzan=false
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodNums:0,
        dianzanpng:"/images/thank/dianzan.png",
        dianzanpng2:"/images/thank/dianzan-active.png",
    },

    tc(e){
        var that=this
        console.log(e.currentTarget.dataset.id)
        let id = e.currentTarget.dataset.id
        db.collection("txt").where({
            _id:id
        }).get({
            success(e) {
console.log(e);
                wx.showModal({
                    title: '感谢信内容',
                    content: e.data[0].txt, //提示内容
                    success: function (res) {
                      if (res.confirm) {
                
                        console.log('确定')
                
                      } else {
                
                        console.log('取消')
                
                      }
                
                    }
                  })

            }
        })

    },

    clickzan(e){
        var that=this
        console.log(e)
        let id = e.currentTarget.dataset.id
        // that.setData({
        //     dianzanpng:dianzan?"/images/thank/dianzan.png":"/images/thank/dianzan-active.png",
            
        // })
        db.collection("txt").where({
            _id:id
        }).get({
            success(e) {
                db.collection('txt').where({
                    //先查询
                    _id: id
                  }).update({
                    data: {
                        size: e.data[0].size+1,
                      }
                  }).then(res => {
                    that.onLoad()
                  }).catch(err => {
                    console.log('更新失败',err)//失败提示错误信息
                  })

            }
        })
    },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this
        db.collection("txt").get({
            success(e) {
                console.log("查询结果", e)
                wx.setStorageSync('user', e.data[0])
                that.setData({
                    txt: e.data,
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
        this.onLoad()
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