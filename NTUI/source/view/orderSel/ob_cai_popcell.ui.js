var page = sm("do_Page");
var app = sm("do_App");
var open = require("open");
var nf = sm("do_Notification");
var root = ui("$");
var anim = require("anim");

//遮罩显示
var animMaskShow = mm("do_Animator");
var propsMS = {bgColor:"000000AA"};
animMaskShow.append(400,propsMS,"EaseOut");
//遮罩隐藏
var animMaskHide = mm("do_Animator");
var propsMH = {bgColor:"00000000"};
animMaskHide.append(300,propsMH,"EaseIn");

//面板显示
var animPanelShow = mm("do_Animator");
var propsPS = {y:200};
animPanelShow.append(400,propsPS,"EaseOut");
//面板隐藏
var animPanelHide = mm("do_Animator");
var propsPH = {y:1334};
animPanelHide.append(300,propsPH,"EaseIn");

var imgs = ui("do_ImageView_1");
//遮罩事件--
var bgmask = ui("bugmask");
var closebs = ui("do_ALayout_closebs");
closebs.on("touch","",300,function(){
	//anim.animbtn1(closebs);
	closebs.visible = false;
	bgmask.animate(animMaskHide);
	bgs.animate(animPanelHide,function(){
		bgmask.visible = false;
		imgs.source = "source://image/defult_food.png";
	});
});
var title = ui("do_Label_1");
var price = ui("do_Label_2");
var xiaol = ui("do_Label_3");
var detail = ui("do_Label_4");
root.on("caipops",function(data){
	bgmask.visible = true;
	
	imgs.source = data.path;
	title.text = data.title;
	price.text = data.price;
	xiaol.text = data.sales;
	detail.text = data.details;
	bgmask.animate(animMaskShow);
	bgs.animate(animPanelShow,function(){
		closebs.visible = true;
	});
});

var bgs = ui("do_ALayout_bk");
bgs.on("touch","",300,function(){
	//防止穿透底层事件
});
bgmask.on("touch","",300,function(){
	//防止穿透底层事件
});
