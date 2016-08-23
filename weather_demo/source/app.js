/**
 * @Author : zxhuizhi@126.com
 * @Timestamp : 2016-06-20
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");
var baidulocation = d1.sm("do_BaiduLocation");
var nf = d1.sm("do_Notification")
var storage = d1.sm("do_Storage");

app.on("loaded", function () {
	app.openPage("source://view/index.ui");
});
