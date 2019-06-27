var Sercurity = "/images/security.svg";
var Privacy = "/images/privacy.svg";
var Public = "/images/public.svg";
Page({
  data: {
    swiper_items: [
      {
        title: "安全",
        text: "绝不保存私钥，仅提供查询功能",
        icon: Sercurity
      },
      {
        title: "隐私",
        text: "不会收集用户隐私信息，现在不会，将来也不会",
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
  importWallet: () => {}
});
