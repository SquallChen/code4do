/**
 * related to type1.ui
 * 
 * @Author : raul
 * @Timestamp : 2016-04-21
 */

var nf=sm("do_Notification");
var do_Page = sm("do_Page");

var do_ALayout_1=ui("do_ALayout_1");
var do_ALayout_2=ui("do_ALayout_2");
var do_ALayout_3=ui("do_ALayout_3");

do_ALayout_1.on("touch", function(){
	nf.alert("测试01");
});

do_ALayout_2.on("touch", function(){
	nf.alert("测试02");
});

do_ALayout_3.on("touch", function(){
	nf.alert("测试03");
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