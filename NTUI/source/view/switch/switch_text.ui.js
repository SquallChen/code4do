var page = sm("do_Page");
var root = ui("$");
var nf = sm("do_Notification");

//switch切换开关
var swbox = ui("switch_box");
var swbg = ui("switch_bg");
var swbtn = ui("switch_btn");

root.on("switchzt",function(data){
	deviceone.off = data[1];
	deviceone.on = data[2];
	swbox.tag = data[0];
	root.fire("switchtag",swbox.tag);//fire
	if(swbox.tag==0){
		swbtn.text = data[1];
		swbtn.x = -5; 
		swbtn.fontColor = "888888ff";
		swbg.bgColor = "E0E0E0FF";
	}else{
		swbtn.text = data[2];
		swbtn.x =50;
		swbtn.fontColor = "4CD964ff";
		swbg.bgColor = "4CD964ff";
	}
	swbtn.width = 100;
	swbtn.height = 100;
	swbtn.y = -1;
	swbtn.redraw();
});

//按下事件
swbox.on("touch",function(){
	//animateyes open位置
	var animyes= mm("do_Animator");
	var propsyes1 = {x:58};
	var propsyes2 = {x:50};
	animyes.append(200, propsyes1, "EaseIn");
	animyes.append(100, propsyes2, "EaseOut");
	//animateyes close位置
	var animno= mm("do_Animator");
	var propsno = {x:-5};
	animno.append(200, propsno, "EaseIn");
	//animategreen 绿色
	var animcoloryes= mm("do_Animator");
	var propscoloryes = {bgColor:"4CD964ff"};
	animcoloryes.append(200, propscoloryes, "EaseIn");
	//animategray 灰色
	var animcolorno = mm("do_Animator");
	var propscolorno = {bgColor:"E0E0E0FF"};
	animcolorno.append(200, propscolorno, "EaseIn");
	
	if(swbg.bgColor == "E0E0E0FF"){
		swbox.tag = 1;
		swbtn.animate(animyes,function(){
			swbtn.text = deviceone.on;
		});
		swbg.animate(animcoloryes,function(){
			swbtn.fontColor = "4CD964ff";
			swbg.bgColor = "4CD964ff";
		});
	}else{
		swbox.tag = 0;
		swbtn.animate(animno,function(){
			swbtn.text = deviceone.off;
		});
		swbg.animate(animcolorno,function(){
			swbtn.fontColor = "888888ff";
			swbg.bgColor = "E0E0E0FF";
		});
	}
	root.fire("switchtag",swbox.tag);
});