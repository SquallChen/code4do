/**
 * New DeviceOne File
 */
var deviceone = require("deviceone");
var root = deviceone.ui("$");
var page = deviceone.sm("do_Page");
var app = deviceone.sm("do_App");
var nf = deviceone.sm("do_Notification");
/**
 * topbar头部 0.文字内容 1.文字颜色 2.背景色(含状态栏) 3.头部背景色 4.底部线颜色
 */
//var topBarStyle = deviceone.ui("topbar");
//module.exports.topBarTitle = function(property,path){
//	var path = "source://view/header/header_title.ui";
//	var topBar = deviceone.ui(root.add("topbar",path,0,0));
//	var topBarData = deviceone.mm("do_HashData");
//	topBar.bindData(topBarData);
//	topBarData.addData(property);
//	topBar.refreshData();
//	var types;
//	var a="000";
//	var b="111";
//	if(types == 0){
//		nf.alert(a);
//		return a;
//	}else{
//		nf.alert(b);
//		return b;
//	}
//}