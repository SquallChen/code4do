/**
 * related to CheckDialog.ui
 * 
 * @Author : and
 * @Timestamp : 2017-01-24
 */
var dojs = require("dojs");
// variables
var dialog = sm("do_Dialog");
var data = dialog.getData();
var gridData = [];
// initialize
(function() {
	ui("titleLabel").text = data.name;
	ui("descLabel").text = data.desc.look + "\n";

	initGrid();

})();
// event
ui("closeButton").on("touch", function() {
	dialog.close();
})
// private function
function initGrid() {
	if (data.type == "npc") {
		var d = {};
		d.name = "打听";
		d.tag = "ask";
		d.color = "F7F7F7FF";
		gridData.push(d);
	}

	if (data.type == "npc" && data.allowFight) {
		var d = {};
		d.name = "切磋";
		d.color = "FFFF00FF";
		d.tag = "fight";
		gridData.push(d);
	}
	if ((data.type == "npc"||data.type == "animal") && data.allowKill) {
		var d = {};
		d.name = "击杀";
		d.tag = "kill";
		d.color = "FF0000FF";
		gridData.push(d);
	}

	var gridview = ui(ui("linearLayout").add("gridview", "source://view/check/actionGrid.ui", "sepearateLabel"));
	var listdata = mm("do_ListData");
	gridview.bindItems(listdata);
	listdata.addData(gridData);
	gridview.refreshItems();
}
