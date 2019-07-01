const app = getApp();

Page({
  data: {
    publicKey: "",
    statusBarHeight: 0,
    navHeight: 0,
    settingIcon: "../../images/icon_more.png"
  },

  onReady: function() {
    this.setData({
      publicKey: app.globalData.publicKey,
      statusBarHeight: app.globalData.statusBarHeight,
      navHeight: app.globalData.navHeight
    });
  }
});
