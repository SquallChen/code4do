var rootview = ui("$");
var initdata = sm("do_InitData");
var imageBrowser = sm("do_ImageBrowser");
var nf = sm("do_Notification");
var page = sm("do_Page");
var app = sm("do_App");
var anim = require("anim");
var $U = require("url");
var Euc = encodeURIComponent;

var param = {pagesize:15,pageindex:1,isMore:false,isLoading:true};

//添加头部到当前UI
var headerTitle = rootview.add("titleHeader","source://view/tempalte/header/header_title.ui",0,0);
var headerTitleStyle = ui("titleHeader");

//var type={type:2};	//一.标题样式(显示标题类型)
//var title = {title:"选择城市"}; 	//二.标题
var btnImg = {rrimg:"",rlimg:""};//四.0.rightrightImg 1.rightleftImg
var handback = {hdclose:1,hddata:"手势关闭page传递"}; //五.是否开启IOS手势关闭page  0.不开启 1.开启   | data

var listbg = ui("listviewbody");
//异常
var tipFace = listbg.add("faceHeader","source://view/hintUI/tipInterface/tipFace.ui",0,0);
var tipFaceStyle = ui("faceHeader");

//loading
var loadingblack = rootview.add("blackloading","source://view/hintUI/loading_round.ui",0,530);
var lbss = ui("blackloading");
lbss.fire("loadingrxa",{"visible":1,"text":"加载中.."});

//0.显示按钮(0:文字,1:关闭按钮,2:关闭+文字+右边,3.关闭+文字+右边x2)
//1.标题文字内容
//2.closePage事件参数
//3.图片路径
//var condata=[hdtype,hdtitle,closeEvent,btnImg,handback];
var condata={type:2,title:"用户评价",rimg:btnImg,hback:handback}

headerTitleStyle.on("headfire",function(data){
	if(data=="close"){
		app.closePage();
	}else if(data=="back"){
		app.closePage();
	}
});
headerTitleStyle.fire("headertitle",condata);
/**
 * tab3
 */
var tabpos = 0;

var tabst3 = rootview.add("sttab3","source://view/tempalte/tabs/tab_top3.ui",0,148);
var tabstss3 = ui("sttab3");
tabstss3.on("tabtop3",function(data){
	param.type = data;
	param.isLoading=true;
	param.isMore=false;
	evaluateInit();
});

//分类列表
var dataComponent = mm("do_ListData");
var listviewComponent = ui("do_ListView_1");
listviewComponent.bindItems(dataComponent);
/*
 * 弹出文本输入
 */
var popinput = rootview.add("inputpop", "source://view/tempalte/popinput/pop_input.ui", 0, 0);
var popinputf = ui("inputpop");
var piother = {istext:0,psw:false,hint:"评价内容",text:"",title:"评价回复"}
listviewComponent.on("touch","",300,function(index){
	var cell = dataComponent.getOne(index);
	if(!cell.replyVisible){
		piother.index = index;
		popinputf.fire("popinputon",piother);
	}
});
popinputf.on("popinputfi",function(data){
	var cell = dataComponent.getOne(data.index);
	reply_http.url = $U.token($U.url.evaluateMerchantsReply,"token")+"&messageToken="+Euc(cell.token)+"&msg="+Euc(data.msg);
	reply_http.request();
});

var reply_http = mm("do_Http");
reply_http.method = "POST";// GET | POST
reply_http.timeout = 30000; // 超时时间 : 单位 毫秒
reply_http.contentType = "application/json"; // Content-Type
reply_http.on("success", function(databus) {
	if(databus.error_code==0){
		param.isLoading=true;
		param.isMore=false;
		evaluateInit();
	}else{
		nf.alert(databus.reason,"提示");
	}
}).on("fail", function(data) {
	nf.alert("服务器无响应","提示");
});

var _score = ui("do_Label_2");
var _number = ui("do_Label_3");

function init(){
	request_http.url = $U.token($U.url.evaluateTitle,"token");
	request_http.request();
}

var request_http = mm("do_Http");
request_http.method = "POST";// GET | POST
request_http.timeout = 30000; // 超时时间 : 单位 毫秒
request_http.contentType = "application/json"; // Content-Type
request_http.on("success", function(databus) {
	_score.text = databus.score;
	_number.text = databus.number+"条评论";
	var str = databus.noReply>0? "("+databus.noReply+")":"";
	var tabtxt = ["全部","未回复"+str,"已回复"];
	var tabfire = [tabpos,tabtxt];//0:tab位置 1:文字内容
	tabstss3.fire("tabtopb3",tabfire);
}).on("fail", function(data) {
	nf.alert("服务器无响应","提示",function(){
		app.closePage();
	});
});

function evaluateInit(){
	if(param.isMore) param.pageindex++;
	else param.pageindex=1;
	if(param.isLoading){
		lbss.fire("loadingrxa",{"visible":1,"text":"加载中.."});
		dataComponent.removeAll();
		listviewComponent.refreshItems();
	}
	else{
		lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
	}
	evaluate_http.url = $U.token($U.url.evaluateList,"storeToken")+"&page="+param.pagesize+"&index="+param.pageindex+"&type="+param.type;
	evaluate_http.request();
}
var evaluate_http = mm("do_Http");
evaluate_http.method = "POST";// GET | POST
evaluate_http.timeout = 30000; // 超时时间 : 单位 毫秒
evaluate_http.contentType = "application/json"; // Content-Type
evaluate_http.on("success", function(databus) {
	lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
	if(param.pageindex==1){
		dataComponent.removeAll();
		tipFaceStyle.visible = databus.length==0;
		if(databus.length==0){  //没有数据
			tipFaceStyle.fire("facetext","没有找到您所需要的信息");
		}
	}else if(databus.length==0){
		param.pageindex--;
	}
	dataComponent.addData(databus);
	for(var i=0;i<databus.length;i++){
		var _data = databus[i];
		var _str = "";
		for(var j=0;j<_data.evalList.length;j++){
			var _data1 = _data.evalList[j];
			_str+=_data1.title+":"+_data1.score+" ";
		}
		dataComponent.updateOne(i+(param.pagesize*(param.pageindex-1)), {
			"template":_data.imgList.length>0? 1:0,
			"token":_data.token,
			"userpath":$U.defaultImg(_data.userPath),
			"username":_data.userTitle,
			"evaluateTime":_data.createTime,
			"content":_data.msg,
			"reply":"商家回复:"+_data.storeReply,
			"replyVisible":_data.storeReply.trim()!="",
			"otherScore":_str,
			"img1":_data.imgList.length>0? _data.imgList[0].thumbnail:"",
			"vimg1":_data.imgList.length>0,
			"oimg1":_data.imgList.length>0? _data.imgList[0].originalImage:"",
			"img2":_data.imgList.length>1? _data.imgList[1].thumbnail:"",
			"vimg2":_data.imgList.length>1,
			"oimg2":_data.imgList.length>1? _data.imgList[1].originalImage:"",
			"img3":_data.imgList.length>2? _data.imgList[2].thumbnail:"",
			"vimg3":_data.imgList.length>2,
			"oimg3":_data.imgList.length>2? _data.imgList[2].originalImage:"",
			"img4":_data.imgList.length>3? _data.imgList[3].thumbnail:"",
			"vimg4":_data.imgList.length>3,
			"oimg4":_data.imgList.length>3? _data.imgList[3].originalImage:"",
			"index":i+(param.pagesize*(param.pageindex-1))
		});
	}
	listviewComponent.refreshItems();
	listviewComponent.rebound();
}).on("fail", function(data) {
	lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
	tipFaceStyle.visible=true;
});

listviewComponent.on("push",function(data){
	if (data.state != 2) return;
	param.isMore = true;
	param.isLoading = false;
	evaluateInit();
}).on("pull",function(data){
	if (data.state != 2) return;
	param.isMore = false;
	param.isLoading = false;
	evaluateInit();
});

init();