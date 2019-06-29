Component({
  properties: {
    showModal: {
      type: Boolean,
      value: false
    },
    password: {
      type: String,
      value: ""
    },
    dismissOutside: {
      type: Boolean,
      value: false
    },
    passwordErrorMessage: {
      type: String,
      value: ""
    }
  },
  data: {
    showModal: false
  },
  methods: {
    preventTouchMove: function() {},
    onOutside: function() {
      if (this.data.dismissOutside) {
        this.setData({ showModal: false });
      }
    },
    bindinput: function(e) {
      this.setData({ value: e.detail.value });
    },
    onCancel: function() {
      this.triggerEvent("onCancel");
    },
    onConfirm: function() {
      this.triggerEvent("onConfirm", { value: this.data.value });
    }
  }
});
