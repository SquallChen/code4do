//related to badgeround.ui
var root = ui("$");
var anim = require("anim");
var page = sm("do_Page");
var bgmask = ui("maskbg");//遮罩
var closebg = ui("do_ALayout_8");
var btn1 = ui("do_Button_1"),btn2 = ui("do_Button_2"),btn3 = ui("do_Button_3"),btn4 = ui("do_Button_4");
var btns = [btn1,btn2,btn3,btn4];
//自定义事件---打开
root.on("indexpopfire",function(data){
	bgmask.visible = data.visible;
	anim.animBK(bgmask,{bgColor:"000000CC"},300,"EaseOut",function(){
		closebg.visible = true;
	});
	for(var i=0;i<btns.length;i++){
		anim.animBKN(btns[i],{y:1150-(180*(i+1)),alpha:1},300,"EaseOut");
	}
});
//遮罩事件
var bgmask = ui("maskbg");
bgmask.on("touch","",300,function(){
	
});
//close
closebg.on("touch","",300,function(){
	closebg.visible = false;
	anim.animbtn(closebg);
	anim.animBK(bgmask,{bgColor:"00000000"},300,"EaseOut",function(){
		bgmask.visible = false;
	});
	for(var i=0;i<btns.length;i++){
		anim.animBKN(btns[i],{y:1334,alpha:0},300,"EaseOut");
	}
	
});

var btntouch = function(index){
	anim.animBK(bgmask,{bgColor:"00000000"},300,"EaseOut",function(){
		bgmask.visible = false;
	});
	for(i=0;i<btns.length;i++){
		anim.animBKN(btns[i],{y:1334,alpha:0},300,"EaseOut");
	}
};
btns.forEach(function(dc,i){
	dc.on("touch", function(datac, e) {
		closebg.visible = false;
		btntouch(i);
		anim.animBK2(btns[i],{alpha:0.2},{alpha:1},100,200,"EaseOut",function(){
			root.fire("indexpopon",btns[i].tag);
		});
		
	});
});
