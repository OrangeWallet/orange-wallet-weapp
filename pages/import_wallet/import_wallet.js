import { validPrvKey } from "../../utils/valid";

Page({
  data: {
    tabActive: 0,
    observerChecked: false,
    observerDisable: false,
    key: "",
    keyErrorMessage: "",
    password: "",
    passwordErrorMessage: "",
    repassword: "",
    repasswordErrorMessage: ""
  },
  onTabChange: function(event) {
    let observerChecked = this.data.observerChecked;
    let observerDisable = this.data.observerDisable;
    if (event.detail.index == 1) {
      observerChecked = true;
      observerDisable = true;
    } else {
      observerChecked = false;
      observerDisable = false;
    }
    this.setData({
      tabActive: event.detail.index,
      key: "",
      observerChecked,
      observerDisable
    });
  },
  onKeyBlur: function(event) {
    this.setData({ key: event.detail });
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
  onClearKey: function() {
    this.setData({ key: "" });
  },
  importWallet: function() {
    this.setData({
      keyErrorMessage: "",
      passwordErrorMessage: "",
      repasswordErrorMessage: ""
    });
    if (this.data.tabActive == 0) {
      //privateKey model
      if (this.data.key == "") {
        this.setData({ keyErrorMessage: "请输入私钥" });
      } else if (!validPrvKey(this.data.key)) {
        this.setData({ keyErrorMessage: "私钥格式错误" });
      } else if (this._validPassword()) {
        //valid finish
      }
    } else {
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
