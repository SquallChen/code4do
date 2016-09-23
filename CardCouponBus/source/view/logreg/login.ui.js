var rootview = ui("$");
var nf = sm("do_Notification");
var global = sm("do_Global");
var page = sm("do_Page");
var app = sm("do_App");
var cacher = sm("do_DataCache");
var anim = require("anim");
var open = require("open");
var $U = require("url");
var $HI = require("headimg");
var Euc = encodeURIComponent;

var param = page.getData();

//loading
var loadingblack = rootview.add("blackloading","source://view/hintUI/loading_round.ui",0,530);
var lbss = ui("blackloading");
lbss.fire("loadingrxa",{"visible":0,"text":"登录中.."});

//安卓返回键主页退出
var canBack = false;
var delay3 = mm("do_Timer");
delay3.delay = 3000;
delay3.interval = 1000;
delay3.on("tick", function(){
    this.stop();
    canBack = false;
});
page.on("back", function(){
    if(canBack){
        global.exit();
    }else{
        nf.toast("再按一次退出");
        canBack = true;
        delay3.start();
    }
}).on("loaded",function(){
	var _json = cacher.loadData("userLogin");
	if(_json!=undefined && _json.loginName!=undefined){
		loginName.text = _json.loginName;
	}
});
//隐藏键盘
var logbg = ui("loginbg");
logbg.on("touch",function(){
	page.hideKeyboard();
})
var loginName = ui("do_TextField_1");
var loginPass = ui("do_TextField_2");
//登录
var loginbtn = ui("do_Button_1");
loginbtn.on("touch","",300,function(){
	anim.animbtn(loginbtn);
	
	if(loginName.text.trim()==""){
		nf.alert("请输入用户名","提示");
		loginName.setFocus(true);
	}else if(loginPass.text.trim()==""){
		nf.alert("请输入密码","提示");
		loginPass.setFocus(true);
	}else{
		page.hideKeyboard();
		lbss.fire("loadingrxa",{"visible":1,"text":"登录中.."});
		var equipment = cacher.loadData("equipment");
		
		request_http.url = $U.url.merchantLogin+"?loginName="+Euc(loginName.text)+"&loginPass="+Euc(loginPass.text);
		if(equipment!=undefined && equipment.channelId!=undefined && equipment.equipment!=undefined){
			request_http.url+="&channelid="+Euc(equipment.channelId)+"&equipment="+Euc(equipment.equipment);
		}
		request_http.request();
	}
});

var request_http = mm("do_Http");
request_http.method = "POST";// GET | POST
request_http.timeout = 30000; // 超时时间 : 单位 毫秒
request_http.contentType = "application/json"; // Content-Type
request_http.on("success", function(databus) {
	if(databus.error_code==0){
		var _data = databus.DataSource;
		var json = {token:_data.token,storeToken:_data.storeToken,loginName:loginName.text};
		cacher.saveData("userLogin", json);
		if(param.url!=undefined){
			app.closePage({action:"load"},function(){
				if(param.option!=undefined){
					open.startb(param.url,"push_r2l_1",param.option);
				}else{
					open.startb(param.url,"push_r2l_1");
				}
			});
		}else{
			app.closePage({action:"load"});
		}
	}else{
		nf.alert("用户名或密码错误","提示");
	}
	lbss.fire("loadingrxa",{"visible":0,"text":"登录中.."});
}).on("fail", function(data) {
	nf.alert("服务器无响应","提示");
	lbss.fire("loadingrxa",{"visible":0,"text":"登录中.."});
});

