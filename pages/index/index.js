Page({
  guide: function() {
    wx.navigateTo({
      url: "../guide/guide"
      // url: "../import_wallet/import_wallet"
    });
    // const crypto = require("../../utils/crypto");
    // const ecPair = crypto.getEcPair();
    // const hash = crypto.encryptWallet(ecPair, "12345678");
    // const data = crypto.decryptWallet(hash, "12345678");
  }
});
