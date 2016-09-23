//related to header_title.ui
var page = sm("do_Page");
var app = sm("do_App");
var nf = sm("do_Notification");
var root = ui("$");
var others = require("others");
var anim = require("anim");
//动画
var animclose = mm("do_Animator");
var propsclose = {alpha:0.2};
animclose.append(200, propsclose);

var hdbox = ui("header_box");
var closebtn = ui("do_ALayout_close");
var closeImg = ui("do_ImageView_1");
var rrImg = ui("rightright_img");
var rlImg = ui("rightleft_img");
var rightleft = ui("rightleft");
var rightright = ui("rightright");
var hdtitle = ui("header_title");
root.on("headeralpha",function(data){
	
	//开启关闭手势关闭page
	others.handClose(data.hback.hdclose,data.hback.hddata);
	//图片路径
	rrImg.source = data.rimg.rrimg;
	rlImg.source = data.rimg.rlimg;
	
	//标题文字
	hdtitle.text = data.title;
	//显示标header类型
	switch(parseInt(data.type)){
	case 0:
		//
		break;
	case 1:
		closebtn.visible = true;
		break;
	case 2:
		closebtn.visible = true;
		rightright.visible = true;
		break;
	case 3:
		closebtn.visible = true;
		rightright.visible = true;
		rightleft.visible = true;
		hdtitle.width = 350;
		hdtitle.x = 200;
		hdtitle.redraw();
		break;
	}
});

var hdbg = ui("header_bg");
hdbg.on("touch",function(){
	//防止穿透
});
var rightl = ui("rightleft");
var rightr = ui("rightright");
rightl.on("touch","",300,function(){
	anim.animbtn(rightl);
	root.fire("headalphafire","rl");
});
rightr.on("touch","",300,function(){
	anim.animbtn(rightr);
	root.fire("headalphafire","rr");
});
//close事件
closebtn.on("touch","",300,function(){
	root.fire("headalphafire","close");
});
//back事件
page.on("back","",300,function(){
	root.fire("headalphafire","back");
});