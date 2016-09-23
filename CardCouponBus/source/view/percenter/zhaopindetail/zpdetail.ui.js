var rootview = ui("$");
var nf = sm("do_Notification");
var page = sm("do_Page");
var app = sm("do_App");
var dateTime = sm("do_DateTimePicker")
var anim = require("anim");
var $U = require("url");
var $C = require("common");
var Euc = encodeURIComponent;

var token = page.getData();

//添加头部到当前UI
var headerTitle = rootview.add("titleHeader","source://view/tempalte/header/header_title.ui",0,0);
var headerTitleStyle = ui("titleHeader");

//loading
var loadingblack = rootview.add("blackloading","source://view/hintUI/loading_round.ui",0,530);
var lbss = ui("blackloading");
lbss.fire("loadingrxa",{"visible":0,"text":"保存中.."});

//var type={type:2};	//一.标题样式(显示标题类型)
//var title = {title:"选择城市"}; 	//二.标题
var btnImg = {rrimg:"",rlimg:""};//四.0.rightrightImg 1.rightleftImg
var handback = {hdclose:1,hddata:"手势关闭page传递"}; //五.是否开启IOS手势关闭page  0.不开启 1.开启   | data
//0.显示按钮(0:文字,1:关闭按钮,2:关闭+文字+右边,3.关闭+文字+右边x2)
//1.标题文字内容
//2.closePage事件参数
//3.图片路径
//var condata=[hdtype,hdtitle,closeEvent,btnImg,handback];
var condata={type:2,title:"新增岗位",rimg:btnImg,hback:handback}

headerTitleStyle.on("headfire",function(data){
	if(data=="close"){
		app.closePage();
	}else if(data=="back"){
		app.closePage();
	}
});
headerTitleStyle.fire("headertitle",condata);

var hidekey = ui("do_LinearLayout_1");
hidekey.on("touch",function(){
	page.hideKeyboard();
});
page.on("loaded",function(){
	page.fire("zponfire","加载内容");//发送数据到子界面
});
var _job = ui("do_TextField_1");
var _people = ui("do_TextField_2");
var _salary = ui("do_TextField_3");
var _place = ui("do_TextField_4");
var _experience = ui("do_TextField_5");
var _education = ui("do_Label_18");//学历
var _panel6 = ui("do_ALayout_6");
var _welfare = ui("do_TextField_7");
var _requirement = ui("do_TextBox_1");
var _dueTime = ui("do_Label_19");//日期
var _panel10 = ui("do_ALayout_10");

//学历
var numselect = rootview.add("selectnum","source://view/tempalte/index_pop/picker1.ui",0,0);
var numselectStyle = ui("selectnum");
var ptitle={"title":"学历","ppos":deviceone.ppos};
var pdata=["不限","高中","中专","大专","本科","研究生"];
var pcount = [ptitle,pdata];
_panel6.on("touch","",300,function(){
	anim.animbtn(_panel6);
	page.hideKeyboard();
	numselectStyle.fire("picker1",pcount);
});

numselectStyle.on("picker1f",function(data){
	deviceone.ppos = data[0];
	_education.text = data[1];
});

//到期时间
var myDate=new Date();
var date0 = myDate.getTime();
//定义最大时间
var myDate=new Date(2050,00,01);
var dateMax = myDate.getTime();
//定义最小时间
var myDate=new Date();
var dateMin = myDate.getTime();
_panel10.on("touch","",300,function(){
	dateTime.show({type:1, data:date0, maxDate:dateMax,minDate:dateMin, title:"日期选择", buttons:["选择","不选择"]}, function(data, e){
        if(data.flag==0){
        	var date1 = new Date(parseInt(data.time));
        	_dueTime.text = date1.getFullYear()+"-"+$C.fillString(2,"0",(date1.getMonth() + 1))+"-"+$C.fillString(2,"0",date1.getDate());
        }
    });
});

//发布按钮
var fabubtn = ui("do_Button_1");
fabubtn.on("touch","",300,function(){
	anim.animbtn(fabubtn);
	if(_job.text.trim()==""){
		nf.alert("请输入职位名称","提示");
		_job.setFocus(true);
	}else if(_people.text.trim()==""){
		nf.alert("请输入招聘人数","提示");
		_people.setFocus(true);
	}else if(_salary.text.trim()==""){
		nf.alert("请输入薪资待遇","提示");
		_salary.setFocus(true);
	}else if(_place.text.trim()==""){
		nf.alert("请输入工作地点","提示");
		_place.setFocus(true);
	}else if(_experience.text.trim()==""){
		nf.alert("请输入工作经验","提示");
		_experience.setFocus(true);
	}else if(_education.text.trim()==""){
		nf.alert("请选择学历","提示");
		_education.setFocus(true);
	}else if(_dueTime.text.trim()==""){
		nf.alert("请选择到期时间","提示");
		_dueTime.setFocus(true);
	}else if(_welfare.text.trim()==""){
		nf.alert("请输入福利","提示");
		_welfare.setFocus(true);
	}else if(_requirement.text.trim()==""){
		nf.alert("请输入岗位描述","提示");
		_requirement.setFocus(true);
	}else{
		lbss.fire("loadingrxa",{"visible":1,"text":"保存中.."});
		var json = "{job:'"+_job.text+"',salary:'"+_salary.text+"',people:'"+_people.text+"',experience:'"+_experience.text+"',education:'"+_education.text+"',welfare:'"+_welfare.text+"',requirement:'"+_requirement.text+"',due_time:'"+_dueTime.text+"',place:'"+_place.text+"'}";
		token = token==undefined? "":token;
		request_http.url = $U.token($U.url.merchantRecruitmentEdit,"token")+"&recToken="+Euc(token)+"&param="+Euc(json);
		request_http.request();
	}
});

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
	lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
	nf.alert("保存招聘信息失败","提示");
});

var info_http = mm("do_Http");
info_http.method = "POST";// GET | POST
info_http.timeout = 30000; // 超时时间 : 单位 毫秒
info_http.contentType = "application/json"; // Content-Type
info_http.on("success", function(databus) {
	lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
	if(databus.token!=""){
		_job.text = databus.job;
		_people.text = databus.people;
		_salary.text = databus.salary;
		_place.text = databus.place;
		_experience.text = databus.experience;
		_education.text = databus.education;
		_welfare.text = databus.welfare;
		_requirement.text = databus.requirement;
		_dueTime.text = databus.dueTime;
	}else{
		nf.alert("加载失败","提示");
	}
}).on("fail", function(data) {
	lbss.fire("loadingrxa",{"visible":0,"text":"加载中.."});
	nf.alert("服务器未响应，请稍后再试","提示");
});

function init(){
	if(token!=undefined && token!=null && token!=""){
		lbss.fire("loadingrxa",{"visible":1,"text":"加载中.."});
		info_http.url = $U.token($U.url.merchantRecruitmentInfo,"token")+"&recToken="+Euc(token);
		info_http.request();
	}
}
init();
