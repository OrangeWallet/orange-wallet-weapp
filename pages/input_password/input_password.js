// pages/input_password/input_password.js
Page({
  data: {
    password: ""
  },
  sendValue: function(e) {
    const value = e.detail.value;
    const myInput = this.selectComponent("#passwordInput");
    if (value.length < 8) {
      myInput.setError("密码最少八位");
    } else {
      myInput.setError("");
    }
    this.setData({ password: value });
  }
});
