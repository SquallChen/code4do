/*******************************************************************************
 * Author :and TimeStamp :2015-10-26
 ******************************************************************************/
var nf = sm("do_Notification");
var app = sm("do_App");
// //
var page = sm("do_Page");
var close = ui("close");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})
// //

var button1 = ui("do_Button_1");
var button2 = ui("do_Button_2");
var button3 = ui("do_Button_3");
button1.on("touch", function() {
	app.openPage("source://view/page1.ui", "", "push_r2l_1");
});
button2.on("touch", function() {
	app.openPage({
		source : "source://view/page2.ui",
		statusBarState : "transparent",
		animationType : "push_r2l_1",
		statusBarFgColor : "black"// 修改缺省的状态栏字体颜色，只有white，black二种，只支持ios
	});
});
button3.on("touch", function() {
	app.openPage({
		source : "source://view/page3.ui",
		animationType : "push_r2l_1",
		statusBarState : "hide"
	});
});