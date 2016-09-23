var rootview = ui("$");
var cache = sm("do_CacheManager");
var storage = sm("do_Storage");
var external = sm("do_External");
var nf = sm("do_Notification");
var page = sm("do_Page");
var app = sm("do_App");
var anim = require("anim");
var open = require("open");

var phonenumber = ui("do_Label_6");//电话号码
//添加头部到当前UI
var headerTitle = rootview.add("titleHeader","source://view/tempalte/header/header_title.ui",0,0);
var headerTitleStyle = ui("titleHeader");

//var type={type:2};	//一.标题样式(显示标题类型)
//var title = {title:"选择城市"}; 	//二.标题
var btnImg = {rrimg:"",rlimg:""};//四.0.rightrightImg 1.rightleftImg
var handback = {hdclose:1,hddata:"手势关闭page传递"}; //五.是否开启IOS手势关闭page  0.不开启 1.开启   | data
//0.显示按钮(0:文字,1:关闭按钮,2:关闭+文字+右边,3.关闭+文字+右边x2)
//1.标题文字内容
//2.closePage事件参数
//3.图片路径
//var condata=[hdtype,hdtitle,closeEvent,btnImg,handback];
var condata={type:2,title:"设置",rimg:btnImg,hback:handback}

headerTitleStyle.on("headfire",function(data){
	if(data=="close"){
		app.closePage();
	}else if(data=="back"){
		app.closePage();
	}
});
headerTitleStyle.fire("headertitle",condata);

//获取图片缓存
var cachelabel = ui("do_Label_2");
cache.getImageCacheSize(function(data) {
	cachelabel.text = parseInt(data)+"KB";
	if(data==0){
		clearCache.enabled = false;
	}else {
		clearCache.enabled = true;
		if(data>=1024){
			cachelabel.text = (data/1024).toFixed(2)+"MB";
		}
	}
});
//清空缓存
var clearCache = ui("do_ALayout_1");
clearCache.on("touch","",300,function(){
	anim.animbtn(clearCache);
	nf.confirm({text:"是否清空缓存?",title:"操作提示",button1text:"确定",button2text:"取消"},function(datacall,e){
		if(datacall == 1){
			cache.clearImageCache(function(data) {
				if(data=="true"||data=="1"){
					cachelabel.text = "0KB";
					clearCache.enabled = false;
				}
			});
		}
	});
});

//拨打客服电话
var kfphone = ui("do_ALayout_4");
kfphone.on("touch","",300,function(){
	anim.animbtn(kfphone);
	nf.confirm({text:"拨打电话:"+phonenumber.text,title:"提示",button1text:"拨打",button2text:"取消"},function(datacall,e){
		if(datacall == 1){
			external.openDial(phonenumber.text);
		}
	});
});