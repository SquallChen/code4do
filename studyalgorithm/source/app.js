/**
 * @Author : and
 * @Timestamp : 2017-09-06
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");

app.on("loaded", function () {
	app.openPage("source://view/index.ui");
});
