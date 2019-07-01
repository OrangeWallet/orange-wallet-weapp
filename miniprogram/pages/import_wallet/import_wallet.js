import { validimportKey } from "../../utils/valid";
import * as WalletUtils from "../../utils/wallet_utils";
const app = getApp();

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
  onSwitchQuestion: function() {
    wx.showModal({
      title: "观察钱包",
      showCancel: false,
      content:
        "不导入私钥，仅导入公钥以供查看余额、交易等信息，无法签名、转账等操作"
    });
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
          app.globalData.publicKey = ecPair.publicKey;
          app.globalData.isOberverModel = this.data.observerChecked;
          wx.reLaunch({
            url: "../home/home"
          });
        },
        fail: () => {
          wx.hideLoading();
          wx.showModal({
            title: "提示",
            showCancel: false,
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
