const app = getApp();

Page({
  data: {
    publicKey: "",
    statusBarHeight: 0,
    navHeight: 0
  },

  onReady: function() {
    this.setData({
      publicKey: app.globalData.publicKey,
      statusBarHeight: app.globalData.statusBarHeight,
      navHeight: app.globalData.navHeight
    });
  }
});
