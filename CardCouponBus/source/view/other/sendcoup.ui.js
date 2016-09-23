var rootview = ui("$");
var initdata = sm("do_InitData");
var nf = sm("do_Notification");
var page = sm("do_Page");
var app = sm("do_App");
var anim = require("anim");
var $U = require("url");
var $V = require("validation");
var Euc = encodeURIComponent;

var param = {};

var downlayout = ui("do_ALayout_10");//底部内容
var dataget = page.getData();//获取上一层data
var sendbg = ui("sendbg");
sendbg.on("touch",function(){
	page.hideKeyboard();
});
//添加头部到当前UI
var headerTitle = rootview.add("titleHeader","source://view/tempalte/header/header_alpha.ui",0,0);
var headerTitleStyle = ui("titleHeader");

//loading
var loadingblack = rootview.add("blackloading","source://view/hintUI/loading_round.ui",0,530);
var lbss = ui("blackloading");
lbss.fire("loadingrxa",{"visible":0,"text":"发放中.."});

//var type={type:2};	//一.标题样式(显示标题类型)
//var title = {title:"选择城市"}; 	//二.标题
var btnImg = {rrimg:"",rlimg:""};//四.0.rightrightImg 1.rightleftImg
var handback = {hdclose:0,hddata:"手势关闭page传递"}; //五.是否开启IOS手势关闭page  0.不开启 1.开启   | data
//0.显示按钮(0:文字,1:关闭按钮,2:关闭+文字+右边,3.关闭+文字+右边x2)
//1.标题文字内容
//2.closePage事件参数
//3.图片路径
//var condata=[hdtype,hdtitle,closeEvent,btnImg,handback];
var condata={type:2,title:"发券",rimg:btnImg,hback:handback}

headerTitleStyle.on("headalphafire",function(data){
	if(data=="close"){
		app.closePage();
	}else if(data=="back"){
		app.closePage();
	}
});
headerTitleStyle.fire("headeralpha",condata);

//券名称
var couplabel = ui("do_Label_1");
switch(parseInt(dataget)){
	case 1:
		couplabel.text = "实物券";
		var swcoup = downlayout.add("coupsw","source://view/tempalte/coupCount/coup2.ui",0,0);
		var swcoupStyle = ui("coupsw");
		swcoupStyle.on("coup2",function(data){
			nf.confirm({text:data.txt1, title:"确认发布?", button1text:"发布", button2text:"取消"}, function(datacf, e) {
				if(datacf==1){
					param.alias = data.txt1;
					releaseRoll();
				}
			});
		});
		break;
	case 2:
		couplabel.text = "满减券";
		var fullcoup = downlayout.add("coupfull","source://view/tempalte/coupCount/coup0.ui",0,0);
		var fullcoupStyle = ui("coupfull");
		fullcoupStyle.on("coup0",function(data){
			nf.confirm({text:"满"+data.txt1+"减"+data.txt2+"元", title:"确认发布?", button1text:"发布", button2text:"取消"}, function(datacf, e) {
				if(datacf==1){
					param.condition = data.txt1;
					param.deduct = data.txt2;
					releaseRoll();
				}
			});
		});
		break;
	case 3:
		couplabel.text = "折扣券";
		var zkcoup = downlayout.add("coupzk","source://view/tempalte/coupCount/coup1.ui",0,0);
		var zkcoupStyle = ui("coupzk");
		zkcoupStyle.on("coup1",function(data){
			nf.confirm({text:data.txt1+"折", title:"确认发布?", button1text:"发布", button2text:"取消"}, function(datacf, e) {
				if(datacf==1){
					param.deduct = data.txt1;
					releaseRoll();
				}
			});
		});
		break;
	case 4:
		couplabel.text = "抵价券";
		var djcoup = downlayout.add("coupdj","source://view/tempalte/coupCount/coup3.ui",0,0);
		var djcoupStyle = ui("coupdj");
		djcoupStyle.on("coup3",function(data){
			nf.confirm({text:"抵"+data.txt1+"元", title:"确认发布?", button1text:"发布", button2text:"取消"}, function(datacf, e) {
				if(datacf==1){
					param.deduct = data.txt1;
					releaseRoll();
				}
			});
		});
		break;
}
//发送券
function releaseRoll(number){
	if(param.number==undefined){
		nf.alert("请选择发放数量","提示");
	}else if(param.many==undefined){
		nf.alert("请选择领取次数","提示");
	}else if(param.dueTime==undefined){
		nf.alert("请选择期限","提示");
	}else if(parseInt(dataget)==1 && param.alias==undefined){
		nf.alert("请输入实物描述","提示");
	}else if(parseInt(dataget)==2 && (param.condition==undefined || param.deduct==undefined || !$V.regular.integer.test(param.condition) || !$V.regular.integer.test(param.deduct) || parseInt(param.deduct)>=parseInt(param.condition))){
		nf.alert("请正确输入满减券所需信息","提示");
	}else if(parseInt(dataget)==3 && (param.deduct==undefined || !$V.regular.onedecimal.test(param.deduct))){
		nf.alert("请正确输入打折券所需信息","提示");
	}else if(parseInt(dataget)==4 && (param.deduct==undefined || !$V.regular.integer.test(param.deduct))){
		nf.alert("请正确输入低价券所需信息","提示");
	}else{
		lbss.fire("loadingrxa",{"visible":1,"text":"发放中.."});
		param.alias = param.alias==undefined? "":param.alias;
		param.condition = param.condition==undefined? "":param.condition;
		param.deduct = param.deduct==undefined? "":param.deduct;
		var url = $U.token($U.url.rollMerchantRelease,"token")+"&typeId="+dataget+"&number="+param.number+"&many="+param.many+"&dueTime="+Euc(param.dueTime)+"&alias="+Euc(param.alias)+"&condition="+Euc(param.condition)+"&deduct="+Euc(param.deduct);
		
		request_http.url = url;
		request_http.request();
	}
}

var request_http = mm("do_Http");
request_http.method = "POST";// GET | POST
request_http.timeout = 30000; // 超时时间 : 单位 毫秒
request_http.contentType = "application/json"; // Content-Type
request_http.on("success", function(databus) {
	lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
	if(databus.error_code==0){
		app.closePage({action:"load"});
	}else{
		nf.alert(databus.reason,"提示");
	}
}).on("fail", function(data) {
	nf.alert("发放失败","提示");
	lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
});

//选择券数量
var numselect = rootview.add("selectnum","source://view/tempalte/index_pop/picker1.ui",0,0);
var numselectStyle = ui("selectnum");
var ptitle={"title":"发放数量","ppos":deviceone.ppos};
var pdata=[10,20,30,40,50,66,70,88,99,100,120,130,140,150,160,170,188];
var pcount = [ptitle,pdata];
//数量
var numsel = ui("do_ALayout_4");
var numseltxt = ui("do_Label_2");
numsel.on("touch","",300,function(){
	anim.animbtn(numsel);
	page.hideKeyboard();
	numselectStyle.fire("picker1",pcount);
});
numselectStyle.on("picker1f",function(data){
	deviceone.ppos = data[0];
	numseltxt.text = data[1];
	param.number = parseInt(data[1]);
	numseltxt.fontColor = "FF0080FF";
});

//选择领取次数
var getselect = rootview.add("selectget","source://view/tempalte/index_pop/picker1.ui",0,0);
var getselectStyle = ui("selectget");
var getptitle={"title":"限领次数","ppos":deviceone.getpos};
var getpdata=["不限制",1];
var getpcount = [getptitle,getpdata];
//次数
var getsel = ui("do_ALayout_5");
var getseltxt = ui("do_Label_4");
getsel.on("touch","",300,function(){
	anim.animbtn(getsel);
	page.hideKeyboard();
	getselectStyle.fire("picker1",getpcount);
});
getselectStyle.on("picker1f",function(data){
	deviceone.getpos = data[0];
	getseltxt.text = data[1];
	param.many = (data[0]==true);
	getseltxt.fontColor = "FF0080FF";
});

//选择期限
var timeselect = rootview.add("selecttime","source://view/tempalte/index_pop/picker1.ui",0,0);
var timeselectStyle = ui("selecttime");
var timeptitle={"title":"期限","ppos":deviceone.timepos};
var timepdata=["1天","1周","半个月","1个月","2个月","3个月","4个月","5个月","6个月","1年","2年"];
var timepvalue=["1-d","7-d","15-d","1-m","2-m","3-m","4-m","5-m","6-m","1-y","2-y"];
var timepcount = [timeptitle,timepdata];
//期限
var timesel = ui("do_ALayout_6");
var timeseltxt = ui("do_Label_6");
timesel.on("touch","",300,function(){
	anim.animbtn(timesel);
	page.hideKeyboard();
	timeselectStyle.fire("picker1",timepcount);
});
timeselectStyle.on("picker1f",function(data){
	deviceone.timepos = data[0];
	timeseltxt.text = data[1];
	param.dueTime = timepvalue[data[0]];
	timeseltxt.fontColor = "FF0080FF";
});
