var do_Global=sm("do_Global");
var do_App=sm("do_App");
var do_Page=sm("do_Page");
var do_Notification = sm("do_Notification");
var do_Storage = sm("do_Storage");
var do_Global = sm("do_Global")

var do_ALayout_start = ui("do_ALayout_start")

do_ALayout_start.on("touch",function(){
	do_App.openPage({
		source:"source://view/index.ui", 
		statusBarState:"show",
		animationType: "slide_r2l"
	});
})