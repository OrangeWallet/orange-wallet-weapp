import { readWallet } from "../../utils/wallet_utils";
const app = getApp();

Page({
  onReady: function() {
    const WalletUtils = require("../../utils/wallet_utils");
    const page = this;
    WalletUtils.readPublicKey({
      success: publicKey => {
        WalletUtils.isObserverModel({
          success: isObserver => {
            app.globalData.publicKey = publicKey;
            app.globalData.isOberverModel = isObserver;
            if (isObserver) {
              wx.redirectTo({
                url: "../home/home"
              });
            } else {
              page.setData({
                showModel: true
              });
            }
          },
          fail: () => {
            wx.showModal({
              title: "提示",
              content: "读取钱包失败，请重试"
            });
          }
        });
      },
      fail: () => {
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          wx.redirectTo({
            url: "../guide/guide"
          });
        }, 1000);
      }
    });
  },
  data: {
    showModel: false,
    passwordErrorMessage: ""
  },
  onConfirm: function(e) {
    const page = this;
    let password = e.detail.value;
    if (password.length < 8) {
      page.setData({
        passwordErrorMessage: "密码最少八位"
      });
      return;
    }
    wx.showLoading({
      title: "解锁中"
    });
    readWallet({
      password,
      success: wallet => {
        wx.redirectTo({
          url: "../home/home?publicKey=" + wallet.publicKey
        });
      },
      fail: function(error) {
        wx.hideLoading();
        page.setData({
          passwordErrorMessage: error
        });
      }
    });
  },
  onCancel: function() {}
});
