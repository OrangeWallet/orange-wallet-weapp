const app = getApp();

Page({
  data: {
    password: "",
    passwordErrorMessage: "",
    repassword: "",
    repasswordErrorMessage: "",
    observerChecked: false,
    observerDisable: false
  },
  onPasswordBlur: function(event) {
    this.setData({ password: event.detail });
  },
  onRePasswordBlur: function(event) {
    this.setData({ repassword: event.detail });
  },
  onObserverChanged: function(event) {
    this.setData({ observerChecked: event.detail });
  },
  onSwitchQuestion: function() {
    wx.showModal({
      title: "观察钱包",
      showCancel: false,
      content:
        "不导入私钥，仅导入公钥以供查看余额、交易等信息，无法签名、转账等操作"
    });
  },
  createWallet: function() {
    this.setData({
      passwordErrorMessage: "",
      repasswordErrorMessage: ""
    });
    if (this._validPassword()) {
      wx.showLoading({
        title: "生成中"
      });
      const WalletUtils = require("../../utils/wallet_utils");
      const fail = () => {
        wx.hideLoading();
        wx.showModal({
          title: "提示",
          content: "创建失败，请重试"
        });
      };
      WalletUtils.generateEcPair()
        .then(ecPair => {
          if (this.data.observerChecked) {
            ecPair.privateKey = "";
          }
          WalletUtils.writeWallet({
            ecPair,
            password: this.data.password,
            success: () => {
              app.globalData.publicKey = ecPair.publicKey;
              app.globalData.isOberverModel = this.data.observerChecked;
              wx.reLaunch({
                url: "../home/home"
              });
            },
            fail
          });
        })
        .catch(fail);
    }
  },
  _validPassword: function() {
    if (this.data.password.length < 8) {
      this.setData({ passwordErrorMessage: "密码最少八位" });
      return false;
    } else if (this.data.password != this.data.repassword) {
      this.setData({ repasswordErrorMessage: "密码不一致" });
      return false;
    }
    return true;
  }
});
