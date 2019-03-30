// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[
      {
        img:'http://img3.imgtn.bdimg.com/it/u=1212590761,3409269528&fm=26&gp=0.jpg',
        name:'蒜香小牛排',
        num:'2',
        price:'30.2'
      },
      {
        img: 'http://img5.imgtn.bdimg.com/it/u=2512107569,598511766&fm=26&gp=0.jpg',
        name: '干煸豆角',
        num: '3',
        price: '23.2'
      },
      {
        img: 'http://img2.imgtn.bdimg.com/it/u=1259852263,2230543369&fm=26&gp=0.jpg',
        name: '鱼香肉丝',
        num: '4',
        price: '55'
      }, 
      {
        img: 'http://img5.imgtn.bdimg.com/it/u=2963871669,3017137896&fm=26&gp=0.jpg',
        name: '米饭',
        num: '10',
        price: '10'
      }
    ],
    isShow: false
  },

// 获取电话号码
  getPhoneNumber(e) {
    console.log(e)
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },

  // 打电话
  makePhone(){
    wx.makePhoneCall({
      phoneNumber: '18302934963' // 仅为示例，并非真实的电话号码
    })
  },

  // 提醒取餐的弹窗
  remandClick(){
    this.setData({
      isShow: true
    })
  },
  remandCloseClick() {
    this.setData({
      isShow: false
    })
  },
  sureClick(){
    this.setData({
      isShow: false
    })
    wx.navigateTo({
      url: '../index/index',
    })
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