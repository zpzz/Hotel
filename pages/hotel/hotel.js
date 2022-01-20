var app = getApp(), _location = "";
var items = ['item1', 'item2', 'item3']
var ids=1
var stop = true
Page({
  data: {
    bomb: !1,
    showLoading: !0,
    flag: true,
    playlist: [],
    playid: -1,
    detail: [],
    img:'',
    dateout:'',
    datein:''
  },

  date: function (t) {
    var e = wx.getStorageSync("day1"), a = wx.getStorageSync("day2"), o = wx.getStorageSync("day"), n = app.util.time();
    if ("" == e) {
      var i = app.util.time();
      wx.setStorageSync("datein", i);
    } else if (e < n) i = n; else i = e;
    if ("" == a) var l = app.util.addDate(n, 1); else {
      var s = app.util.addDate(n, 1);
      if (console.log(s), a < s) l = s; else l = a;
    }
    o = app.util.day(l, i);
    wx.setStorageSync("day1", i), wx.setStorageSync("day2", l), wx.setStorageSync("day", o),
      this.setData({
        datein: i,
        dateout: l,
        time: o,
        current_date: i
      });
  },

  bindDateChange1: function (t) {
    var e = t.detail.value, a = this.data.dateout, o = (this.data.current_date, app.getTime2Time(a, e));
    wx.setStorageSync("day1", e), wx.setStorageSync("day2", a), wx.setStorageSync("day", o),
      this.setData({
        datein: t.detail.value,
        time: o
      });
  },
  bindDateChange2: function (t) {
    var e = this.data.datein, a = t.detail.value, o = app.getTime2Time(a, e);
    wx.setStorageSync("day1", e), wx.setStorageSync("day2", a), wx.setStorageSync("day", o),
      this.setData({
        dateout: t.detail.value,
        time: o
      });
  },
  getUserInfo: function (t) {
    app.globalData.userInfo = t.detail.userInfo, this.setData({
      userInfo: t.detail.userInfo,
      hasUserInfo: !0
    });
  },
  onShow: function () {
    this.date();
  },
  onPullDownRefresh: function () {
    this.refresh(), wx.stopPullDownRefresh();
  },
  onReachBottom: function () { },
  onUnload: function () { },
  onShareAppMessage: function () { },
  onTap: function (res) {
    console.log(res)
    wx.navigateTo({
      url: `../reservation/reservation?id=${res.currentTarget.dataset.index}&name=${res.currentTarget.dataset.name}&price=${res.currentTarget.dataset.price}&dayin=${res.currentTarget.dataset.dayin}&dayout=${res.currentTarget.dataset.dayout}&time=${res.currentTarget.dataset.time}`
    });


  },
  show: function (res) {
    console.log(res)
    this.setData({
      flag: false,
      playid: res.currentTarget.dataset.id,
      img: res.currentTarget.dataset.img
    })
    let that = this;
    //详情页数据请求
    wx.request({
      url: `http://api.flagship575.top/api/v1/product/${this.data.playid}`,
      success: function (res) {
        console.log(res)
        that.setData({
          detail: res.data,
        })

      }
    })
  },
  // 遮罩层隐藏
  conceal: function () {
    this.setData({ flag: true })
  },
  //获取最新商品
  _getShop(ids){
    let that = this;
    wx.request({
      url: 'http://api.flagship575.top/api/v1/product/recent',
      data: {
        page: ids,
        size: 3
      },
      success: function (res) {
        console.log(res)
        if (res.data.data.data.length<3){
          stop= false
          that.setData({
            playlist: that.data.playlist.concat(res.data.data.data),
          })
        }else{
          that.setData({
            playlist: that.data.playlist.concat(res.data.data.data),
          })
        }
        
        wx.setStorageSync('playid', res.data.data.data.id)
      }
    })
  },
  onLoad: function (options) {
    console.log(options);

    
    this._getShop(ids=1)
    stop =true
    
    //跟新
    // wx.request({
    //   url: `http://api.flagship575.top/api/v1/product/34`,
    //   method: 'delete',
    //   success(res){
    //     console.log(res)
    //   }
    // })
  },
  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    if(stop){
      this._getShop(++ids)
    }
  },
});