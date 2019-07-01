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
  onVerifyCorrect: function(event) {
    const wallet = event.detail.wallet;
    app.globalData.publicKey = wallet.publicKey;
    app.globalData.isOberverModel = wallet.privateKey === "";
    wx.redirectTo({
      url: "../home/home"
    });
  },
  onCancel: function() {}
});
