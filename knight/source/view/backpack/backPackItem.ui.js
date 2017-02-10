/**
 * related to backPackItem.ui
 * 
 * @Author : and
 * @Timestamp : 2017-01-19
 */
var dojs = require("dojs");
var item;
dojs.style.css(ui("$"), "dynamicButton");
ui("$").on("refresh", function(_item) {
	if (_item == "blank") {
		ui("objLabel").text = "";
	} else {
		ui("objLabel").text = _item.name;
	}
	item = _item;
}).on("touch", function() {
	if (item == "blank")
		return;
	var lastSelected = sm("do_Global").getMemory("lastSelectedItem");
	if (lastSelected || lastSelected.length > 0)
		ui(lastSelected).bgColor = "00000000";
	this.bgColor = "69696955";
	sm("do_Global").setMemory("lastSelectedItem", this.getAddress());
	sm("do_Page").fire("itemSelected", item);
});