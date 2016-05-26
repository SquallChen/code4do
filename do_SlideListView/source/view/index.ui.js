//related to index.ui
var storage = sm("do_Storage");
var listdata = mm("do_ListData");
var listview = ui("listview");

///返回按钮
var page = sm("do_Page");
var close = ui("close");
var app = sm("do_App");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})
// //
page.on("removeCell", function(data) {
	var alldata = listdata.getRange(0);
	for(var i = 0;i<alldata.length;i++){
		if(alldata[i].id==data){
			listdata.removeData([i]);
			listview.refreshItems();
			break;
		}
	}
})
var json_path = "initdata://chat.json";// 本地缓存的数据
var initdata = sm("do_InitData");
if (initdata.fileExist(json_path)) {
	initdata.readFile(json_path, function(data, e) {
		// deviceone.print(JSON.stringify(data));
		listdata.addData(data);
		listview.bindItems(listdata);
		listview.refreshItems();
	})
}

