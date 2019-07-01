const app = getApp();

Page({
  onReady: function() {
    const WalletUtils = require("../../utils/wallet_utils");
    WalletUtils.readPublicKey({
      success: publicKey => {
        WalletUtils.isObserverModel({
          success: isObserver => {
            app.globalData.publicKey = publicKey;
            app.globalData.isOberverModel = isObserver;
            wx.redirectTo({
              url: "../home/home"
            });
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
  }
});
