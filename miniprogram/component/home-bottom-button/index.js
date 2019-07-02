// component/home-bottom-button/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  data: {
    receiveTouched: false,
    sendTouched: false
  },

  methods: {
    receiveTouchStart: function() {
      this.setData({ receiveTouched: true });
    },
    receiveTouchEnd: function() {
      this.setData({ receiveTouched: false });
    },
    sendTouchStart: function() {
      this.setData({ sendTouched: true });
    },
    sendTouchEnd: function() {
      this.setData({ sendTouched: false });
    },
    onReceive: function() {},
    onSend: function() {
      this.triggerEvent("onSendCapacity");
    }
  }
});
