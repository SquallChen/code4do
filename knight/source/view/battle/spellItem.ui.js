/**
 * related to spellItem.ui
 * 
 * @Author : and
 * @Timestamp : 2017-01-28
 */
var dojs = require("dojs");

dojs.style.css(ui("$"), "navigatorCell");
ui("$").setMapping({
	"tag" : "current",
	"textLabel.text" : "name",
	"textLabel.tag" : "id"
})
ui("$").on("dataRefreshed", function(d) {
	if (d.isSelected)
		ui("textLabel").bgColor = "696969FF";
	else
		ui("textLabel").bgColor = "00000000";
}).on("touch", function() {
	var d = {};
	d.current = this.tag;
	d.id = ui("textLabel").tag;
	sm("do_Page").fire("spellSelected", d);
})