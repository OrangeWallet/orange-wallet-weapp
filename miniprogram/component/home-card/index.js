var _animation;
var _animationIndex = 0;
var _animationIntervalId = -1;
const _ANIMATION_TIME = 300;

Component({
  properties: {
    netType: {
      type: String
    },
    balance: {
      type: String
    },
    ckbUnit: {
      type: String
    }
  },

  data: {
    syncAnimation: "",
    syncText: "同步中"
  },

  methods: {
    rotateAni: function(n) {
      _animation.rotate(120 * n).step();
      this.setData({
        syncAnimation: _animation.export()
      });
    },
    startAnimationInterval: function() {
      var that = this;
      that.rotateAni(++_animationIndex);
      _animationIntervalId = setInterval(function() {
        that.rotateAni(++_animationIndex);
      }, _ANIMATION_TIME);
    },
    stopAnimationInterval: function() {
      if (_animationIntervalId > 0) {
        clearInterval(_animationIntervalId);
        _animationIntervalId = 0;
      }
    },
    onBackup: function() {}
  }
});
