/**
 * related to test.ui
 * 
 * @Author : and
 * @Timestamp : 2016-05-03
 */
var app = sm("do_App");
var page = sm("do_Page");
// //
var close = ui("close");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})
// //

var pngfile = page.getData();
var bitmap = mm("do_Bitmap");
var root = ui("$");
bitmap.loadFile(pngfile, function(data, e) {
	bitmap.toFrostedGlass(30, function(data, e) {
		bitmap.save("PNG", 100, "data://background.png", function(data, e) {
			root.bgImage = "data://background.png";
		})
	})
})

// /关闭按钮
var button = ui("do_Button_1");
button.on("touch", function() {
	app.closePage();
})