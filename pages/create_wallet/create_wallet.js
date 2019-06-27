// pages/input_password/input_password.js
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
    if (this.data.password >= 8 && this.data.password == this.data.rePassword) {
      const passwordInput = this.selectComponent("#passwordInput");
      passwordInput.setDisable(true);
      const repasswordInput = this.selectComponent("#repasswordInput");
      repasswordInput.setDisable(true);
      wx.showLoading({
        title: "生成中"
      });

      const crypto = require("../../utils/crypto");
      const ecPair = crypto.getEcPair();
      const data = crypto.encryptWallet(ecPair, "12345678");
      wx.setStorage({
        key: "wallet",
        data,
        success: () => {
          wx.reLaunch({
            url: "../home/home"
          });
        },
        fail: () => {
          wx.hideLoading();
          wx.showModal({
            title: "提示",
            content: "创建失败，请重试"
          });
        }
      });
    }
  }
});
