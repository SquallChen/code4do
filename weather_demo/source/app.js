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
	baidulocation.start("high", "true");
	baidulocation.locate("high", function(data, e) {
		var latitude = data.latitude;
		var longitude = data.longitude;
		baidulocation.reverseGeoCode(data.latitude,data.longitude, function(data1, e) {
			storage.writeFile("data://city.json",data1);
			app.openPage("source://view/index.ui");
		})
	})
});
