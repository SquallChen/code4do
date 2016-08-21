/**
 * @Author : and
 * @Timestamp : 2016-08-20
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");
var initdata = d1.sm("do_InitData");
app.on("loaded", function() {
	initdata.readFile("initdata://data.json", function(data, e) {
		app.openPage({
			source : "source://view/index.ui",
			statusBarState : "transparent",
			data : data
		});
	});
})