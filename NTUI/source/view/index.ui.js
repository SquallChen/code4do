/**
 * @Author : 79364243@qq.com
 * @Timestamp : 2016-05-22
 */
var rootview = ui("$");
var nf = sm("do_Notification");
var page = sm("do_Page");
var app = sm("do_App");
var open = require("open");

page.on("back", function(){
	app.closePage();
});

var imgbox = ui("imgbox");//
var imganim= mm("do_Animator");
var imgprop = {x:320,alpha:0};
var imgprop1 = {x:285,alpha:1};
imganim.append(800, imgprop, "EaseOut");
imganim.append(400, imgprop1, "EaseOut");

page.on("loaded",function(){
	imgbox.animate(imganim);
});

//列表数据
//var storage = sm("do_Storage");
var initdata = sm("do_InitData");
var dataComponent = mm("do_ListData");
var listviewComponent = ui("do_ListView_1");
listviewComponent.bindItems(dataComponent);

var tabcon = ui("tabcon");
/**
 * tab3
 */
var tabpos = 0;
var tabtxt = ["组件示例","组合组件","UI模板"];
var tabfire = [tabpos,tabtxt];

var tabstSpec = tabcon.add("SpecTab","source://view/specialUI/TabMove.ui",0,5);
var tabstSpecT = ui("SpecTab");
var datetp;
tabstSpecT.on("tabSpeF",function(datatab){
	dataComponent.removeAll();
	initdata.readFile("initdata://componentList"+datatab+".json",function(data){
		dataComponent.addData(data);
		deviceone.print(datatab);
		listviewComponent.refreshItems();
	});
});
tabstSpecT.fire("tabSpe",tabfire);

page.on("result",function(data){
	//nf.toast(data);
});

listviewComponent.on("touch",function(index){
	var cell = dataComponent.getOne(index);
	var paths = cell.path;
	open.startb(paths,"push_r2l_1");
});




