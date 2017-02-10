/**
 * related to nameLayout.ui
 * 
 * @Author : and
 * @Timestamp : 2017-01-26
 */
var dojs = require("dojs");
var currentData;
ui("$").on("init", function(data) {
	currentData = data;
	for (var i = 0; i < data.length; i++) {
		var button = ui("button" + (i + 1));
		button.visible = true;
		dojs.style.css(button, "dynamicButton");
		button.text = data[i].name;
	}
	ui("button1").bgColor = "696969FF";

})
for (var i = 1; i <= 5; i++) {
	ui("button" + i).on("touch", i, 1000, function(d, e) {
		var index = e.data;
		sm("do_Page").fire("pcSelected", currentData[index - 1]);
		for (var j = 1; j <= 5; j++) {
			if (index == j) {
				ui("button" + j).bgColor = "696969FF";
			} else {
				ui("button" + j).bgColor = "00000000";
			}
		}
	})
}