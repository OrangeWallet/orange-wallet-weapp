Page({
  onReady: function() {
    const WalletUtils = require("../../utils/wallet_utils");
    WalletUtils.readPublicKey({
      success: () => {
        setTimeout(() => {
          wx.redirectTo({
            url: "../home/home"
          });
        }, 1000);
      },
      fail: () => {
        setTimeout(() => {
          wx.redirectTo({
            url: "../guide/guide"
          });
        }, 1000);
      }
    });
  }
});
