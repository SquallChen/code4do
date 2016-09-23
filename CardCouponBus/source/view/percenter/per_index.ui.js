var rootview = ui("$");
var initdata = sm("do_InitData");
var nf = sm("do_Notification");
var page = sm("do_Page");
var app = sm("do_App");
var cacher = sm("do_DataCache");
var open = require("open");
var anim = require("anim");
var $U = require("url");
var $HI = require("headimg");
var Euc = encodeURIComponent;
//添加头部到当前UI
var headerTitle = rootview.add("titleHeader","source://view/tempalte/header/header_alpha.ui",0,0);
var headerTitleStyle = ui("titleHeader");

var param = {};
//loading
var loadingblack = rootview.add("blackloading","source://view/hintUI/loading_round.ui",0,530);
var lbss = ui("blackloading");
lbss.fire("loadingrxa",{"visible":1,"text":"加载中.."});

//var type={type:2};	//一.标题样式(显示标题类型)
//var title = {title:"选择城市"}; 	//二.标题
var btnImg = {rrimg:"source://image/setting.png",rlimg:""};//四.0.rightrightImg 1.rightleftImg
var handback = {hdclose:1,hddata:"手势关闭page传递"}; //五.是否开启IOS手势关闭page  0.不开启 1.开启   | data
//0.显示按钮(0:文字,1:关闭按钮,2:关闭+文字+右边,3.关闭+文字+右边x2)
//1.标题文字内容
//2.closePage事件参数
//3.图片路径
//var condata=[hdtype,hdtitle,closeEvent,btnImg,handback];
var condata={type:3,title:"商户中心",rimg:btnImg,hback:handback}

headerTitleStyle.on("headalphafire",function(data){
	if(data=="close"){
		app.closePage();
	}else if(data=="back"){
		app.closePage();
	}else if(data=="rr"){
		open.startb("source://view/percenter/setting.ui","push_r2l_1");
	}
});
headerTitleStyle.fire("headeralpha",condata);


var zpround = ui("do_ALayout_24");
page.on("loaded",function(){
	anim.animBKN2(zpround,{x:530,y:1120},{x:560,y:1150},500,200,"EaseOut");
}).on("result",function(data){
	init();
});

//收款记录
var getmoneyhis = ui("do_ALayout_8");
getmoneyhis.on("touch","",300,function(){
	anim.animbtn(getmoneyhis);
	open.startb("source://view/percenter/getmoneyhis.ui","push_r2l_1");
});
//验券记录
var getcouphis = ui("do_ALayout_10");
getcouphis.on("touch","",300,function(){
	anim.animbtn(getcouphis);
	open.startb("source://view/percenter/getcouphis.ui","push_r2l_1");
});
//公告管理
var gonggao = ui("do_ALayout_15");
gonggao.on("touch","",300,function(){
	anim.animbtn(gonggao);
	open.startb("source://view/percenter/gonggao.ui","push_r2l_1",param.notice);
});
//推荐商品
var tjsp = ui("do_ALayout_19");
tjsp.on("touch","",300,function(){
	anim.animbtn(tjsp);
	open.startb("source://view/percenter/tjsp.ui","push_r2l_1",param.tuijian);
});
//提现
var tixian = ui("do_ALayout_12");
tixian.on("touch","",300,function(){
	anim.animbtn(tixian);
	open.startb("source://view/percenter/tixian.ui","push_r2l_1");
});
//提现
var eval = ui("do_ALayout_17");
eval.on("touch","",300,function(){
	anim.animbtn(eval);
	open.startb("source://view/percenter/evaluate.ui","push_r2l_1");
});
//招聘
var advertise = ui("do_ALayout_24");
advertise.on("touch","",300,function(){
	anim.animbtn(advertise);
	open.startb("source://view/percenter/zhaopin.ui","push_r2l_1");
});

function init(){
	request_http.url = $U.token($U.url.merchantInfo,"token");
	request_http.request();
}

var storeTitle = ui("do_Label_1");
var balance = ui("do_Label_3");
var useRoll = ui("do_Label_4");
var storePath = ui("do_ImageView_2");

var request_http = mm("do_Http");
request_http.method = "POST";// GET | POST
request_http.timeout = 30000; // 超时时间 : 单位 毫秒
request_http.contentType = "application/json"; // Content-Type
request_http.on("success", function(databus) {
	lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
	storeTitle.text = databus.title;
	balance.text = databus.balance.toFixed(2);
	useRoll.text = databus.useRoll;
	storePath.source = $U.defaultImg("");
	$U.loadCacher("userLogin","defaultHead",databus.path);
	$HI.compare(databus.path,function(data){
		storePath.source = data;
	});
	param.tuijian = databus.recommend;
	param.notice = databus.notice;
}).on("fail", function(data) {
	lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
});

init();