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
	var latitude= "";
	var longitude = ""
	baidulocation.start("high", "true");
	baidulocation.on("result",function(data,e){
		storage.writeFile("data://city.json",data.address);
		app.openPage("source://view/index.ui");
	})
	
	
//	baidulocation.locate("high", function(data, e) {
//		nf.alert(data)
//		latitude = data.latitude;
//		longitude = data.longitude;
//		baidulocation.reverseGeoCode(latitude,longitude, function(data1, e) {
////			storage.writeFile("data://city.json",data1.city);
////			 city_name.text = data1.district;
////			 city_streetname.text = data1.streetName;
////			 new_city = data1.city;
//		})
//	})
//	
});
