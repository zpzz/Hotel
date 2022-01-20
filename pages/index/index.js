var app = getApp(), _location = "";

Page({
  data: {
    bomb: !1,
    showLoading: !0,
    code:'',
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
  login: function (e) {
    
    var that = this
    wx.request({

      url: 'http://api.flagship575.top/api/v1/token/user',
      data: {
        code : wx.getStorageSync('code')
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res)
        wx.setStorageSync('token', res.data.token)
      }
    })
    
    
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
    var that = this
    wx.login({

      success: function (res) {
        console.log(res.code)
        //发送请求
        wx.setStorageSync('code', res.code)
        that.setData({
          code: res.code
        })
      }
    })
  },
  onPullDownRefresh: function () {
    this.refresh(), wx.stopPullDownRefresh();
  },
  onReachBottom: function () { },
  onUnload: function () { },
  onShareAppMessage: function () { },
  async onTap(event) {
    await this.login()
     wx.navigateTo({
       url:"../hotel/hotel"
     });
    

  },
  onLoad: function (options) {
    
    
  }
});