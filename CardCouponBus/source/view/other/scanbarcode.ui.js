var rootview = ui("$");
var page = sm("do_Page");
var app = sm("do_App");
var open = require("open");
var $U = require("url");
var Euc = encodeURIComponent;
var leftclose = ui("do_ALayout_close");
leftclose.on("touch",function(){
	app.closePage();
});

page.on("back", function(){
	app.closePage();
});

var nf = sm("do_Notification");

var barcode = ui("do_BarcodeView_1");

page.on("loaded",function(){
	StartSweep();
}).on("result",function(){
	StartSweep();
});

//loading
var loadingblack = rootview.add("blackloading","source://view/hintUI/loading_round.ui",0,530);
var lbss = ui("blackloading");
lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});

//启动扫描
function StartSweep(){
	//开始启动扫描
	barcode.start(function(data) {
		//扫描成功，执行回调函数
		lbss.fire("loadingrxa",{"visible":1,"text":"加载中.."});
		request_http.url = $U.token($U.url.rollSweepCode,"token")+"&code="+Euc(data.value);
		request_http.request();
	});
}
var request_http = mm("do_Http");
request_http.method = "POST";// GET | POST
request_http.timeout = 30000; // 超时时间 : 单位 毫秒
request_http.contentType = "application/json"; // Content-Type
request_http.on("success", function(databus) {
	lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
	if(databus.error_code==0){
		var str = "最近没有使用记录";
		if(databus.other=""){
			var str = "最近使用记录:"+databus.other;
		}
		nf.confirm(str, databus.reason, "使用", "取消", function(data, e) {
			if(data==1){
				//使用码
				use_http.url = $U.token($U.url.rollSweepCodeUse,"token")+"&userRollToken="+Euc(databus.token);
				use_http.request();
			}
		});
	}else{
		nf.alert(databus.reason,"提示");
	}
}).on("fail", function(data) {
	lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
	nf.alert("扫码失败","提示");
});

var use_http = mm("do_Http");
use_http.method = "POST";// GET | POST
use_http.timeout = 30000; // 超时时间 : 单位 毫秒
use_http.contentType = "application/json"; // Content-Type
use_http.on("success", function(databus) {
	lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
	if(databus.error_code==0){
		nf.alert("使用成功,请在验券记录中查看","提示",function(){
			app.closePage();
		});
	}else{
		nf.alert(databus.reason,"提示");
	}
}).on("fail", function(data) {
	lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
	nf.alert("使用失败","提示");
});