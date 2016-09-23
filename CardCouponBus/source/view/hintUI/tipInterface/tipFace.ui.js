//related to tipFace.ui
var page = sm("do_Page");
var nf = sm("do_Notification");
var root = ui("$");

var title = ui("do_Label_1");
root.on("facetext",function(data){
	title.text = data;
});
