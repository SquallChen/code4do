//related to VSIndex.ui
var rootview = ui("$");
var initdata = sm("do_InitData");
var nf = sm("do_Notification");
var storage = sm("do_Storage");
var global = sm("do_Global");
var app = sm("do_App");
var page = sm("do_Page");
var open = require("open");
var anim = require("anim");
var $Update = require("update");
var $U = require("url");
var Euc = encodeURIComponent;


//loading
var loadingblack = rootview.add("blackloading","source://view/hintUI/loading_round.ui",0,530);
var lbss = ui("blackloading");
lbss.fire("loadingrxa",{"visible":1,"text":"加载中.."});

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
	$Update.compare();
	open.startw("source://view/logreg/login.ui","slide_b2t");
}).on("result",function(data){
	if(data.action=="load"){
		rollList();
	}
});
//已上线的券列表
var dataCoups = mm("do_ListData");
var listviewCoups = ui("do_ListView_1");

listviewCoups.bindItems(dataCoups);
/*
 * 弹出indexpop
 */
var indexpop = rootview.add("popindex", "source://view/tempalte/index_pop/index_pop.ui",0,0);
var indexpopf = ui("popindex");
var indexfirecon = {"visible":true}
//发券按钮
var sendcoup = ui("do_ALayout_8");
sendcoup.on("touch","",300,function(){
	anim.animBKN2(sendcoup,{bgColor:"FFFFFF44"},{bgColor:"FFFFFF00"},200,100,"EaseOut");
	indexpopf.fire("indexpopfire",indexfirecon);
});
indexpopf.on("indexpopon",function(data){
	open.startw("source://view/other/sendcoup.ui","push_r2l_1",data);
});
//long弹出
var longpop = rootview.add("poplong", "source://view/tempalte/index_pop/longSel.ui",0,0);
var longpopf = ui("poplong");

listviewCoups.on("touch",function(index){
	var cells = dataCoups.getOne(index);
	var title = cells.couptype;
	var longfiretxt = {"visible":true,"title":title,"btn01":"编辑(不可用)","btn02":"下架","token":cells.token};
	longpopf.fire("longbottomSJ",longfiretxt);
});
longpopf.on("longbottomf",function(data){
	nf.confirm({text:"您确定要下次此券吗?", title:"下架提示", button1text:"确认下架", button2text:"取消"}, function(datadown, e) {
		if(datadown==1){
			soldout_http.url = $U.token($U.url.rollMerchantSoldOut,"token")+"&rollToken="+Euc(data);
			soldout_http.request();
		}
	});
}).on("longbottome",function(data){
	//编辑
});

var soldout_http = mm("do_Http");
soldout_http.method = "POST";// GET | POST
soldout_http.timeout = 30000; // 超时时间 : 单位 毫秒
soldout_http.contentType = "application/json"; // Content-Type
soldout_http.on("success", function(databus) {
	if(databus.error_code==0){
		nf.toast("下架成功");
		rollList();
	}else{
		nf.alert(databus.reason,"提示");
	}
}).on("fail", function(data) {
	nf.alert("下架失败","提示");
});

//扫码
var scanbor = ui("do_ALayout_12");
scanbor.on("touch","",300,function(){
	anim.animbtn(scanbor);
	open.startw("source://view/other/scanbarcode.ui","push_r2l_1");
});
//收款
var shoumoney = ui("do_ALayout_11");
shoumoney.on("touch","",300,function(){
	anim.animbtn(shoumoney);
	open.startw("source://view/other/collections.ui","push_r2l_1");
});
//个人中心
var percenter = ui("do_ALayout_10");
percenter.on("touch","",300,function(){
	anim.animbtn(percenter);
	open.startw("source://view/percenter/per_index.ui","push_r2l_1");
});

var rollNumber = ui("do_Label_3");
//初始化
function rollList(){
	lbss.fire("loadingrxa",{"visible":1,"text":"加载中.."});
	request_http.url = $U.token($U.url.rollMerchantList,"token");
	request_http.request();
}

var request_http = mm("do_Http");
request_http.method = "POST";// GET | POST
request_http.timeout = 30000; // 超时时间 : 单位 毫秒
request_http.contentType = "application/json"; // Content-Type
request_http.on("success", function(databus) {
	lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
	rollNumber.text = "优汇券-"+databus.length+"张";
	dataCoups.removeAll();
	dataCoups.addData(databus);
	for(var i=0;i<databus.length;i++){
		var _data = databus[i];
		var color = "50B98EFF";
		switch(_data.type){
			case 2:
				color = "369FDAFF";
				break;
			case 3:
				color = "8462A7FF";
				break;
			case 4:
				color = "FF9523FF";
				break;
		}
		dataCoups.updateOne(i, {
			"couptype":_data.title,
			"token":_data.token,
			"couplq":_data.many? "不限领取次数":"限领一次",
			"allnum":"总发放:"+_data.totalNumber,
			"synum":"剩余:"+_data.number,
			"startime":"发放时间:"+_data.createTime,
			"endtime":"截止时间:"+_data.dueTime,
			"type":_data.type,
			"bgcolor":color,
			"index":i
		});
	}
	listviewCoups.refreshItems();
	listviewCoups.rebound();
}).on("fail", function(data) {
	lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
});

listviewCoups.on("pull",function(data){
	if (data.state != 2) return;
	rollList();
});