var $ = ui("do_ALayout_1");

//将SegmentView的数据通过key指定给Label的text属性
$.setMapping({
	"do_Label_1.text":"$1",
	"do_Label_1.fontColor":"$color",
	"do_Label_1.fontSize":"$style",
	"do_ALayout_1.tag":"index"//把索引传递过来存在tag属性
});

var page = sm("do_Page");
$.on("touch",function(){
	//点击一个cell再把索引传递回index.ui
	page.fire("seg_touch",$.tag);
})