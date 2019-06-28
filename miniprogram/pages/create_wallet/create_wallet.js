Page({
  data: {
    password: "",
    rePassword: ""
  },
  sendValue: function(e) {
    const value = e.detail.value;
    const passwordInput = this.selectComponent("#passwordInput");
    const repasswordInput = this.selectComponent("#repasswordInput");
    if (value.length < 8) {
      passwordInput.setError("密码最少八位");
    } else if (this.data.password != this.data.rePassword) {
      repasswordInput.setError("密码不一致");
    } else {
      passwordInput.setError("");
      repasswordInput.setError("");
    }
    this.setData({
      password: value
    });
  },
  sendReValue: function(e) {
    const value = e.detail.value;
    const repasswordInput = this.selectComponent("#repasswordInput");
    if (value != this.data.password) {
      repasswordInput.setError("密码不一致");
    } else {
      repasswordInput.setError("");
    }
    this.setData({
      rePassword: value
    });
  },
  create: function() {
    if (
      this.data.password.length >= 8 &&
      this.data.password === this.data.rePassword
    ) {
      const passwordInput = this.selectComponent("#passwordInput");
      passwordInput.setDisable(true);
      const repasswordInput = this.selectComponent("#repasswordInput");
      repasswordInput.setDisable(true);
      wx.showLoading({
        title: "生成中"
      });

      const WalletUtils = require("../../utils/wallet_utils");
      const WalletStore = require("../../utils/wallet_utils");

      const fail = () => {
        wx.hideLoading();
        wx.showModal({
          title: "提示",
          content: "创建失败，请重试"
        });
      };
      WalletStore.generateEcPair()
        .then(ecPair => {
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
  }
});
