const app = getApp();

Page({
  data: {
    publicKey: ""
  },

  onReady: function() {
    this.setData({
      publicKey: app.globalData.publicKey
    });
  }
});
