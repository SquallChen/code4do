var do_Global=sm("do_Global");
var do_App=sm("do_App");
var do_Page=sm("do_Page");
var do_Notification = sm("do_Notification");
var rootview = ui("$");
var show_mark = ui(rootview.add("show_mark", "source://view/show_mark.ui", 0, 0));

var do_ALayout_back = ui("do_ALayout_back")
do_ALayout_back.on("touch", function(data) {
	do_App.closePage();
});

do_Page.on("back", function() { // 监听android 的返回按钮;
	do_App.closePage();
});


//设置地图中心点
var do_BaiduMapView = ui("do_BaiduMapView");
do_BaiduMapView.setCenter({
	latitude : "39.915174",
	longitude : "116.403901"
});

var Markers = [ {
	"id" : "id1",
	"latitude" : "39.915174",
	"longitude" : "116.403901",
	"url" : "source://image/mark.png",
	"info" : "北京天安门"
}];

//添加一组标记
do_BaiduMapView.addMarkers({
	data : Markers
});

// 点击标记触发该事件
do_BaiduMapView.on("touchMarker", function(data, e) {
	show_mark.visible = true
});

//地图类型标准地图standard
var do_Button_standard = ui("do_Button_standard");
do_Button_standard.on("touch", function(data, e) {
	do_BaiduMapView.mapType = "standard";
})
//地图类型卫星地图satellite
var do_Button_satellite = ui("do_Button_satellite");
do_Button_satellite.on("touch", function(data, e) {
	do_BaiduMapView.mapType = "satellite";
})

//地图缩放功能放大
var do_Button_big = ui("do_Button_big");
do_Button_big.on("touch", function(data, e) {
	var zoomLevel_add = do_BaiduMapView.zoomLevel + 1;
	do_BaiduMapView.zoomLevel = zoomLevel_add;
})

//地图缩放功能缩小
var do_Button_small = ui("do_Button_small");
do_Button_small.on("touch", function(data, e) {
	var zoomLevel_reduce= do_BaiduMapView.zoomLevel - 1;
	do_BaiduMapView.zoomLevel = zoomLevel_reduce;
})