import { validimportKey } from "../../utils/valid";
import * as WalletUtils from "../../utils/wallet_utils";

Page({
  data: {
    tabActive: 0,
    observerChecked: false,
    observerDisable: false,
    modelTitle: "私钥",
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
    let modelTitle = this.data.modelTitle;
    if (event.detail.index == 1) {
      observerChecked = true;
      observerDisable = true;
      modelTitle = "公钥";
    } else {
      observerChecked = false;
      observerDisable = false;
      modelTitle = "私钥";
    }
    this.setData({
      tabActive: event.detail.index,
      key: "",
      observerChecked,
      observerDisable,
      modelTitle
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
  importWallet: function() {
    this.setData({
      keyErrorMessage: "",
      passwordErrorMessage: "",
      repasswordErrorMessage: ""
    });
    if (this.data.key == "") {
      this.setData({ keyErrorMessage: this.data.modelTitle + "不能为空" });
    } else if (!validimportKey(this.data.key)) {
      this.setData({ keyErrorMessage: this.data.modelTitle + "格式错误" });
    } else if (this._validPassword()) {
      //valid finish
      let ecPair;
      if (this.data.tabActive == 0) {
        //privateKey model
        ecPair = WalletUtils.ecPairFromPriavteKey(this.data.key);
        if (this.data.observerChecked) {
          ecPair.privateKey = "";
        }
      } else {
        //publicKey model
        ecPair = { privateKey: "", publicKey: this.data.key };
      }
      WalletUtils.writeWallet({
        ecPair,
        password: this.data.password,
        success: () => {
          wx.reLaunch({
            url: "../home/home?publicKey=" + ecPair.publicKey
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
