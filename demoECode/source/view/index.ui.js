//引入组件库
var do_Notification = sm("do_Notification");
var do_Global = sm("do_Global");
var do_App = sm("do_App");
var do_Page = sm("do_Page");


var do_ALayout_root=ui("do_ALayout_root");
var do_ALayout_main=ui("do_ALayout_main");
do_ALayout_main.add("pageTemplate1", "source://view/pageTemplate.ui");
do_ALayout_main.add("pageTemplate2", "source://view/pageTemplate.ui");
do_ALayout_main.add("pageTemplate3", "source://view/pageTemplate.ui");
var pageTemplate1=ui("pageTemplate1");
var pageTemplate2=ui("pageTemplate2");
var pageTemplate3=ui("pageTemplate3");

pageTemplate1.fire("setView", {title:"评价", image:"source://image/type/pj.png", view:"source://view/type/type1.ui"});
pageTemplate2.fire("setView", {title:"居室", image:"source://image/type/js.png", view:"source://view/type/type2.ui"});
pageTemplate3.fire("setView", {title:"体验", image:"source://image/type/ty.png", view:"source://view/type/type3.ui"});
var json_define=[
     {view:pageTemplate1},
     {view:pageTemplate2},
     {view:pageTemplate3}
 ];
var currentIndex=0;
var currentView=pageTemplate1;
var nextView=pageTemplate2;
pageTemplate3.visible=false;
currentView.y= 0;
//currentView.redraw();
nextView.y= 1332;
do_ALayout_main.redraw();

//当前页面下，订阅android系统返回键的事件：3秒内连续点击两次退出应用
var canBack = false;
var delay3 = mm("do_Timer");
delay3.delay = 3000;
delay3.on("tick", function(){
	delay3.stop();
  canBack = false;
}); 
do_Page.on("back", function(){
  if (canBack) {
  	do_Global.exit();
  } else {
  	do_Notification.toast("再次点击退出应用");
      canBack = true;
      delay3.start();
  }
});


var do_Animator1 = mm("do_Animator");
do_Animator1.append(500, {
	y: -1334,
	curve:"Linear"
});
var do_Animator2 = mm("do_Animator");
do_Animator2.append(500, {
	y: 0,
	curve:"Linear"
});

do_Page.on("NextPagemoveing", function(){
	currentView=json_define[currentIndex].view;
	currentIndex++;
	if (currentIndex>=json_define.length) currentIndex=0;
	nextView=json_define[currentIndex].view;
	
	for(var i=0;i<json_define.length;++i){
		if (json_define[i].view != currentView && json_define[i].view != nextView){
			json_define[i].view.visible=false;
		}
		else{
			json_define[i].view.visible=true;
		}
	}
	
	currentView.fire("closingBottom", "NextPagemove");
});
do_Page.on("NextPagemove", function(){
	nextView.fire("initMoving", "NextPagemoved");
	
});
do_Page.on("NextPagemoved", function(){
	currentView.y= 0;
	nextView.y= 1332;
	do_ALayout_main.y=0;
	do_ALayout_main.redraw();
	do_ALayout_main.animate(do_Animator1, function(){
		nextView.fire("opening");
	});
});



do_Page.on("PrePagemoveing", function(){
	currentView=json_define[currentIndex].view;
	currentIndex--;
	if (currentIndex<0) currentIndex=json_define.length -1;
	nextView=json_define[currentIndex].view;
		
	currentView.fire("closingHead", "PrePagemove");
});
do_Page.on("PrePagemove", function(){
	nextView.fire("initMoving", "PrePagemoved");	
});
do_Page.on("PrePagemoved", function(){
	for(var i=0;i<json_define.length;++i){
		if (json_define[i].view != currentView && json_define[i].view != nextView){
			json_define[i].view.visible=false;
		}
		else{
			json_define[i].view.visible=true;
		}
	}
	currentView.y= 1332;
	nextView.y= 0;
	do_ALayout_main.y=-1334;
	do_ALayout_main.redraw();
	do_ALayout_main.animate(do_Animator2, function(){
		nextView.fire("opening");
	});
});