/**
 * @Author : and
 * @Timestamp : 2017-09-06
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");

app.on("loaded", function () {
	app.openPage({
		source : "source://view/index.ui",
		animationType : "push_r2l_1",
		statusBarBgColor:"22282CFF"
	});
});
