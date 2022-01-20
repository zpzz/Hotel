// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderlist:[],
    day1:'',
    day2:'',
    id:'',
    test:[],
  },
  cancel(res){
    console.log(res)
    this.setData({
      id: res.currentTarget.dataset.id
    })
    let that=this
    wx.showModal({
      title: '是否取消该订单',
      content: '',
      success(res){
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: `http://api.flagship575.top/api/v1/order/${that.data.id}`,
            method:'delete',
            header: {
              token: wx.getStorageSync('token')
            },
            success(res) {
              console.log(res)
              that._getorder()
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getorder()
  },
  _getorder(){
    var that = this
    wx.request({
      url: 'http://api.flagship575.top/api/v1/order/by_user',
      method: 'get',
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        page:'1',
        size:'10'
      },

      success(res) {
        console.log(res)
        let dataList = res.data.data.data; //获取到的数据
        dataList.forEach((item) => {
          item.check_in_time = item.check_in_time.substring(0, 10);
          item.check_out_time = item.check_out_time.substring(0, 10); //要截取字段的字符串
        })
        that.setData({
          orderlist: dataList
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