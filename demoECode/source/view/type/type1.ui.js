/**
 * related to type1.ui
 * 
 * @Author : raul
 * @Timestamp : 2016-04-21
 */

var nf=sm("do_Notification");
var do_Page = sm("do_Page");
var do_App = sm("do_App");

var do_ALayout_1=ui("do_ALayout_1");
var do_ALayout_2=ui("do_ALayout_2");
var do_ALayout_3=ui("do_ALayout_3");

do_ALayout_1.on("touch", function(){
	do_App.openPage({
		source:"source://view/newsDetail.ui", 
		statusBarState:"transparent",
		animationType: "push_r2l",
		data:JSON.stringify({title:"官网首页", url:"http://www.deviceone.net"}) //传递页面之间的参数
		});
});

do_ALayout_2.on("touch", function(){
	do_App.openPage({
		source:"source://view/newsDetail.ui", 
		statusBarState:"transparent",
		animationType: "push_r2l",
		data:JSON.stringify({title:"示例应用", url:"http://doc.deviceone.net/web/doc/code4do.htm"}) //传递页面之间的参数
		});
});

do_ALayout_3.on("touch", function(){
	do_App.openPage({
		source:"source://view/newsDetail.ui", 
		statusBarState:"transparent",
		animationType: "push_r2l",
		data:JSON.stringify({title:"技术论坛", url:"http://bbs.deviceone.net/forum.php"}) //传递页面之间的参数
		});
});

var do_GestureView_1=ui("do_GestureView_1");
do_GestureView_1.on("fling", function(data){
	if (data.velocityY > 0){
		do_Page.fire("PrePagemoveing");
	}
	if (data.velocityY < 0){
		do_Page.fire("NextPagemoveing");
	}
});