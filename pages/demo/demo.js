// pages/addpeople/addpeople.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    people: [],
    id: '',
    len: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  edit() {
    wx.navigateTo({
      url: '',
    })
  },

  del(res) {
    let that = this
    this.setData({
      id: res.currentTarget.dataset.id
    })
    wx.request({
      url: `http://api.flagship575.top/api/v1/userinfo/${res.currentTarget.dataset.id}`,
      method: 'delete',
      header: {
        token: wx.getStorageSync('token')
      },
      success(res) {
        console.log(res)
        that._getman()
      }
    })
  },
  protect() {
    wx.navigateBack({
      delta: 1,
    })
  },
  onLoad: function (options) {
    //获取 用户id
    this._getman()

  },
  _getman() {
    let that = this
    wx.request({
      url: 'http://api.flagship575.top/api/v1/userinfo',
      method: 'get',
      // data: {
      //   name: '张三',
      //   phone: '17817136798',
      //   idcard: '441581200012030034',
      //   sex: '男',

      // },
      header: {
        token: wx.getStorageSync('token')
      },
      success(res) {
        console.log(res)
        that.setData({
          people: res.data,
          len: res.data.length,
        })
      }
    })
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
    this._getman()
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