var app, page, nf;
nf = sm("do_Notification");
app = sm("do_App");
page = sm("do_Page");

ui("action_back").on("touch", function(data, e) {
	app.closePage();
});

/** ***************************************************************************************** */

var listview, listdata;

listview = ui("do_listview_1");
listdata = mm("do_ListData");
listview.bindItems(listdata);

listdata.addData([ {
	visible : false,
	sex : "男"
}, {
	visible : false,
	sex : "女"
}, {
	visible : true,
	sex : "不详"
} ]);

listview.refreshItems();

listview.on("touch", function(index) {
	for (var i = 0; i < listdata.getCount(); i++) {
		var d = listdata.getOne(i);
		if (index == i)
			d.visible = true;
		else
			d.visible = false;
		listdata.updateOne(i, d)
	}
	listview.refreshItems();
});
