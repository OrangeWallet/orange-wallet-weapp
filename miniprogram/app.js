//app.js
App({
  onLaunch() {
    wx.cloud.init();
  },
  globalData: {
    publicKey: "",
    isOberverModel: true
  }
});
