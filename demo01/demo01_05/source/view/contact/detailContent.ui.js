//引入组件库
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_Notification = sm("do_Notification");
//声明UI变量
var do_ALayout_root=ui("do_ALayout_root");
var do_ALayout_back = ui("do_ALayout_back");

//订阅android系统返回键的事件：关闭当前页面
do_Page.on("back", function(){
	do_App.closePage();
});

//关闭当前页面
do_ALayout_back.on("touch", function(){
	do_App.closePage();
});