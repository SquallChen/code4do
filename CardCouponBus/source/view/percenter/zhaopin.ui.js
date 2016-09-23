var rootview = ui("$");
var initdata = sm("do_InitData");
var nf = sm("do_Notification");
var page = sm("do_Page");
var open = require("open");
var app = sm("do_App");
var anim = require("anim");
var $U = require("url");
var Euc = encodeURIComponent;
//添加头部到当前UI
var headerTitle = rootview.add("titleHeader","source://view/tempalte/header/header_title.ui",0,0);
var headerTitleStyle = ui("titleHeader");

//loading
var loadingblack = rootview.add("blackloading","source://view/hintUI/loading_round.ui",0,530);
var lbss = ui("blackloading");
lbss.fire("loadingrxa",{"visible":1,"text":"保存中.."});

//var type={type:2};	//一.标题样式(显示标题类型)
//var title = {title:"选择城市"}; 	//二.标题
var btnImg = {rrimg:"source://image/add_black.png",rlimg:""};//四.0.rightrightImg 1.rightleftImg
var handback = {hdclose:1,hddata:"手势关闭page传递"}; //五.是否开启IOS手势关闭page  0.不开启 1.开启   | data
//0.显示按钮(0:文字,1:关闭按钮,2:关闭+文字+右边,3.关闭+文字+右边x2)
//1.标题文字内容
//2.closePage事件参数
//3.图片路径
//var condata=[hdtype,hdtitle,closeEvent,btnImg,handback];
var condata={type:3,title:"招聘信息",rimg:btnImg,hback:handback}

headerTitleStyle.on("headfire",function(data){
	if(data=="close"){
		app.closePage();
	}else if(data=="back"){
		app.closePage();
	}else if(data=="rr"){
		open.startb("source://view/percenter/zhaopindetail/zpdetail.ui","push_r2l_1");
	}
});
headerTitleStyle.fire("headertitle",condata);

//分类列表
var dataComponent = mm("do_ListData");
var listviewComponent = ui("do_ListView_1");
listviewComponent.bindItems(dataComponent);
//long弹出
var longpop = rootview.add("poplong", "source://view/tempalte/index_pop/longSel.ui",0,0);
var longpopf = ui("poplong");
listviewComponent.on("touch",function(index){
	var cells = dataComponent.getOne(index);
	var gettitle = cells.title;
	var longfiretxt = {"visible":true,"title":gettitle,"btn01":"编辑","btn02":"删除","token":cells.token};
	longpopf.fire("longbottomSJ",longfiretxt);
});
longpopf.on("longbottome",function(data){  //编辑
	open.startb("source://view/percenter/zhaopindetail/zpdetail.ui","push_r2l_1",data);
}).on("longbottomf",function(data){
	nf.confirm("确认删除此招聘信息？", "删除操作", "确认", "取消", function(data1, e) {
		if(data1==1){
			del_http.url = $U.token($U.url.merchantRecruitmentDel,"token")+"&recToken="+Euc(data);
			del_http.request();
		}
	});
});

var del_http = mm("do_Http");
del_http.method = "POST";// GET | POST
del_http.timeout = 30000; // 超时时间 : 单位 毫秒
del_http.contentType = "application/json"; // Content-Type
del_http.on("success", function(databus) {
	if(databus.error_code==0){
		init();
	}else{
		nf.alert(databus.reason,"提示");
	}
}).on("fail", function(data) {
	lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
	nf.alert("服务器无响应，请稍后再试","提示");
});

var request_http = mm("do_Http");
request_http.method = "POST";// GET | POST
request_http.timeout = 30000; // 超时时间 : 单位 毫秒
request_http.contentType = "application/json"; // Content-Type
request_http.on("success", function(databus) {
	lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
	var title = databus.length>0? "招聘信息("+databus.length+")":"招聘信息";
	var condata={type:3,title:title,rimg:btnImg,hback:handback}
	headerTitleStyle.fire("headertitle",condata);
	//deviceone.print(JSON.stringify(databus));
	dataComponent.removeAll();
	dataComponent.addData(databus);
	for(var i=0;i<databus.length;i++){
		var _data = databus[i];
		dataComponent.updateOne(i, {
			"title":_data.job,
			"percount":_data.people+"名",
			"price":_data.salary+"元",
			"city":"地点:"+_data.place,
			"jingyan":"工作经验:"+_data.experience,
			"xueli":"学历:"+_data.education,
			"fuli":_data.welfare,
			"detail":_data.requirement,
			"token":_data.token,
			"index":i
		});
	}
	listviewComponent.refreshItems();
	listviewComponent.rebound();
}).on("fail", function(data) {
	lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
});

listviewComponent.on("pull",function(data){
	if (data.state != 2) return;
	init();
});

function init(){
	request_http.url = $U.token($U.url.merchantRecruitmentList,"token");
	request_http.request();
}

init();

page.on("result",function(data){
	if(data.action=="load"){
		init();
	}
});