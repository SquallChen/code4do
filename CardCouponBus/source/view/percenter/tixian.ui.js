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
lbss.fire("loadingrxa",{"visible":1,"text":"加载中.."});

//var type={type:2};	//一.标题样式(显示标题类型)
//var title = {title:"选择城市"}; 	//二.标题
var btnImg = {rrimg:"",rlimg:""};//四.0.rightrightImg 1.rightleftImg
var handback = {hdclose:1,hddata:"手势关闭page传递"}; //五.是否开启IOS手势关闭page  0.不开启 1.开启   | data
//0.显示按钮(0:文字,1:关闭按钮,2:关闭+文字+右边,3.关闭+文字+右边x2)
//1.标题文字内容
//2.closePage事件参数
//3.图片路径
//var condata=[hdtype,hdtitle,closeEvent,btnImg,handback];
var condata={type:2,title:"结算",rimg:btnImg,hback:handback}

headerTitleStyle.on("headfire",function(data){
	if(data=="close"){
		app.closePage();
	}else if(data=="back"){
		app.closePage();
	}
});
headerTitleStyle.fire("headertitle",condata);

//列表数据
var dataComponent = mm("do_ListData");
var listviewComponent = ui("do_ListView_1");
listviewComponent.bindItems(dataComponent);
data1 = [];

var yye = ui("do_Label_2");
var yuee = ui("do_Label_4");
var jiesuan = ui("do_Label_9");

var dbalance = 0;

var request_http = mm("do_Http");
request_http.method = "POST";// GET | POST
request_http.timeout = 30000; // 超时时间 : 单位 毫秒
request_http.contentType = "application/json"; // Content-Type
request_http.on("success", function(databus) {
	lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
	if(databus.error_code==0){
		var _data = databus.DataSource;
		yye.text = "¥"+_data.turnover.toFixed(2);
		yuee.text = "¥"+_data.balance.toFixed(2);
		dbalance = _data.balance;
		jiesuan.text = "¥"+_data.settleAmount.toFixed(2);
		
		for(var i=0;i<_data.dateList.length;i++){
			var _data1 = _data.dateList[i];
			var _state = "等待结算";
			var _color = "FF0000FF";
			switch(_data1.state){
				case 1:
					_state = "已结算";
					_color = "0080FFFF";
					break;
			};
			data1[data1.length] = {"time":_data1.date,"price":"¥"+_data1.amount,jsstate:_state,jscolor:_color};
		}
		dataComponent.addData(data1);
		listviewComponent.refreshItems();
	}else{
		nf.alert(databus.reason,"提示");
	}
}).on("fail", function(data) {
	lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
	nf.alert("服务器未响应","提示");
});

function init(){
	data1 = [];
	dataComponent.removeAll();
	listviewComponent.refreshItems();
	request_http.url = $U.token($U.url.merchantSettlement,"token");
	request_http.request();
}

var submit_http = mm("do_Http");
submit_http.method = "POST";// GET | POST
submit_http.timeout = 30000; // 超时时间 : 单位 毫秒
submit_http.contentType = "application/json"; // Content-Type
submit_http.on("success", function(databus) {
	lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
	if(databus.error_code==0){
		nf.alert("结算成功，请耐心等待打款","提示",function(){
			init();
		});
	}else{
		nf.alert(databus.reason,"提示");
	}
}).on("fail", function(data) {
	lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
	nf.alert("服务器未响应","提示");
});

//申请结算按钮
var starttx = ui("do_ALayout_6");
starttx.on("touch","",300,function(){
	anim.animbtn(starttx);
	nf.confirm({text:"结算金额:¥"+dbalance.toFixed(2), title:"结算", button1text:"立即结算", button2text:"取消"}, function(data, e) {
		if(data==1){
			if(dbalance>0){
				lbss.fire("loadingrxa",{"visible":1,"text":"结算中.."});
				submit_http.url = $U.token($U.url.merchantApplySettlement,"token")+"&amount="+Euc(dbalance);
				submit_http.request();
			}else{
				nf.alert("没有可结算金额","提示");
			}
		}
	});
});
init();