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
          WalletUtils.write({
            ecPair,
            password: this.data.password,
            success: () => {
              console.log("123");
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
