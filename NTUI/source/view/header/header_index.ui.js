//related to header_index.ui
var rootview = ui("$");
var nf = sm("do_Notification");
var page = sm("do_Page");
var app = sm("do_App");
var anim = require("anim");
//添加头部到当前UI
var headerTitle = rootview.add("titleHeader","source://view/header/header_title.ui",0,0);
var headerTitleStyle = ui("titleHeader");

var hdtype=3;	//一.标题样式(显示标题类型)
var hdtitle = "Header"; 	//二.标题
var closeEvent = [0,"关闭page传递数据","",1];	 //三.0.close方式(0.layer||1.ID) 1.传递内容 2.关闭动画 3.(layer层数|ID)
var btnImg = ["source://image/rightright.png","source://image/rightleft.png"];//四.0.rightrightImg 1.rightleftImg
var handback = [1,"手势关闭page传递"]; //五.是否开启IOS手势关闭page  0.不开启 1.开启   | data

//0.显示按钮(0:文字,1:关闭按钮,2:关闭+文字+右边,3.关闭+文字+右边x2)
//1.标题文字内容
//2.closePage事件参数
//3.图片路径
var condata=[hdtype,hdtitle,closeEvent,btnImg,handback];

headerTitleStyle.on("headfire",function(data){
	nf.toast(data);
});
headerTitleStyle.fire("headertitle",condata);
