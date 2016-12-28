/**
 * @Author : and
 * @Timestamp : 2016-12-22
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");

app.on("loaded", function() {
	app.openPage({
		source : "source://samples/api/main.ui",
		statusBarBgColor : "3C3C3CFF"
	});
});
