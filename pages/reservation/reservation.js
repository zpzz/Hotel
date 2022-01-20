let numpeo=true
Page({
  data: {
    array: ['0人', '1人', '2人'],
    people:[],
    objectArray: [{
        id: 1,
        room:'',
        price:'',
        name: '1间'
      },
      {
        id: 2,
        name: '2间'
      },
    ],
    index: '0',
    currentTime: '12:00',
    id: '',
    time: '',
    time1: '',
    time2:  + ' ' + '00:00:00',
    name: '',
    phone: '',
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time1: this.data.dayin + ' ' + e.detail.value + ':00',
      time: e.detail.value
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindKeyInput2: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  _bindshow() {
    if (this.data.index == 0) {
      wx.showToast({
        title: '请选择人数',
        icon: 'none'
      })
    } else if (this.data.name == '') {
      wx.showToast({
        title: '请填写入住人',
        icon: 'none'
      })
    } else if (this.data.phone == '') {
      wx.showToast({
        title: '请填写联系电话',
        icon: 'none'
      })
    } else if (!(/^1[34578]\d{9}$/.test(this.data.phone))) {
      wx.showToast({
        title: '联系电话有误',
        icon: 'none'
      })
    }
     else if (this.data.time == '') {
      wx.showToast({
        title: '请选择预计到店时间',
        icon: 'none'
      })
    } else {
      wx.navigateTo({
        url: "../identity/identity"
      });
      wx.request({
        url: 'http://api.flagship575.top/api/v1/order/place',
        method: 'post',
        header: {
          token: wx.getStorageSync('token')
        },
        data: {
          products: [{
            product_id: this.data.id,
            count: this.data.index
          }],
          userInfo_id: this.data.name,
          check_in_time: this.data.time1,
          check_out_time: this.data.dayout + ' ' + '00:00:00' ,
        },
        success(res) {
          console.log(res)
        }
      })
    }
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e)
    this.setData({
      name: e.detail.value.name[0]
    })
  },
  onTap_identity: function(event) {
    this._bindshow()
    
  },

  onLoad(res) {
    console.log(res)
    this.setData({
      id: res.id,
      room:res.name,
      price: res.price,
      dayout: res.dayout,
      dayin: res.dayin,
      day:res.time
    })
  },
  onShow: function () {
    this._getpeople()
  },
  _getpeople(){
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
        if (res.data!=''){
          that.setData({
            people: res.data,
            numpeo: false
          })
        }
      }
    })

  },
  addpeo(){
    wx.navigateTo({
      url: '../addpeople/addpeople',
    })
  }
});