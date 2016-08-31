var do_Page=sm("do_Page");
var do_App=sm("do_App");
var do_Notification = sm("do_Notification");
var do_Global = sm("do_Global")
var do_Storage =sm("do_Storage")
var do_Button_open = ui("do_Button_open")
var rootview = ui("$");
var qq_view = ui(rootview.add("qq_view", "source://view/qq/qq_view.ui", 0, 0));

var do_ALayout_back = ui("do_ALayout_back")
do_ALayout_back.on("touch", function(data) {
	do_App.closePage();
});

do_Page.on("back", function() { // 监听android 的返回按钮;
	do_App.closePage();
});

do_Page.supportPanClosePage({support:"true"})

var uitools = require("uitools");
uitools.setButtonStyle(do_Button_open);

do_Button_open.on("touch",function(){
	qq_view.visible = true
})
