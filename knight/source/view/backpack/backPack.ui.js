/**
 * related to backPack.ui
 * 
 * @Author : and
 * @Timestamp : 2017-01-19
 */
// require
var dojs = require("dojs");
var Util = require("util");

// variables
var column = 4;
var row = 5;
var root = ui("$")

// initialize

// event
root.on("init", function(d) {
	var xoffset = 1;
	for (var i = 0; i < column; i++) {
		var yoffset = 1;
		for (var j = 0; j < row; j++) {
			var index = j * column + i;
			var item = ui(root.add("id_" + index, "source://view/backpack/backPackItem.ui", xoffset, yoffset));
			refresh(item, d, index);
			yoffset = 100 + yoffset;
		}
		xoffset = 100 + xoffset;
	}
}).on("update", function(d) {
	for (var i = 0; i < column * row; i++) {
		var item = ui("id_" + i);
		refresh(item, d, i);
	}
})

function refresh(item, d, i) {
	var obj = "blank";
	if (i < d.objs.length && d.objs[i] != "blank") {
		obj = Util.getObjectByID(d.objs[i].id)
	}
	item.fire("refresh", obj);
}