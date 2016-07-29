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
var hdtitle = "Tab";
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

var tabpos = 0;
var tabtxt = ["00","01","02"];
var tabfire = [tabpos,tabtxt];//0:tab位置 1:文字内容
/**
 * tab3
 */
var tabst3 = rootview.add("sttab3","source://view/tabs/tab_top3.ui",0,148);
var tabstss3 = ui("sttab3");
tabstss3.on("tabtop3",function(data){
	nf.toast(data);
});
tabstss3.fire("tabtopb3",tabfire);


/**
 * tabSA
 */
var tabpos = 0;
var tabtxt = ["00","01","02"];
var tabfire = [tabpos,tabtxt];

var tabstSpec = rootview.add("SpecTabA","source://view/tabs/tab_slide.ui",0,348);
var tabstSpecT = ui("SpecTabA");
tabstSpecT.on("tabSpeFA",function(datatab){
	nf.toast(datatab);
});
tabstSpecT.fire("tabSpeA",tabfire);

/**
 * tabS
 */
var tabstSpec = rootview.add("SpecTab","source://view/specialUI/TabMove.ui",0,548);
var tabstSpecT = ui("SpecTab");
var datetp;
tabstSpecT.on("tabSpeF",function(data){
	nf.toast(data);
});
tabstSpecT.fire("tabSpe",tabfire);