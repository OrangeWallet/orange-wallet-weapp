Page({
  data: {
    tabActive: 0,
    observerChecked: false,
    observerDisable: false,
    key: "",
    password: "",
    repassword: ""
  },
  onTabChange: function(event) {
    let observerChecked = this.data.observerChecked;
    let observerDisable = this.data.observerDisable;
    if (event.detail == 1) {
      observerChecked = true;
      observerDisable = true;
    } else {
      observerChecked = false;
      observerDisable = false;
    }
    this.setData({
      tabActive: event.detail,
      key: "",
      observerChecked,
      observerDisable
    });
  },
  onObserverChanged: function(event) {
    this.setData({ observerChecked: event.detail });
  },
  importWallet: () => {}
});
