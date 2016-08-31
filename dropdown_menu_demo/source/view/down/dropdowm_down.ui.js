var do_Page=sm("do_Page");
var do_App=sm("do_App");
var do_Notification = sm("do_Notification");
var do_Global = sm("do_Global")
var do_Storage =sm("do_Storage")
var do_InitData=sm("do_InitData");

var do_ALayout_back = ui("do_ALayout_back")
do_ALayout_back.on("touch", function(data) {
	do_App.closePage();
});

do_Page.on("back", function() { // 监听android 的返回按钮;
	do_App.closePage();
});

do_Page.supportPanClosePage({support:"true"})

var do_ALayout_root=ui("do_ALayout_root");
var do_Label_time=ui("do_Label_time");
var do_ALayout_filter_time=ui("do_ALayout_filter_time");
var do_ALayout_filter_area=ui("do_ALayout_filter_area");
var do_ALayout_filter_type=ui("do_ALayout_filter_type");
var do_ImageView_filter_time=ui("do_ImageView_filter_time");
var do_ImageView_filter_area=ui("do_ImageView_filter_area");
var do_ImageView_filter_type=ui("do_ImageView_filter_type");

do_ALayout_root.add("main_filter_time", "source://view/down/main_filter_time.ui", 0, 0);
var main_filter_time=ui("main_filter_time");
do_ALayout_root.add("main_filter_area", "source://view/down/main_filter_area.ui", 0, 0);
var main_filter_area=ui("main_filter_area");
do_ALayout_root.add("main_filter_type", "source://view/down/main_filter_type.ui", 0, 0);
var main_filter_type=ui("main_filter_type");


do_ALayout_filter_area.on("touch", function(){
	do_ImageView_filter_area.source = "source://image/shang.png";
	main_filter_area.fire("show", "zhaobiao");
});

do_ALayout_filter_time.on("touch", function(){
	do_ImageView_filter_time.source = "source://image/shang.png";
	main_filter_time.fire("show", "zhaobiao");
});

do_ALayout_filter_type.on("touch", function(){
	do_ImageView_filter_type.source = "source://image/shang.png";
	main_filter_type.fire("show", "zhaobiao");
});

do_Page.on("filter_condition_changed", function(data){
	do_ImageView_filter_area.source = "source://image/xia.png";
	do_ImageView_filter_time.source = "source://image/xia.png";
	do_ImageView_filter_type.source = "source://image/xia.png";
	if (data == null || data.viewType != "zhaobiao") return;
	if (data.filterType=="time"){		
		if (data.valyeType=="today"){			
			startDate=null;
			endDate=null;
			dayType=0;
			do_Label_time.text="时间";
			return;
		}
		if (data.valyeType=="all"){			
			startDate=null;
			endDate=null;
			dayType=1;
			do_Label_time.text="时间";
			return;
		}
		if (data.valyeType=="before"){			
			startDate=null;
			endDate=null;
			dayType=-1;
			do_Label_time.text="时间";
			return;
		}
		if (data.valyeType=="range"){
			starttime=data.startDate.substring(0,10).replace(new RegExp("-","gm"),"/");
			startDate=(new Date(starttime)).getTime(); 
			endtime=data.endDate.substring(0,10).replace(new RegExp("-","gm"),"/");
			endDate=(new Date(endtime)).getTime(); 
			dayType=-1;
			do_Label_time.text="时间";
			return;
		}
		return;
	}
	if (data.filterType=="area"){
		citycode = data.citycode;
		return;
	}
	if (data.filterType=="type"){
		projectTypeList=data.projectTypeList;
		return;
	}
});

//顶部的地区和类型筛选条件及其默认值
do_InitData.readFile("initdata://mock/bidListCondition.json", function(_result) {
	do_Page.fire("bidListConditionLoaded", _result);
});


