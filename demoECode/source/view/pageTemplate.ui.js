//引入组件库
var do_Notification = sm("do_Notification");
var do_Global = sm("do_Global");
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_Audio=sm("do_Audio");

var do_ALayout_root=ui("do_ALayout_root");
var do_ALayout_body=ui("do_ALayout_body");
var do_ALayout_head=ui("do_ALayout_head");
var do_ALayout_bottom=ui("do_ALayout_bottom");
var do_GestureView_head=ui("do_GestureView_head");
var do_GestureView_bottom=ui("do_GestureView_bottom");
var do_Label_title=ui("do_Label_title");
var do_ImageView_index=ui("do_ImageView_index");

do_GestureView_head.on("fling", function(data){
	//deviceone.print(JSON.stringify(data));
	if (data.velocityY > 0){
		do_Page.fire("PrePagemoveing");
	}
	if (data.velocityY < 0){
		do_Page.fire("NextPagemoveing");
	}
});
do_GestureView_bottom.on("fling", function(data){
	
	if (data.velocityY > 0){
		do_Page.fire("PrePagemoveing");
	}
	if (data.velocityY < 0){
		do_Page.fire("NextPagemoveing");
	}
});

do_ALayout_root.on("setView", function(data){
	do_ImageView_index.source=data.image;
	do_Label_title.text= data.title;
	do_ALayout_body.add("bodyView", data.view);
});

var do_Animator_head_1 = mm("do_Animator");
do_Animator_head_1.append(500, {
	y: -380,
	curve:"Linear"
});
var do_Animator_head_2 = mm("do_Animator");
do_Animator_head_2.append(500, {
	y: 0,
	curve:"Linear"
});
var do_Animator_bottom_1 = mm("do_Animator");
do_Animator_bottom_1.append(500, {
	y: 734,
	curve:"Linear"
});


do_ALayout_root.on("initMoving", function(data){	
	do_ALayout_head.y=0;
	do_ALayout_bottom.y=1134;
	do_ALayout_bottom.redraw();
	
	do_Page.fire(data);
	do_Audio.play("source://res/yaoyao.mp3");
	
	
});
do_Audio.on("playFinished", function(data) {
	do_Audio.stop();
});
do_ALayout_root.on("opening", function(){
	do_ALayout_head.animate(do_Animator_head_1);			
});

do_ALayout_root.on("closingHead", function(data){
	do_ALayout_head.animate(do_Animator_head_2, function(){
		do_Page.fire(data);
	});			
});
do_ALayout_root.on("closingBottom", function(data){
	do_ALayout_bottom.animate(do_Animator_bottom_1, function(){
		do_Page.fire(data);
	});			
});
