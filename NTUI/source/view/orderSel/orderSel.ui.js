//related to header_index.ui
var rootview = ui("$");
var nf = sm("do_Notification");
var page = sm("do_Page");
var app = sm("do_App");
var anim = require("anim");
var external = sm("do_External");

var slideView = ui("do_SlideView_1");
var headbg = ui("do_ALayout_23");
var headtxt = ui("do_Label_33");
var fudong = ui("do_ALayout_29");
var topbgs = ui("do_ALayout_1");
var psfbox = ui("do_ALayout_44");
var psf = ui("do_Label_51");

var closebtn = ui("do_ALayout_25");
closebtn.on("touch","",300,function(){
	anim.animbtn1(closebtn);
	app.closePage();
});
page.on("back","",300,function(){
	app.closePage();
});

//配送方
var psftxt = 1;
if(psftxt==0){
	psfbox.visible = true;
	psfbox.bgColor = "FF0080DD";
	psf.text = "纳豆专送";
}else{
	psfbox.visible = true;
	psfbox.bgColor = "17A3FFFF";
	psf.text = "商家配送";
}
//店铺名称
var bustext = "「黄焖鸡米饭」";
headtxt.text = bustext;
//about away
var caixi = ui("do_Label_36");
caixi.text = "起送价¥20 | 配送费¥2";

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

var imgviewbg = ui("do_ImageView_1");

//slide
page.on("loaded",function(){
	slideView.index = 0;
	//nf.toast(slideView.index);
});

/**
 * tabSA
 */
var tabpos=0;
var tabtxt = ["点餐","评价","商家"];
var tabfire = [tabpos,tabtxt];

var tabstSpec = fudong.add("SpecTabA","source://view/tabs/tab_slide.ui",0,1);
var tabstSpecT = ui("SpecTabA");


var listData = mm("do_ListData");
listData.addData([ {"template" : 0,"token":"slide01"}, {"template" : 1}, {"template" : 2} ]);
slideView.bindItems(listData);
slideView.refreshItems();
tabstSpecT.on("tabSpeFA",function(datatab){
	var index = parseInt(datatab);
	slideView.index = index;
	if(index==1){
		page.fire("slide02","评价界面");
	}else if(index==2){
		page.fire("slide03","商家界面");
	}
	//nf.toast(datas.biaoqian);
});
tabstSpecT.fire("tabSpeA",tabfire);
slideView.on("indexChanged", function(data, e) {
	var index = parseInt(data);
	tabpos = index;
	tabfire = [tabpos,tabtxt];
	tabstSpecT.fire("tabSpeA",tabfire);
});

//显示详情大图
var bigImg = rootview.add("imgBig","source://view/orderSel/ob_cai_popcell.ui",0,0);
var bigImgRo = ui("imgBig");
page.on("imgShow",function(data){
	bigImgRo.fire("caipops",data);
});

