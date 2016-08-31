var do_Global=sm("do_Global");
var do_App=sm("do_App");
var do_Page=sm("do_Page");
var do_Notification = sm("do_Notification");

var do_ALayout_QQ = ui("do_ALayout_QQ")
var do_ALayout_down = ui("do_ALayout_down")
var do_ALayout_change = ui("do_ALayout_change")

var do_ALayout_back = ui("do_ALayout_back")
do_ALayout_back.on("touch", function(data) {
	do_App.closePage();
});

do_Page.on("back", function() { // 监听android 的返回按钮;
	do_App.closePage();
});

do_Page.supportPanClosePage({support:"true"})

//仿QQ弹出菜单
do_ALayout_QQ.on("touch",function(){
	do_App.openPage({
		source:"source://view/qq/dropdowm_qq.ui", 
		animationType: "slide_r2l"
	});
})

//组合下拉菜单
do_ALayout_down.on("touch",function(){
	do_App.openPage({
		source:"source://view/down/dropdowm_down.ui", 
		animationType: "slide_r2l"
	});
})

//控制切换菜单
do_ALayout_change.on("touch",function(){
	do_App.openPage({
		source:"source://view/change/dropdowm_change.ui", 
		animationType: "slide_r2l"
	});
})