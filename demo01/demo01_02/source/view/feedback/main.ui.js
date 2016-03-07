//引入组件库
var do_App = sm("do_App");
var do_Page = sm("do_Page");
//声明UI变量
var do_ALayout_back = ui("do_ALayout_back");

//关闭当前页面
do_ALayout_back.on("touch", function(){
	do_App.closePage();
});

//订阅android系统返回键的事件：关闭当前页面
do_Page.on("back", function(){
	do_App.closePage();
});