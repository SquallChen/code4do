var rootview = ui("$");
var initdata = sm("do_InitData");
var nf = sm("do_Notification");
var page = sm("do_Page");
var app = sm("do_App");
var anim = require("anim");
//添加头部到当前UI
var headerTitle = rootview.add("titleHeader","source://view/tempalte/header/header_alpha.ui",0,0);
var headerTitleStyle = ui("titleHeader");

//var type={type:2};	//一.标题样式(显示标题类型)
//var title = {title:"选择城市"}; 	//二.标题
var btnImg = {rrimg:"source://image/refers.png",rlimg:""};//四.0.rightrightImg 1.rightleftImg
var handback = {hdclose:1,hddata:"手势关闭page传递"}; //五.是否开启IOS手势关闭page  0.不开启 1.开启   | data
//0.显示按钮(0:文字,1:关闭按钮,2:关闭+文字+右边,3.关闭+文字+右边x2)
//1.标题文字内容
//2.closePage事件参数
//3.图片路径
//var condata=[hdtype,hdtitle,closeEvent,btnImg,handback];
var condata={type:3,title:"收款",rimg:btnImg,hback:handback}

headerTitleStyle.on("headalphafire",function(data){
	if(data=="close"){
		app.closePage();
	}else if(data=="back"){
		app.closePage();
	}
});
headerTitleStyle.fire("headeralpha",condata);

//
//添加键盘到UI
var numbertxt = ui("do_Label_4");
var numberkeyboard = rootview.add("keyboardnumber","source://view/tempalte/input/keybord.ui",0,0);
var numberkeyboardStyle = ui("keyboardnumber");
var keycon = {"visible":true,"surebtn":"确定"};
numberkeyboardStyle.on("numberkeyfire",function(data){
	var str = numbertxt.text.replace("¥"," ").trim();
	if(parseInt(str)==0 && str.indexOf('.')==-1){
		if(data=="."){
			data = "0.";
		}
		str = data;
	}else{
		if(data=="." && str.indexOf(".")!=-1){
			data = "";
		}
		if(str.indexOf(".")==-1){
			str += data;
		}
		else if(str.substring(str.indexOf(".")).length<=2){
			str += data;
		}
	}
	numbertxt.text = "¥"+str;
});
var inputnum = ui("do_ALayout_3");
inputnum.on("touch","",300,function(){
	numberkeyboardStyle.fire("numberkey",keycon);
});

numberkeyboardStyle.on("numberkeyfires",function(data){
	if(data=="清空"){
		numbertxt.text = "";
	}else if(data=="确定"){
		nf.alert(numbertxt.text);
	}
});


//隐藏键盘
var bglay = ui("shoukuanbg");
bglay.on("touch",function(){
	page.hideKeyboard();
});

//确定生成二维码
//var surebtn = ui("do_Button_1");
//surebtn.on("touch","",300,function(){
//	anim.animbtn(surebtn);
//	if(textfd.text>0){
//		nf.alert("生成成功", "金额:¥168");
//	}else{
//		nf.alert("输入金额有误!");
//	}
//});