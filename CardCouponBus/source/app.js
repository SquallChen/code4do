/**
 * @Author : 79364243@qq.com
 * @Timestamp : 2016-07-07
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");
var push = d1.sm("do_BaiduPush");//推送
var cacher = d1.sm("do_DataCache");
var $C = require("common");
var $U = require("url");
var open = require("open");

app.on("loaded", function () {
    this.openPage({
    	source : "source://view/index.ui",
    	statusBarState : "transparent",
    	statusBarFgColor : "white",
    });
    push.startWork();  //开始推送
});
//推送绑定
push.on("bind", function(data) {
	if(data.errorCode==undefined){
		push.stopWork();
	    push.startWork();  //开始推送
	}else{
		var param = {channelId:data.channelId,equipment:$C.equipment()};
		cacher.saveData("equipment", param);
	}
});

push.on("notificationClicked", function(data) {   //App未打开IOS    android都在这里
	if(data.customContent!=undefined){
		var json = JSON.parse(data.customContent);
		switch(json.type){
			case 0:
				$U.tokenPage("source://view/percenter/getmoneyhis.ui");
				break;
		}
	}
});
push.on("iOSMessage", function(data, e) {     //APP已打开IOS
	//d1.print(JSON.stringify(data));
});
