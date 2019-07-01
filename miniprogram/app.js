//app.js
App({
  onLaunch() {
    wx.cloud.init();
    wx.getSystemInfo({
      success: res => {
        this.globalData.statusBarHeight = res.statusBarHeight;
        if (res.system.indexOf("iOS") > -1) {
          this.globalData.navHeight = 44;
        } else {
          this.globalData.navHeight = 48;
        }
      },
      fail(err) {
        console.log(err);
      }
    });
  },
  globalData: {
    publicKey: "",
    isOberverModel: true,
    statusBarHeight: 0,
    navHeight: 0
  }
});
