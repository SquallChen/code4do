/*******************************************************************************
 * Author :and TimeStamp :2015-10-26
 ******************************************************************************/
var nf = sm("do_Notification");
// //
var page = sm("do_Page");
var close = ui("close");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})
// //

var listview = ui("listview");
var listdata = mm("do_ListData");

listdata.addData([ {
	"index" : "1",
	"name" : "测试Http的GET"
}, {
	"index" : "2",
	"name" : "测试Http的POST"
} ]);
listview.bindItems(listdata);

var app = sm("do_App");
var datacache = sm("do_DataCache");

var ip_field = ui("do_TextField_1");
var host = datacache.loadData("host");
if (host)
	ip_field.text = host;

listview.on("touch", function(index) {
	switch (index) {
	case 0:
		app.openPage({
			source : "source://view/get/index.ui",
			data : gethost(),
			statusBarState : "transparent"
		});
		break;
	case 1:

		break;
	case 2:
		break;
	case 3:

		break;
	}
});

function gethost() {
	var host = ip_field.text;
	datacache.saveData("host", host);
	return host;
}