var do_Page=sm("do_Page");
var do_App=sm("do_App");
var do_Notification = sm("do_Notification");
var do_Global = sm("do_Global")
var do_Storage =sm("do_Storage")
var do_FragmentView=ui("do_FragmentView");
var do_ListData = mm("do_ListData");
var do_ALayout_change = ui("do_ALayout_change")

var do_ALayout_back = ui("do_ALayout_back")
do_ALayout_back.on("touch", function(data) {
	do_App.closePage();
});

do_Page.on("back", function() { // 监听android 的返回按钮;
	do_App.closePage();
});

do_Page.supportPanClosePage({support:"true"})

var data1 = [{ 
	/**
	 * 给绑定的视图模板设置数据
	 */
	    leftTemplate:0,template:1
		}
];

do_ListData.addData(data1);
do_FragmentView.bindItems(do_ListData);

do_ALayout_change.on("touch",function(data, e) {
	/**
	 * 显示左侧视图
	 */
	do_FragmentView.showLeft();
})

//重置为初始视图
do_Page.on("reset",function(data){
	do_FragmentView.reset();
})
