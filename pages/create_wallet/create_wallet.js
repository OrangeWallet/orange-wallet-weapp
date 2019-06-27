// pages/input_password/input_password.js
Page({
  data: {
    password: "",
    rePassword: "",
    loading: false
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
    this.setData({ password: value });
  },
  sendReValue: function(e) {
    const value = e.detail.value;
    const repasswordInput = this.selectComponent("#repasswordInput");
    if (value != this.data.password) {
      repasswordInput.setError("密码不一致");
    } else {
      repasswordInput.setError("");
    }
    this.setData({ rePassword: value });
  },
  create: function() {
    if (this.data.password >= 8 && this.data.password == this.data.rePassword) {
      const passwordInput = this.selectComponent("#passwordInput");
      passwordInput.setDisable(true);
      const repasswordInput = this.selectComponent("#repasswordInput");
      repasswordInput.setDisable(true);
      this.setData({ loading: true });

      const crypto = require("../../utils/crypto");
      const ecPair = crypto.getEcPair();
      console.log(ecPair.privateKey);
    }
  }
});
