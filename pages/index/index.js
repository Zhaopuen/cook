//index.js
//获取应用实例
const app = getApp()
const globalData = app.globalData;
var intervalis;
var durtion = 30000;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    success: [],
    wait:[],
    ing: [],
    imghost:globalData.host+"/uploads/",
    currentTab: 0,
    navScrollLeft: 0,
    isShow: false,   //弹窗显示隐藏
    currentActive:0,  // 新增订单弹窗
    finishtime: "11:45",
    widthScreen: null,
    moveData: null,
    rotateData: null,
    alphaData: null,
    scaleData: null,
    skewData: null,
    queueData1: null,
    queueData2: null,
    matrixData: null,
    height: "100rpx",
    moveDatass: [
      { name: 'donghua 1', queueData: null},
      { name: 'donghua 2', queueData: null },
      { name: 'donghua 3', queueData: null },
      { name: 'donghua 4', queueData: null }
    ],
    items: [],
    startX: 0, //开始坐标
    startY: 0
    // currentData: 0,
  },
  
  onLoad: function () {
    var thisBlock = this;
    wx.getSystemInfo({
      success: function (res) {
        thisBlock.setData({
          widthScreen: res.screenWidth
        })
      },
    })
    this.show();

    thisBlock.setData({
      height: this.data.height
    })

    var openids = wx.getStorageSync('openid');
    console.log(openids,'openidsopenids')
    if (openids == ""){
      wx.reLaunch({
        url: '../login/login',
      })
    }
  },

  // 动画
  queueClick: function (e) {
    console.log(e,'hahahah')
    var animation = wx.createAnimation({});
    animation.translate((this.data.widthScreen - 0), 0).scale(0.3).opacity(0).height(0).step({ duration: 3000 })
    this.data.moveDatass[e.currentTarget.dataset.index].queueData = animation.export()
    this.setData({
      moveDatass: this.data.moveDatass,
    })
    // this.data.moveDatass.splice(e.currentTarget.dataset.index, 1)
  },
  onShow: function () {
    var that = this;
    intervalis= setInterval(function () {
      that.show();
        //console.log(123)
    }, durtion) 
    this.show();
  },

  onHide: function () {
    for (var i = 4; i <= intervalis; i++) {
      clearInterval(i)
    }
  },

  cookClick: function (options) {
    var id = options.target.dataset.id;
    var status = options.target.dataset.status;
    if(status == 2)
    {
      var menu_data = this.data.ing.list[id].order;
    }else{
      var menu_data = this.data.wait.list[id].order;
    }
    
  
    var that =this;
    wx.request({
      url: globalData.msg_url + '/change', // 仅为示例，并非真实的接口地址
      data: {
        uaid: globalData.uaid,
        ucid: globalData.ucid,
        order: menu_data,
        status: status,
        mid:id
      },

      method:"POST",
      success(res) {
        console.log(res.data.code)
        if(res.data.code == 200)
        {
          that.show();
        }
        // var animation = wx.createAnimation({});
        // animation.translate((that.data.widthScreen - 0), 0).scale(0.3).opacity(0).height(0).step({ duration: 3000 })
        // that.data.moveDatass[options.target.dataset.id].queueData = animation.export()
        // that.setData({
        //   moveDatass: that.data.moveDatass,
        // })
      }
    })
  },


  // 点击切换
  tabClick(e){
    // this.setData({
    //   currentActive:e.currentTarget.dataset.current
    // })
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
  /**
 * 生命周期函数--监听页面隐藏
 */
  onHide: function () {
    wx.hideLoading()
  },
  show: function () {
    var that = this;
    console.log(globalData.ucid,'2222');
    if(globalData.ucid == 0)
    {
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
      url: globalData.msg_url + '/cook_menu', // 仅为示例，并非真实的接口地址
      data: {
        uaid: globalData.uaid,
        ucid: globalData.ucid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {

        that.setData({
          wait: res.data.wait,
          ing: res.data.ing,
          success: res.data.success
        })
      }
    })
  }
})
