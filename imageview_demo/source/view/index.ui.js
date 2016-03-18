/**********************************************
 * Author : @Author
 * Timestamp : @Timestamp
 **********************************************/
var nf = sm("do_Notification");
///返回按钮
var page = sm("do_Page");
var close = ui("close");
var app = sm("do_App");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})
// //;