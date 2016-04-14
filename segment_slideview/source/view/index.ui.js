// 创建一个SegmentView实例
var app = sm("do_App");
var page = sm("do_Page");

var seg = ui("seg1");
var slide = ui("slide1");

var nf = sm("do_Notification");
var close = ui("do_ALayout_4");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function() {
	app.closePage();
})
// 定义SegmentView的数据
var data_seg = [ {
	"$1" : "首页",
	"$color" : "FF0000FF",
	"$style" : "40",
	"index" : 0
}, {
	"$1" : "新闻",
	"$color" : "000000FF",
	"$style" : "30",
	"index" : 1
}, {
	"$1" : "咨询",
	"$color" : "000000FF",
	"$style" : "30",
	"index" : 2
}, {
	"$1" : "聊天",
	"$color" : "000000FF",
	"$style" : "30",
	"index" : 3
}, {
	"$1" : "关于",
	"$color" : "000000FF",
	"$style" : "30",
	"index" : 4
} ];

// 定义ListData用于给SegmentView绑定数据
var listdata1 = mm("do_ListData");
// 将ListData的数据赋给SegmentView
seg.bindItems(listdata1);
// 给ListData增加数据
listdata1.addData(data_seg);
// 刷新SegmentView的数据
seg.refreshItems({});

// 定义SlideView的数据
var data_slide = [ {
	"$1" : "data://0.jpg"
}, {
	"$1" : "data://1.jpg"
}, {
	"$1" : "data://2.jpg"
}, {
	"$1" : "data://3.jpg"
}, {
	"$1" : "data://4.jpg"
} ];

// 定义ListData用于给SegmentView绑定数据
var listdata2 = mm("do_ListData");
// 将ListData的数据赋给SegmentView
slide.bindItems(listdata2);
// 给ListData增加数据
listdata2.addData(data_slide);
// 刷新SegmentView的数据
slide.refreshItems({});

// 这里没有注册SegmentView的indexChanged事件，在回调中改变SlideView的index，是因为这样在android的好的设备上可能导致死锁
// 所以通过点击一个segmentview的cell，通过page来传递一个自定义的事件
page.on("seg_touch", function(index) {
	slide.index = index;
})
function setSegIndex(index) {
	// 把选中的segmentview里的cell高亮字体变大，其它的所有没选中的恢复缺省
	for (var i = 0; i < listdata1.getCount(); i++) {
		var d = listdata1.getOne(i);
		if (i == index) {
			d.$color = "FF0000FF";
			d.$style = "40";
		} else {
			d.$color = "000000FF";
			d.$style = "30";
		}
		listdata1.updateOne(i, d);
	}
	seg.refreshItems();
	// 修改segmentview的index，确保cell能自动移动到屏幕靠中间的位置
	seg.index = index;
}
// 注册SlideView的indexChanged事件，在回调中改变SegmentView的index，做到两个组件互相联动
slide.on("indexChanged", function(index) {
	setSegIndex(index);
})
