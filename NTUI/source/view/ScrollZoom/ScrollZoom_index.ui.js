//related to header_index.ui
var rootview = ui("$");
var nf = sm("do_Notification");
var page = sm("do_Page");
var app = sm("do_App");
var anim = require("anim");

var closebtn = ui("do_ALayout_25");
closebtn.on("touch","",300,function(){
	app.closePage();
});
page.on("back","",300,function(){
	app.closePage();
});
var headbg = ui("do_ALayout_23");
var headtxt = ui("do_Label_33");
var fudong = ui("do_ALayout_29");

var imgviewbg = ui("do_ImageView_1");
var scrollbody = ui("do_ScrollView_2");
scrollbody.on("scroll",function(datas){
	//图片位置大小
	imgviewbg.y = 0-+datas;
	if(imgviewbg.y >= 0){
		imgviewbg.y = 0;
		imgviewbg.height = 500 -+ datas;
	}
	imgviewbg.redraw();
	//模拟浮动层
	fudong.y = 500-+datas;
	if(fudong.y <= 148){
		fudong.y = 148;
	}
	fudong.redraw();
	//头部透明度控制
	var getnum = Math.ceil(datas/10);
	var getend = (getnum/2).toFixed(0);
	if(getend<2){
		headbg.bgColor = "FFFFFF00";
		headtxt.fontColor = "00000000";
		closebtn.bgColor = "FFFFFFBB"
	}else if(getend==10){
		getend = "A";
		headbg.bgColor = "FFFFFF"+getend+getend;
		headtxt.fontColor = "000000"+getend+getend;
	}else if(getend==11){
		getend = "B";
		headbg.bgColor = "FFFFFF"+getend+getend;
		headtxt.fontColor = "000000"+getend+getend;
	}else if(getend==12){
		getend = "C";
		headbg.bgColor = "FFFFFF"+getend+getend;
		headtxt.fontColor = "000000"+getend+getend;
	}else if(getend==13){
		getend = "D";
		headbg.bgColor = "FFFFFF"+getend+getend;
		headtxt.fontColor = "000000"+getend+getend;
	}else if(getend==14){
		getend = "E";
		headbg.bgColor = "FFFFFF"+getend+getend;
		headtxt.fontColor = "000000"+getend+getend;
	}else if(getend>=15){
		getend = "F";
		headbg.bgColor = "FFFFFF"+getend+getend;
		headtxt.fontColor = "000000"+getend+getend;
	}else{
		headbg.bgColor = "FFFFFF"+getend+getend;
		headtxt.fontColor = "000000"+getend+getend;
		closebtn.bgColor = "FFFFFF00"
	}
});
