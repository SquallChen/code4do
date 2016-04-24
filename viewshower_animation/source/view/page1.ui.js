//related to page1.ui
var do_Button_1 = ui("do_Button_1");
var page = sm("do_Page");
//订阅消息，从index.ui那边获取触发过来的消息，告诉当前页面滑动的动画效果名称
page.on("page1", function(data) {
	do_Button_1.text = "我是第一页(" + data + ")";
});