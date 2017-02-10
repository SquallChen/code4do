/**
 * related to gridView.ui
 * 
 * @Author : and
 * @Timestamp : 2017-01-25
 */
// require
var dojs = require("dojs");

// variables
var column = 8;
var row = 8;
var root = ui("$")

// initialize

// event
root.on("initData", function(d) {
	var xoffset = 1;
	for (var i = 0; i < column; i++) {
		var yoffset = 1;
		for (var j = 0; j < row; j++) {
			var index = j * column + i;
			var item = ui(root.add("id_" + index, "source://view/battle/gridItem.ui", xoffset, yoffset));
			item.fire("refresh", d[index]);
			yoffset = 80 + yoffset;
		}
		xoffset = 80 + xoffset;
	}
}).on("refreshData", function(d) {
	for (var i = 0; i < (row * column); i++) {
		var item = ui("id_" + i);
		item.fire("refresh", d[i]);
	}
}).on("rebackData", function(d) {
	for (var i = 0; i < (row * column); i++) {
		var item = ui("id_" + i);
		d[i].status = "blank";
		item.fire("refresh", d[i]);
	}
})