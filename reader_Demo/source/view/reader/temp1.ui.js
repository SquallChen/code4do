var do_Global=sm("do_Global");
var do_App=sm("do_App");
var do_Page=sm("do_Page");
var do_Notification = sm("do_Notification");
var do_Storage = sm("do_Storage");
var do_InitData = sm("do_InitData")
var do_ALayout_root = ui("do_ALayout_root")
var rootview = ui("$");
var do_ALayout_root = ui("do_ALayout_root")

var do_ListView = ui("do_ListView")
var do_ListData = mm("do_ListData")
do_ListView.bindItems(do_ListData)

do_ALayout_root.add("reader_setting", "source://view/reader/setting.ui", 0, 0);
var reader_setting=ui("reader_setting");

var reader_Data = []
rootview.setMapping({
    "tag": "flg"   
});

var page = rootview.tag

rootview.on("dataRefreshed", function(){
	page = rootview.tag
	var reader_flg = do_Global.getMemory("reader_flg")
	//刚进页面调用
	if(reader_flg == ""){
		binddata("#D2D9D2FF","#000000FF","25")
	}
})

function binddata(bgcolor,fontcolor,fontsize){
	do_InitData.readFile("initdata://mock/reader.txt", function(data, e) {
		reader_Data = [];
		_text = data.substring((page-1)*1200,page*1200);
	    reader_Data = [{text:_text,bgcolor:bgcolor,fontcolor:fontcolor,fontsize:fontsize}]
		do_ListData.removeAll();
		do_ListData.addData(reader_Data);
		do_ListView.refreshItems();
	})
}

//设置黑夜放大模式
do_Page.on("change_size_add",function(data){
		binddata("#000000FF","#FFFFFFFF","35")
})
//设置白天模式放大
do_Page.on("change_size_add1",function(data){
		binddata("#D2D9D2FF","#000000FF","35")
})
//设置白天模式缩小
do_Page.on("change_size_del",function(data){
		binddata("#D2D9D2FF","#000000FF","25")
})
//设置黑夜模式缩小
do_Page.on("change_size_del1",function(data){
		binddata("#000000FF","#FFFFFFFF","25")
})
//设置放大模式黑夜
do_Page.on("change_model_sun",function(data){
		binddata("#000000FF","#FFFFFFFF","35")
})
//设置减小模式黑夜
do_Page.on("change_model_sun1",function(data){
		binddata("#000000FF","#FFFFFFFF","25")
})
//设置放大模式白天
do_Page.on("change_model_night",function(data){
		binddata("#D2D9D2FF","#000000FF","35")
})
//设置减小模式白天
do_Page.on("change_model_night1",function(data){
		binddata("#D2D9D2FF","#000000FF","25")
})






