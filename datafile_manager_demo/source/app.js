/**
 * @Author : zxhuizhi@126.com
 * @Timestamp : 2016-07-19
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");
var do_Global = d1.sm("do_Global");
var do_Storage = d1.sm("do_Storage");
 do_InitData = d1.sm("do_InitData");
var do_Notification =d1.sm("do_Notification");
app.on("loaded", function () {
	//do_InitData.copy(["initdata://wenjian/1.txt","initdata://wenjian/6.png","initdata://home.jpg"],"data://",function(data){
		
		//do_Notification.alert(data);
		//d1.print(data);
	//})
	app.openPage("source://view/index.ui");
});
