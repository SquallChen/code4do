/**********************************************
 * Author : @Author
 * Timestamp : @Timestamp
 **********************************************/
var nf = sm("do_Notification");
var page = sm("do_Page");
var app = sm("do_App");
var storage = sm("do_Storage");

//返回按钮事件
var leftclose = ui("do_ALayout_close");
leftclose.on("touch",function(){
	app.closePage();
});
//物理键返回事件
page.on("back", function(){
	app.closePage();
});

//组件列表
var dataComponent = mm("do_ListData");
var listviewComponent = ui("do_ListView_component");

listviewComponent.bindItems(dataComponent);

storage.readFile("data://componentList.json",function(data){
	dataComponent.addData(data);
	listviewComponent.refreshItems();
});

listviewComponent.on("touch",function(index){
	var cell = dataComponent.getOne(index);
	var paths = cell.path;
	app.openPage({
		source : paths,
		animationType : "slide_r2l_1",
    	statusBarState : "transparent",
    	statusBarFgColor : "black"
	});
});

page.on("result",function(data){
	//nf.alert(data);
});