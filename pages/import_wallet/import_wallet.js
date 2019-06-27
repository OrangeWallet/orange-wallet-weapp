Page({
  data: {
    tabActive: 0
  },
  onTabChange: function(event) {
    this.setData({ tabActive: event.detail });
  }
});
