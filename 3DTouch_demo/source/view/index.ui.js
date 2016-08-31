//related to index.ui
var app = sm("do_App");
var page = sm("do_Page");
var dialog = sm("do_Dialog");
var storage = sm("do_Storage");
var initdata = sm("do_InitData");
// //返回按钮
var close = ui("close");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})

// 定义一个3DTouch组件对象
var target_0 = sm("do_3DTouch");

// 添加一个菜单
var button1 = ui("do_Button_1");
button1.on("touch", function() {
	target_0.addShortcutItem({id:"aa", title:"菜单 ", icon:"Mail", subTitle:"点击菜单可打开邮件", userInfo:{"aaa":"111"}});
})

// 继续添加另外三个菜单
var button2 = ui("do_Button_2");
button2.on("touch", function() {
	target_0.addShortcutItem({id:"bb", title:"日历 ", icon:"Date", subTitle:"点击打开日历", userInfo:{"bbb":"111"}});
	target_0.addShortcutItem({id:"cc", title:"更新 ", icon:"Update", subTitle:"更新", userInfo:{"ccc":"111"}});
	target_0.addShortcutItem({id:"dd", title:"收藏 ", icon:"Favorite", subTitle:"点击收藏", userInfo:{"ddd":"111"}});
})

// 按id删除第一个菜单
var button2 = ui("do_Button_2");
button2.on("touch", function() {
	target_0.removeShortcutItem({id:"aa"});
})