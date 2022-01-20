var items = ['item1', 'item2', 'item3']
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionSheetHidden: true,
    actionSheetItems: items
  },
  changeTap: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetTap: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
})