//related to header_index.ui
var rootview = ui("$");
var nf = sm("do_Notification");
var page = sm("do_Page");
var app = sm("do_App");
var anim = require("anim");
var external = sm("do_External");

var closebtn = ui("do_ALayout_25");
closebtn.on("touch","",300,function(){
	anim.animbtn1(closebtn);
	app.closePage();
});
page.on("back","",300,function(){
	app.closePage();
});
//图片张数
var picnumber = ui("do_Label_45");
picnumber.text = "32张";
//公告
var gonggao = ui("do_MarqueeLabel_1");
gonggao.text = "欢迎光临 黄焖鸡米饭 ,每天限时10:00-11:00半价!";
//店铺名称
var bustext = "「黄焖鸡米饭」";
var busname = ui("do_Label_35");
var headbusname = ui("do_Label_33");
busname.text = bustext;
headbusname.text = bustext;
//菜系
var caixi = ui("do_Label_36");
caixi.text = "特色菜/风味小吃/家常菜";
//人均
var bustime = ui("do_Label_37");
bustime.text = "人均: "+"10-30元";
//营业时间
var popleprice = ui("do_Label_39");
popleprice.text = "营业时间: "+"10:00-22:00";
//地址
var address = ui("do_Label_40");
address.text = "锡市盟蒙中对面西100米胡同口";
//店铺详情
var shopdetail = ui("do_Label_47");
shopdetail.text = "    黄焖鸡米饭又叫香鸡煲，浓汁鸡煲饭，是鲁菜名吃，源自山东省济南市天桥区的汉族传统名吃，属于鲁菜系，始于济南名店 吉玲园。该小吃成后色香味美，口感鲜嫩透味不粘腻，香味浓郁。无论口感，视觉，色泽都属上品，令人回味无穷，百吃不厌。鸡肉选材鲜嫩三黄鸡鸡腿肉，做出的黄焖鸡嫩滑多汁，汁味和香味浸入鸡肉内部，色泽均匀。用土制砂锅烧制，砂锅内沸腾，香气直入鼻中，鸡块滚烫，色度与亮度呈现最佳状态。医学认为，鸡肉有温中益气、补虚填精、健脾胃、活血脉、强筋骨的功效。黄焖鸡中含有生姜辣椒等，更可有祛寒除湿的效果";
//评价
var pjcore = ui("do_Label_41");
var pjcount = ui("do_Label_43");
pjcore.text = "2.0分";
pjcount.text = "1525"+"条评价";
var pjbtn = ui("do_ALayout_38");
pjbtn.on("touch","",300,function(){
	anim.animbtn1(pjbtn);
	nf.alert("打开评价界面");
});
//评价图片
var pjstar = ui("do_ImageView_12");
pjstar.source = "source://image/star/star2.png";

//右(左按钮)
var rightl = ui("do_ALayout_27");
rightl.on("touch","",300,function(){
	anim.animbtn1(rightl);
	nf.alert("RightLeft");
});
//右(右按钮)
var rightr = ui("do_ALayout_28");
rightr.on("touch","",300,function(){
	anim.animbtn1(rightr);
	nf.alert("RightRight");
});
//打开地图
var maploaction = ui("do_ALayout_36");
maploaction.on("touch","",300,function(){
	anim.animbtn1(maploaction);
	nf.alert("打开地图界面");
});
//拨打商家电话
var phonenumber = "0479-8115522";
var busphone = ui("do_ALayout_37");
busphone.on("touch","",300,function(){
	anim.animbtn1(busphone);
	nf.confirm({text:phonenumber,title:"商家客服",button1text:"拨打",button2text:"取消"},function(datacall,e){
		if(datacall == 1){
			external.openDial(phonenumber);
		}
	});
});
//打开点单界面
var ordermenu = ui("do_Button_11");
ordermenu.on("touch","",300,function(){
	anim.animbtn1(ordermenu);
	nf.alert("在线点单");
});
//打开预订界面
var reservabtn = ui("do_Button_12");
reservabtn.on("touch","",300,function(){
	anim.animbtn1(reservabtn);
	nf.alert("预订");
});
//打开外卖
var takeawaybtn = ui("do_Button_13");
takeawaybtn.on("touch","",300,function(){
	anim.animbtn1(takeawaybtn);
	nf.alert("外卖");
});
//店内图
var shoppic = ui("do_ALayout_43");
shoppic.on("touch","",300,function(){
	nf.alert("Open Shop Pic UI");
});
//折扣
var zhekoutxt = ui("zhekoutxt");
zhekoutxt.text = "8.8折";

var zhekou = ui("zhekoubox");
zhekou.visible = true;
zhekou.on("touch","",300,function(){
	anim.animbtn1(zhekou);
	nf.alert("在线点单,预订(除酒水外)全部8.8折");
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
		imgviewbg.height = 600 -+ datas;
	}
	imgviewbg.redraw();
	//模拟浮动层
	fudong.y = 600-+datas;
	if(fudong.y <= 148){
		fudong.y = 148;
	}
	fudong.redraw();
	//头部透明度控制
	var getnum = Math.ceil(datas/10);
	var getendo = (getnum/2).toFixed(0);
	var getend = getnum-25;
	if(getend<2){
		headbg.bgColor = "FFFFFF00";
		headtxt.fontColor = "00000000";
		closebtn.bgColor = "FFFFFFAA";
		rightl.bgColor = "FFFFFFAA";
		rightr.bgColor = "FFFFFFAA";
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
		closebtn.bgColor = "FFFFFF00";
		rightl.bgColor = "FFFFFF00";
		rightr.bgColor = "FFFFFF00";
	}
});
