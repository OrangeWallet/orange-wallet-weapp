const app = getApp();
var _animation;
var _animationIndex = 0;
var _animationIntervalId = -1;
const _ANIMATION_TIME = 300;

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
