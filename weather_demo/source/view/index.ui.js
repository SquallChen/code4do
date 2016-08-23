/**
 * related to index.ui
 * 
 * @Author : zxhuizhi@126.com
 * @Timestamp : 2016-07-28
 */
var toolbar = require("toolbar"),
    URL = require("url"),
    page = sm("do_Page"),
    global = sm("do_Global"),
    nf = sm("do_Notification"),
    baidulocation = sm("do_BaiduLocation"),
    storage = sm("do_Storage"),
    rootview = ui("$"),
    device = sm("do_Device"),
    external = sm("do_External"),
    data = mm("do_HashData");
//ios手势关闭页面
page.supportPanClosePage({support:"true",animationType:"push_r2l_1"});
var start = ui(rootview.add("start", "source://view/start.ui", 0, 0));


var VerticalSlideView = ui("do_VerticalSlideView_1");
var VerticalSlideView = ui("do_VerticalSlideView_1");
var listdata = mm("do_ListData");

device.getGPSInfo(function(data,e){
	if(data.state == 1){
		baidulocation.start("high", "true");
		baidulocation.locate("high", function(data, e) {
			if(data){
				flag = true;
				var latitude = data.latitude;
				var longitude = data.longitude;
				baidulocation.reverseGeoCode(data.latitude,data.longitude, function(data2, e) {
					var data1 = [
					          {template:0,city:data2},
					          {template:1,city:data2}
					    ];
					 listdata.addData(data1);
					 VerticalSlideView.bindItems(listdata);
					 VerticalSlideView.refreshItems();
				})
			}
		})
	}else{
		nf.alert("请检查手机是否开启定位功能",function(data){
			external.openSystemSetting("GPS")
		});
	}
})


var canBack = false;
page.on("back", function(){
    if (canBack == true) {
        global.exit();
    }else {
        nf.toast("再按一次退出");
        canBack = true;
        delay3.start();
       
    }
});
var delay3 = mm("do_Timer");
delay3.delay = 3000;
delay3.interval = 1000;
delay3.on("tick", function(){
    this.stop();
    canBack = false;
});

start.visible = true;
page.on("COLSE",function(){
	start.visible = false;
})