/**
 * related to actionButton.ui
 * 
 * @Author : and
 * @Timestamp : 2017-01-26
 */
var dojs = require("dojs");

ui("$").setMapping({
	"actionLabel.text" : "name",
	"actionLabel.fontColor" : "color",
	"actionLabel.tag" : "tag"
})

dojs.style.css(ui("$"), "dynamicButton");
ui("$").on("touch", function() {
	sm("do_Dialog").close(ui("actionLabel").tag);
})