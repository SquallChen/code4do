var deviceone = require("deviceone");
/**
 *  按钮动画
 */
var button = function() {
    var animate = deviceone.mm("do_Animation", "BUTTONTOUCHDOWN", "app");
    animate.alpha({
        delay: 0,
        duration: 200,
        curve: "Linear",
        repeatCount: "",
        autoReverse: true,
        fillAfter: false,
        alphaFrom: 1,
        alphaTo: .5
    });
    return animate;
}
module.exports.button = button; 