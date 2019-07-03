import drawQrcode from "../../utils/weapp.qrcode";
import { publicKeyToAddress, publicKeyToBlake160 } from "../../utils/address";

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    blake160: "",
    address: "",
    pubicKey: ""
  },

  onReady: function() {
    this.setData({
      pubicKey: app.globalData.publicKey,
      address: publicKeyToAddress(app.globalData.publicKey),
      blake160: publicKeyToBlake160(app.globalData.publicKey)
    });
    this.draw();
  },
  draw() {
    drawQrcode({
      width: 160,
      height: 160,
      x: 20,
      y: 20,
      canvasId: "myQrcode",
      // ctx: wx.createCanvasContext('myQrcode'),
      typeNumber: 10,
      text: this.data.address,
      // image: {
      //   imageResource: "../../images/icon.png",
      //   dx: 70,
      //   dy: 70,
      //   dWidth: 60,
      //   dHeight: 60
      // },
      callback(e) {
        console.log("e: ", e);
      }
    });
  }
});
