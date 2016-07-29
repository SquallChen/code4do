var root = ui("$");
var page = sm("do_Page");
var nf = sm("do_Notification");
//root.setMapping({
//	"do_Label_1.text":"biaoqian"
//});
//var slide02 = ui("do_Label_1");
//root.on("dataRefreshed",function(data){
//	nf.toast(slide02.text);
//});
var slide02 = ui("do_Label_1");
page.on("slide02",function(data){
	slide02.text = data;
})