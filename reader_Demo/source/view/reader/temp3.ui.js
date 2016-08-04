var do_Global=sm("do_Global");
var do_App=sm("do_App");
var do_Page=sm("do_Page");
var do_Notification = sm("do_Notification");
var rootview = ui("$");
var do_Storage = sm("do_Storage");
var do_InitData = sm("do_InitData")
var do_ALayout_root = ui("do_ALayout_root")

var do_ListView_2 = ui("do_ListView_2")
var do_ListData = mm("do_ListData")
do_ListView_2.bindItems(do_ListData)

do_ALayout_root.add("reader_setting", "source://view/reader/setting.ui", 0, 0);
var reader_setting=ui("reader_setting");

var reader_Data = []
do_InitData.readFile("initdata://mock/reader2.txt", function(data, e) {
    reader_Data = [{text:data,bgcolor:"#D2D9D2FF",fontcolor:"#000000FF",fontsize:"25"}]
	do_ListData.addData(reader_Data)
	do_ListView_2.refreshItems();
})

do_Page.on("change_size_add",function(data){
	do_ListData.removeAll();
	do_InitData.readFile("initdata://mock/reader2.txt", function(data, e) {
	    reader_Data = [{text:data,bgcolor:"#000000FF",fontcolor:"#FFFFFFFF",fontsize:"35"}]
		do_ListData.addData(reader_Data)
		do_ListView_2.refreshItems();
	})
})

do_Page.on("change_size_add1",function(data){
	do_ListData.removeAll();
	do_InitData.readFile("initdata://mock/reader2.txt", function(data, e) {
	    reader_Data = [{text:data,bgcolor:"#D2D9D2FF",fontcolor:"#000000FF",fontsize:"35"}]
		do_ListData.addData(reader_Data)
		do_ListView_2.refreshItems();
	})
})

do_Page.on("change_size_del",function(data){
	do_ListData.removeAll();
	do_InitData.readFile("initdata://mock/reader2.txt", function(data, e) {
	    reader_Data = [{text:data,bgcolor:"#D2D9D2FF",fontcolor:"#000000FF",fontsize:"25"}]
		do_ListData.addData(reader_Data)
		do_ListView_2.refreshItems();
	})
})

do_Page.on("change_size_del1",function(data){
	do_ListData.removeAll();
	do_ListView_2.bgColor = "#000000FF"
	do_InitData.readFile("initdata://mock/reader2.txt", function(data, e) {
	    reader_Data = [{text:data,bgcolor:"#000000FF",fontcolor:"#FFFFFFFF",fontsize:"25"}]
		do_ListData.addData(reader_Data)
		do_ListView_2.refreshItems();
	})
})


do_Page.on("change_model_sun",function(data){
	do_ListData.removeAll();
	do_InitData.readFile("initdata://mock/reader2.txt", function(data, e) {
	    reader_Data = [{text:data,bgcolor:"#000000FF",fontcolor:"#FFFFFFFF",fontsize:"35"}]
		do_ListData.addData(reader_Data)
		do_ListView_2.refreshItems();
	})
})

do_Page.on("change_model_sun1",function(data){
	do_ListData.removeAll();
	do_InitData.readFile("initdata://mock/reader2.txt", function(data, e) {
	    reader_Data = [{text:data,bgcolor:"#000000FF",fontcolor:"#FFFFFFFF",fontsize:"28"}]
		do_ListData.addData(reader_Data)
		do_ListView_2.refreshItems();
	})
})

do_Page.on("change_model_night",function(data){
	do_ListData.removeAll();
	do_InitData.readFile("initdata://mock/reader2.txt", function(data, e) {
	    reader_Data = [{text:data,bgcolor:"#D2D9D2FF",fontcolor:"#000000FF",fontsize:"35"}]
		do_ListData.addData(reader_Data)
		do_ListView_2.refreshItems();
	})
})

do_Page.on("change_model_night1",function(data){
	do_ListData.removeAll();
	do_InitData.readFile("initdata://mock/reader2.txt", function(data, e) {
	    reader_Data = [{text:data,bgcolor:"#D2D9D2FF",fontcolor:"#000000FF",fontsize:"28"}]
		do_ListData.addData(reader_Data)
		do_ListView_2.refreshItems();
	})
})