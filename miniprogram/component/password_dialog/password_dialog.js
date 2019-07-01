import { readWallet } from "../../utils/wallet_utils";

Component({
  properties: {
    showModal: {
      type: Boolean,
      value: false
    },
    isPassword: {
      type: String,
      value: ""
    },
    dismissOutside: {
      type: Boolean,
      value: false
    },
    passwordErrorMessage: {
      type: String,
      value: ""
    }
  },
  data: {
    showModal: false,
    passwordErrorMessage: "",
    password: ""
  },
  methods: {
    preventTouchMove: function() {},
    onOutside: function() {
      if (this.data.dismissOutside) {
        this.setData({ showModal: false });
      }
    },
    bindinput: function(e) {
      this.setData({ password: e.detail.value });
    },
    onCancel: function() {
      this.triggerEvent("onCancel");
    },
    onConfirm: function() {
      const componet = this;
      const password = componet.data.password;
      if (password.length < 8) {
        componet.setData({
          passwordErrorMessage: "密码最少八位"
        });
        return;
      }
      wx.showLoading({
        title: "解锁中"
      });
      readWallet({
        password,
        success: function(wallet) {
          componet.triggerEvent("onVerifyCorrect", { wallet });
        },
        fail: function(error) {
          wx.hideLoading();
          componet.setData({
            passwordErrorMessage: error
          });
        }
      });
    }
  }
});
