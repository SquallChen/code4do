var do_Global=sm("do_Global");
var do_App=sm("do_App");
var do_Page=sm("do_Page");
var do_Notification = sm("do_Notification");
var do_Storage = sm("do_Storage");
var do_Global = sm("do_Global")

var do_SlideView = ui("do_SlideView")
var do_ListData = mm("do_ListData")

var reader_data = []
reader_data.push({template: 0})
reader_data.push({template: 1})
reader_data.push({template: 2})

do_ListData.addData(reader_data)
do_SlideView.bindItems(do_ListData)
do_SlideView.refreshItems();

do_SlideView.on("indexChanged",function(){
	do_Page.fire("hide");
	var change_flg = do_Global.getMemory("change")
	if(change_flg == "1"){
		do_Page.fire("change_model_sun1")
	}
	if(change_flg == "2"){
		do_Page.fire("change_model_night1")
	}
	if(change_flg == "3"){
		do_Page.fire("change_model_sun")
	}
	if(change_flg == "4"){
		do_Page.fire("change_model_night")
	}
	if(change_flg == "5"){
		do_Page.fire("change_size_add1")
	}
	if(change_flg == "6"){
		do_Page.fire("change_size_del")
	}
	if(change_flg == "7"){
		do_Page.fire("change_size_add")
	}
	if(change_flg == "8"){
		do_Page.fire("change_size_del1")
	}
})
