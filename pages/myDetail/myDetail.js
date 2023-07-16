// pages/myDetail/myDetail.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    // 删除
    delect(){
        var that=this
        db.collection('goods').where({
            //先查询
            _id: that.data.id
          }).remove().then(res => {
            console.log('删除成功')
            wx.showToast({
              title: '物品已删除！',
              icon: 'none', 
              duration: 2000 
            })
            setTimeout(() => {
                wx.switchTab({
                  url: '../donate/donate',
                })
               }, 1000);
          }).catch(err => {
            console.log('删除失败',err)//失败提示错误信息
          })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options);
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