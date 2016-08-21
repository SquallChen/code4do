/**
 * @Author : and
 * @Timestamp : 2016-08-20
 */
var nf = sm("do_Notification");
var page = sm("do_Page");
var close = ui("close");
var app = sm("do_App");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})

var main = ui("do_ALayout_5");
var data = page.getData()["allCourseList"];

var y = 0;
page.on("loaded",function(){
	addday(data[2]);
	addday(data[3]);
	addday(data[4]);
	addday(data[5]);
	addday(data[6]);
})
function addday(d){
	var added = ui(main.add("id"+y,"source://view/day.ui", 0, y));
	y = y + 400;
	var hashdata = mm("do_HashData");
	added.bindData(hashdata);
	hashdata.addData(d);
	added.refreshData();
}
addday(data[0]);
addday(data[1]);