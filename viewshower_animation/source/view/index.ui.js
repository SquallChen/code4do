/*******************************************************************************
 * Author : But Timestamp : 2015-07-28
 ******************************************************************************/
// 根据ui的id获取ui对象
var viewshower = ui("viewshower");
// 获取当前页面page对象
var page = sm("do_Page");

// 为viewshower增加3个页面，这3个页面和index.ui都属于上面的page对象的子控件
viewshower.addViews([ {
	id : "page1",// 页面的标示
	path : "source://view/page1.ui"// 页面的路径
}, {
	id : "page2",
	path : "source://view/page2.ui"
}, {
	id : "page3",
	path : "source://view/page3.ui"
} ]);
// 初始化先显示第一个页面
viewshower.showView("page1");

// 以下是ViewShower调用show方法时支持的动画类型，包括标示和描述，其中有几个类型android不支持
var animations = [ "", "slide_l2r", "slide_r2l", "slide_b2t", "slide_t2b",
		"push_l2r", "push_r2l", "push_b2t", "push_t2b", "fade", "page_curl",
		"page_uncurl", "cube" ];
var animationDescs = [ "无动画", "从左至右滑出", "从右至左滑出", "从底至上滑出", "从上至底滑出", "从左至右推出",
		"从右至左推出", "从底至上推出", "从上至底推出", "淡入", "上翻页", "下翻页", "立体" ];

var page1 = ui("page1");
page1.on("touch", function() {
	show("page1", 3000);// 3000毫秒的动画效果
});

var page2 = ui("page2");
page2.on("touch", function() {
	show("page2", 1000);// 1000毫秒的动画效果
});

var page3 = ui("page3");
page3.on("touch", function() {
	show("page3", 300);// 300毫秒的动画效果
});

var current_page;
function show(pageid, time) {
	if (pageid == current_page)
		return;
	// 随机的获取一个动画效果
	var random = parseInt(Math.random() * 11);
	// 调用showView方法动画展示一个新页
	viewshower.showView(pageid, animations[random], time);
	current_page = pageid;
	// 触发一个消息，告诉子页面当前的动画效果
	page.fire(pageid, animationDescs[random]);
}
