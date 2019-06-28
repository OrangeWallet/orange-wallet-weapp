Page({
  onReady: function() {
    const WalletUtils = require("../../utils/wallet_utils");
    WalletUtils.readPublicKey({
      success: () => {
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          wx.redirectTo({
            url: "../home/home"
          });
        }, 1000);
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
