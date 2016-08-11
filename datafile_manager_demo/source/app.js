/**
 * @Author : zxhuizhi@126.com
 * @Timestamp : 2016-08-04
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");
var do_Notification = d1.sm("do_Notification");
var do_Storage = d1.sm("do_Storage");
var do_InitData =d1.sm("do_InitData");
app.on("loaded", function () {
	do_InitData.zip("initdata://big","data://big/big.zip", function(data, e) {
		//do_Notification.alert(data);//bool类型，是否成功
	})
	app.openPage({source:"source://view/index.ui",
        statusBarState:"transparent"
    });
});
