const app = getApp();

Page({
  data: {
    publicKey: "",
    netType: "Testnet",
    balance: "0.00",
    ckbUnit: "CKB"
  },

  onReady: function() {
    this.setData({
      publicKey: app.globalData.publicKey
    });
  },
  onSetting: function() {}
});
