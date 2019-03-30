App({
  
  onLaunch: function (options) {

    let that = this
    var openid = (wx.getStorageSync('openid'));
    // var openid = "oSGkO0eEX5YOeFSJjcLUMqVINJ3k";
    // wx.setStorageSync('openid', openid);
    var d = that.globalData
    if (openid) {
    } else {
      // 登录
      wx.login({
        success: function (res) {
          if (res.code) {
            var url = d.host + "/wechat/api/session.html";
            wx.request({
              url: url,
              data: {
                mpid: d.mpid,
                code: res.code,
              },
              success: function (res) {
                
                if(res.data.code == 1)
                {
                  wx.setStorageSync('session_key', res.data.data.session_key);
                  wx.setStorageSync('openid', res.data.data.openid);
                  wx.request({
                    url: d.serverurl+'/login',
                    data: {
                      openid: res.data.data.openid,
                    },
                    success: function (res) {
                      console.log(res.data)
                     that.globalData.ucid = res.data.ucid
                      if (res.data.is_cook != 2)
                      {
                        wx.reLaunch({
                          url: '../login/login',
                        })
                      }
                    }
                  })
                }
                
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }

        }
      })
    }
  },
  globalData: {
    userInfo: null,
    ucid: 1,
    mpid: wx.getExtConfigSync().mpid,
    uaid: wx.getExtConfigSync().uaid,
    host: wx.getExtConfigSync().host,
    serverurl: wx.getExtConfigSync().api_url,
    socket_url: wx.getExtConfigSync().socket_url,
    msg_url: wx.getExtConfigSync().host + '/addon/park/msg'
  }
})