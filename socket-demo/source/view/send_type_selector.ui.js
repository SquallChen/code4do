/**
 * related to send_type_selector.ui
 * 
 * @Author : and
 * @Timestamp : 2016-10-03
 */
// sm
var do_Page = sm("do_Page");
// var
var tags = [ "utf8", "gbk", "hex", "file" ];

// event
for (var i = 0; i < tags.length; i++) {
	var click = ui(tags[i]);
	click.on("touch", i, function(d, e) {
		send_type(d, e);
	})
}
// private Function
function send_type(d, e) {
	var i = e.data;

	var tagLabel = ui(tags[i] + "_3");
	do_Page.fire("send_type", tagLabel.text);

	for (var j = 0; j < tags.length; j++) {
		var border = ui(tags[j] + "_1");
		var bgcolor = ui(tags[j] + "_2");
		if (i == j) {
			border.border = "FF8000FF,1,25";
			bgcolor.bgColor = "FF8000FF";
		} else {
			border.border = "000000FF,1,25";
			bgcolor.bgColor = "00000000";
		}
	}
}