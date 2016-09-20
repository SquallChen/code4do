/**
 * @Author : and
 * @Timestamp : 2016-09-20
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");

app.on("loaded", function () {
	d1.print("start open page");
	app.openPage("source://view/index.ui");
});
