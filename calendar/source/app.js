var d1 = require("deviceone");
var app = d1.sm("do_App");
var nf = d1.sm("do_Notification");
var cacher = d1.sm("do_DataCache");

/*
var anim_button = d1.mm("do_Animation", "BUTTONTOUCHDOWN", "app");

anim_button.alpha({
    delay: 0,
    duration: 200,
    curve: "Linear",
    repeatCount: "",
    autoReverse: true,
    fillAfter: false,
    alphaFrom: 1,
    alphaTo: .5
});

anim_button.scale({
    delay: 0,
    duration: 200,
    curve: "Linear",
    repeatCount: "",
    autoReverse: true,
    fillAfter: false,
    scaleFromX: 1,
    scaleFromY: 1,
    scaleToX: .9,
    scaleToY: .9,
    pivotX: .5,
    pivotY: .5
});
*/

app.on("loaded", function() {
	this.openPage("source://view/apps/calendar/index.ui");
});
