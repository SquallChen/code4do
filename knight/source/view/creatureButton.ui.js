/**
 * related to npcButton.ui
 * 
 * @Author : and
 * @Timestamp : 2017-01-29
 */
var dojs = require("dojs");
var npc = require("npc");
// variables
var root = ui("$");
var data;
// initialize
(function() {
	dojs.style.css(root, "dynamicButton");
})();

// event
root.on("dataRefreshed", function(_data) {
	data = _data;
	ui("title_label").text = _data.name;
}).on("touch", function() {
	sm("do_Dialog").open("source://view/check/checkDialog.ui", data, function(_d, e) {
		sm("do_Page").fire("interact", {
			tag : _d,
			data : data
		});
	})
}).setMapping({
	"tag" : "id"
})