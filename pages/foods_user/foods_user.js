
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    gotoModi:function()
    {
        wx.navigateTo({
          url: '/pages/modifyUserimf/modifyUserimf',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options.openid);
        var that = this
            db.collection("userlist").where({
                _openid: options.openid
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