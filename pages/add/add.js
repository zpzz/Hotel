// pages/add/add.js
Page({
  formSubmit: function (e) {
    console.log('form发生了submit事件，提交数据：', e.detail.value)
    let that = this
    wx.request({
      url: 'http://api.flagship575.top/api/v1/userinfo',
      method: 'post',
      data: {
        name: e.detail.value.name,
        phone: e.detail.value.phone,
        idcard: e.detail.value.idcard,
        sex: e.detail.value.sex,

      },
      header: {
        token: wx.getStorageSync('token')
      },
      success(res) {
        console.log(res)
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  /**
   * 页面的初始数据
   */
  data: {
        name: '张三',
        phone: '17817136792',
        idcard: '441581200012030033',
        sex: '男',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})