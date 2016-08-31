var do_ListView=ui("do_ListView");
var do_ListData = mm("do_ListData");
var do_Page=sm("do_Page");
var do_Notification = sm("do_Notification");
var data = [
             {"title":"首页","fontColor":"#000000FF"},
             {"title":"客服热线","fontColor":"#000000FF"},
             {"title":"用户反馈","fontColor":"#000000FF"},
             {"title":"软件设置","fontColor":"#000000FF"}
		];

do_ListData.addData(data);
do_ListView.bindItems(do_ListData);
do_ListView.refreshItems();

do_ListView.on("touch",function(index){
	var data_one = do_ListData.getOne(index)
	var title = data_one.title
    for (var i = 0 ; i <data.length ; i++ ){
    	if(index == i){
    		data[i].fontColor = "0080FFFF"
    	} else {
    		data[i].fontColor = "000000FF"
    	}
    }
    do_ListData.removeAll();
    do_ListData.addData(data);
	do_ListView.refreshItems();
	do_Page.fire("reset")
	do_Page.fire("pass_title",{data:title})
})