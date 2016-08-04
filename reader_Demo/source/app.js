/**
 * @Author : zxhuizhi@126.com
 * @Timestamp : 2016-08-01
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");

app.on("loaded", function () {
	app.openPage("source://view/index.ui");
});
