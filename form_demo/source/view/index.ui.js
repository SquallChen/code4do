/**
 * @Author : and
 * @Timestamp : 2016-04-25
 */
var app = sm("do_App");
var page = sm("do_Page");

// /
var close = ui("close");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
}).on("result", function(data) {
	// 把表单页面的数据传递回保存下来
	user_data = data;
});

// /////
var btn_hello = ui("do_Button_1");
var user_data;
btn_hello.on("touch", function() {
	// 打开表单页面，把保存的数据传递回去
	app.openPage("source://view/userinfo-form.ui", user_data);
});
