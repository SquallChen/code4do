var root = ui("$");
var nf = sm("do_Notification");
var anim = require("anim");
var maskbg = ui("do_ALayout_1");
var alyoutbg = ui("keyboradbg");
var clearbtn = ui("do_Button_clear");

for(var i=0;i<11;i++){
	var keybtn = ui("do_Button_"+i);
	keybtn.on("touch",function(){
		anim.animbtn(this);
		root.fire("numberkeyfire",this.text);
	})
}


var btnsure = ui("do_Button_sure");
root.on("numberkey",function(data){
	btnsure.text = data.surebtn;//sure按钮文字
	maskbg.visible = data.visible;//遮罩显示隐藏
	
	anim.animBKN(maskbg,{bgColor:"00000055"},260,"EaseOut");//遮罩动画
	anim.animBK(alyoutbg,{y:694},260,"EaseOut",function(){
		clearbtn.visible = true;
	});
});

var btnsure = ui("do_Button_sure");
btnsure.on("touch","",300,function(){
	anim.animbtn(btnsure);
	clearbtn.visible = false;
	anim.animBK(maskbg,{bgColor:"00000000"},260,"EaseOut",function(){
		maskbg.visible = false;
	});//遮罩动画
	anim.animBKN(alyoutbg,{y:1334},260,"EaseOut");
	root.fire("numberkeyfires",btnsure.text);
});
maskbg.on("touch",function(){})
clearbtn.on("touch","",300,function(){
	anim.animbtn1(clearbtn);
	root.fire("numberkeyfires",clearbtn.text);
});