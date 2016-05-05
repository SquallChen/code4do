/*******************************************************************************
 * Author :and TimeStamp :2015-10-26
 ******************************************************************************/
var nf = sm("do_Notification");
var app = sm("do_App");
var page = sm("do_Page");
var app = sm("do_App");
var device = sm("do_Device");

// /返回按钮
var close = ui("do_Button_1");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})

// //
var imageview = ui("do_ImageView_4");
var bitmap = mm("do_Bitmap");
bitmap.loadFile("source://image/test.jpg", function(data, e) {
	bitmap.toRoundCorner(50, function(data, e) {
		bitmap.save("PNG", 100, "data://test.png", function(data, e) {
			imageview.source = "data://test.png";
		})
	})
})

var root = ui("ALayout_1");
root.on("touch", function() {
	// 打开新页前先把旧页的背景截图下来，目前只能先截图存在一个文件里，以后会改成直接返回一个do_Bitmap对象
	device.screenShot(function(data, e) {
		var bitmap = mm("do_Bitmap");
		app.openPage({
			source : "source://view/test.ui",
			statusBarState : "transparent",
			data : data
		});
	});
})
