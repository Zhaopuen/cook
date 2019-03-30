// pages/finishOrder/finishOrder.js
const app = getApp()
const globalData = app.globalData;
var intervalis;
var durtion = 30000
Page({

  /**
   * 页面的初始数据
   */
  data: {

    maskText:[

    ],
    maskDate:'01-19（今天）',
    currentActive:0,
    dateIsShow: false,
    currentActivezz: 0,
    day:'',
    fail_order_count:0,
    success_order_count:0
  },


  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentActive: e.detail.current
    })
  },
  // 点击切换
  tabClick(e) {
    const that = this;
    console.log(e)
    if (that.data.currentActive === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentActive: e.currentTarget.dataset.current
      })
    }

  },


  // 时间选择
  select: function (e) {
    var day = e.currentTarget.dataset.day;
      this.setData({
      currentActivezz: e.currentTarget.dataset.current,
      maskDate: e.currentTarget.dataset.name,
      day: day,
      dateIsShow: false
    })
    var that = this;
    that.show(day);
  },

  show:function(day='')
  {
    var that = this;
   
    if (globalData.ucid == 0) {
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(function () {
        wx.hideLoading()
        that.show();
      }, 3000);
      return false;
    }
    wx.request({
      url: globalData.msg_url + '/order_list', // 仅为示例，并非真实的接口地址
      data: {
        uaid: globalData.uaid,
        ucid: globalData.ucid,
        day:day
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        that.setData({
          fail_order: res.data.fail_order,
          maskText: res.data.date,
          day: res.data.day,
          maskDate: res.data.select_date,
          success_order: res.data.success_order,
          success_order_count: res.data.success_order_count,
          fail_order_count: res.data.fail_order_count
        })
      }
    })
  },


  // 时间的弹窗
  dateClick: function(){
    this.setData({
      dateIsShow: true
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    intervalis = setInterval(function () {
      that.show(that.data.day);
    }, durtion) 
      this.show();
  },

  change_success:function(e)
  {
    var order_id = e.target.dataset.order;
    var that = this;
    wx.request({
      url: globalData.msg_url + '/pack_order', // 仅为示例，并非真实的接口地址
      data: {
        uaid: globalData.uaid,
        ucid: globalData.ucid,
        order_id:order_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
          if(res.data.code == 200)
          {
             that.show();
          }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    for (var i = 4; i <= intervalis; i++) {
      clearInterval(i)
    }
  }

})