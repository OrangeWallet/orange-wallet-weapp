Component({
  properties: {
    title: String,
    maxLength: {
      type: Number,
      value: -1
    },
    password: {
      type: Boolean,
      value: true
    },
    inputType: {
      type: String,
      value: "text"
    }
  },

  data: {
    value: "",
    error: "",
    focus: false,
    valueLength: "0",
    maxLength: -1
  },
  attached: function() {
    let valueLength = "";
    if (this.data.maxLength != -1) {
      valueLength = "0/" + this.data.maxLength;
    } else {
      valueLength = "0";
    }
    this.setData({
      valueLength
    });
  },
  methods: {
    bindinput: function(e) {
      let value = e.detail.value.toString();
      let valueLength = "";
      if (this.data.maxLength != -1) {
        valueLength = value.length + "/" + this.data.maxLength;
      } else {
        valueLength = value.length + "";
      }
      this.setData({
        value,
        valueLength
      });
    },
    bindblur: function() {
      this.setData({ focus: false });
      this.triggerEvent("sendValue", { value: this.data.value });
    },
    bindfocus: function() {
      this.setData({ focus: true });
    },
    setError: function(error) {
      this.setData({ error });
    }
  }
});
