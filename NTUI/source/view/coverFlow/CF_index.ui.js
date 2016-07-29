//related to header_index.ui
var rootview = ui("$");
var nf = sm("do_Notification");
var page = sm("do_Page");
var app = sm("do_App");
var anim = require("anim");
//添加头部到当前UI
var headerTitle = rootview.add("titleHeader","source://view/header/header_title.ui",0,0);
var headerTitleStyle = ui("titleHeader");
//一.标题样式(显示标题类型)
var hdtype=1;
//二.标题
var hdtitle = "coverFlow(流动视图)";
//三.0.close方式(0.layer||1.ID) 1.传递内容 2.关闭动画 3.(layer层数|ID)
var closeEvent = [0,"传递数据","",1];
//四.0.rightrightImg 1.rightleftImg
var btnImg = ["source://image/rightright.png","source://image/rightleft.png"];
//五.是否开启IOS手势关闭page  0.不开启 1.开启
var handback = [1,""];

//0.显示按钮(0:文字,1:关闭按钮,2:关闭+文字+右边,3.关闭+文字+右边x2)
//1.标题文字内容
//2.closePage事件参数
//3.图片路径
var condata=[hdtype,hdtitle,closeEvent,btnImg,handback];
headerTitleStyle.fire("headertitle",condata);

/*
 *  coverFlow
 */
var coverflow = rootview.add("flowcover","source://view/coverFlow/coverflow.ui",0,300);
var coverflowf = ui("flowcover");

var cfindex = 0;//index
var isloop = true; //无限循环
var cfdata = [
	             {"name":"user1","cftxt":"静童真心"},
	             {"name":"user2","cftxt":"迷幻色彩"},
	             {"name":"user3","cftxt":"听首别致"},
	             {"name":"user4","cftxt":"我想静静"}
	            ];
var cfcount = [cfindex,cfdata,isloop];
coverflowf.on("coverflowbf",function(data){
	nf.alert(data);
});
coverflowf.fire("coverflowb",cfcount);