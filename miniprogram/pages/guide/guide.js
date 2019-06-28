var Sercurity = "/images/security.svg";
var Privacy = "/images/privacy.svg";
var Public = "/images/public.svg";
Page({
  data: {
    swiper_items: [
      {
        title: "安全",
        text: "私钥加密保存在本地，支持导入公钥，观察者钱包",
        icon: Sercurity
      },
      {
        title: "隐私",
        text: "绝不收集用户隐私信息，现在不会，将来也不会",
        icon: Privacy
      },
      {
        title: "开源",
        text: "代码在Github，欢迎贡献",
        icon: Public
      }
    ]
  },
  createWallet: () => {
    wx.navigateTo({
      url: "../create_wallet/create_wallet"
    });
  },
  importWallet: () => {
    wx.navigateTo({
      url: "../import_wallet/import_wallet"
    });
  }
});
