/**
 * @Author : raul
 * @Timestamp : 2016-04-21
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");

app.on("loaded", function () {
	app.openPage("source://view/start.ui");
});
