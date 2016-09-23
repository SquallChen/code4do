var rootview = ui("$");
var initdata = sm("do_InitData");
var nf = sm("do_Notification");
var page = sm("do_Page");
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
lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});

//var type={type:2};	//一.标题样式(显示标题类型)
//var title = {title:"选择城市"}; 	//二.标题
var btnImg = {rrimg:"",rlimg:""};//四.0.rightrightImg 1.rightleftImg
var handback = {hdclose:1,hddata:"手势关闭page传递"}; //五.是否开启IOS手势关闭page  0.不开启 1.开启   | data
//0.显示按钮(0:文字,1:关闭按钮,2:关闭+文字+右边,3.关闭+文字+右边x2)
//1.标题文字内容
//2.closePage事件参数
//3.图片路径
//var condata=[hdtype,hdtitle,closeEvent,btnImg,handback];
var condata={type:2,title:"验券记录",rimg:btnImg,hback:handback}

headerTitleStyle.on("headfire",function(data){
	if(data=="close"){
		app.closePage();
	}else if(data=="back"){
		app.closePage();
	}
});
headerTitleStyle.fire("headertitle",condata);

//list
var storage = sm("do_Storage");
var explist = ui("do_ExpandableListView_1");
var expData1 = mm("do_ListData");
var expData2 = mm("do_ListData");

var request_http = mm("do_Http");
request_http.method = "POST";// GET | POST
request_http.timeout = 30000; // 超时时间 : 单位 毫秒
request_http.contentType = "application/json"; // Content-Type
request_http.on("success", function(databus) {
	lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
	if(databus.length!=undefined){
		var data1 = [];
		var data2 = [];
		for(var i=0;i<databus.length;i++){
			var _data = databus[i];
			data1[data1.length] = {"gtxt":_data.date,"nums":_data.number+"条"};
			var _data2 = [];
			for(var j=0;j<_data.DataSource.length;j++){
				var _data1 = _data.DataSource[j];
				_data2[_data2.length] = {"ctitle":_data1.title};
			}
			data2[data2.length] = _data2;
		}
		expData1.addData(data1);
		expData2.addData(data2);
		explist.bindItems(expData1,expData2);
	}else{
		nf.alert("加载失败，请检查网络","提示");
	}
}).on("fail", function(data) {
	lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
	nf.alert("服务器无响应","提示");
});


/**
 * tab3
 */
var tabpos = 0;
var tabtxt = ["日统计","月统计","年统计"];
var tabfire = [tabpos,tabtxt];//0:tab位置 1:文字内容
var tabst3 = rootview.add("sttab3","source://view/tempalte/tabs/tab_top3.ui",0,148);
var tabstss3 = ui("sttab3");
tabstss3.on("tabtop3",function(data){
	init(data);
});
tabstss3.fire("tabtopb3",tabfire);


function init(n){
	lbss.fire("loadingrxa",{"visible":1,"text":"加载中.."});
	expData1.removeAll();
	expData2.removeAll();
	request_http.url = $U.token($U.url.rollSweepCodeRecord,"token")+"&type="+n;
	request_http.request();
}
