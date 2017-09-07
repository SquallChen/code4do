/**
 * @Author : and
 * @Timestamp : 2017-09-06
 */
var storage = sm("do_Storage");
var listdata = mm("do_ListData");
var listview = ui("listview");
var json_path = "initdata://catalog.json";// 本地缓存的数据
var initdata = sm("do_InitData");

if (initdata.fileExist(json_path)) {
	initdata.readFile(json_path, function(data, e) {
		// deviceone.print(JSON.stringify(data));
		listdata.addData(data);
		listview.bindItems(listdata);
		listview.refreshItems();
	});
}

listview.on("touch",function(row){
	var algData = listdata.getRange(0)[row];
	sm("do_App").openPage("source://view/presentation/index.ui",algData);
});