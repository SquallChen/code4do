//related to header_index.ui
var rootview = ui("$");
var storage = sm("do_Storage");
var initdata = sm("do_InitData");
var nf = sm("do_Notification");
var page = sm("do_Page");
var app = sm("do_App");
var anim = require("anim");

var closebtn = ui("do_ALayout_25");
closebtn.on("touch","",300,function(){
	app.closePage();
});
page.on("back","",300,function(){
	app.closePage();
});
//first
var datafirst = mm("do_ListData");
var listviewfirst = ui("do_GridView_3");
listviewfirst.bindItems(datafirst);
initdata.readFile("initdata://homefirst.json",function(data){
	datafirst.addData(data);
	listviewfirst.refreshItems();
});
//推荐
var dataComponent = mm("do_ListData");
var listviewComponent = ui("do_GridView_1");
listviewComponent.bindItems(dataComponent);
initdata.readFile("initdata://homeTj.json",function(data){
	dataComponent.addData(data);
	listviewComponent.refreshItems();
});
//最新
var datanew = mm("do_ListData");
var listviewnew = ui("do_GridView_2");
listviewnew.bindItems(datanew);
initdata.readFile("initdata://homeNew.json",function(data){
	datanew.addData(data);
	listviewnew.refreshItems();
});

