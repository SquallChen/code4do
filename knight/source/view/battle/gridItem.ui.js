/**
 * related to moveLocation.ui
 * 
 * @Author : and
 * @Timestamp : 2017-01-24
 */
var Grid = require("battle/grid");
var dojs = require("dojs");

var nameLabel = ui("nameLabel");
var actionLabel = ui("actionLabel");
var currentObj = {};

dojs.style.css(ui("$"), "dynamicButton");
ui("$").on("refresh", function(griditem) {
	var team = Grid.getTeam(griditem);
	var tag = griditem.tag;
	currentObj = griditem;
	switch (team) {
	case "blank":
		nameLabel.text = "";
		nameLabel.border = "00000000,1,[38,37,38,37]";
		nameLabel.bgColor = "69696944";
		actionLabel.visible = false;
		break;
	case "us":
		actionLabel.visible = true;
		nameLabel.text = tag.name;
		nameLabel.border = "00FF00FF,1,[38,37,38,37]";
		nameLabel.fontColor = "00FF00FF";
		if (tag.battle.status == "die") {
			nameLabel.border = "696969FF,1,[38,37,38,37]";
			nameLabel.fontColor = "696969FF";
			actionLabel.bgColor = "696969FF"
		} else if (tag.battle.status == "ready") {
			actionLabel.bgColor = "00FF00FF";
		} else if (tag.battle.status == "over") {
			actionLabel.bgColor = "CCCCCCFF";
		}
		break;
	case "enemies":
		actionLabel.visible = true;
		nameLabel.text = tag.name;
		nameLabel.border = "F08080FF,1,[38,37,38,37]";
		nameLabel.fontColor = "F08080FF";
		if (tag.battle.status == "die") {
			nameLabel.border = "696969FF,1,[38,37,38,37]";
			nameLabel.fontColor = "696969FF";
			actionLabel.bgColor = "696969FF"
		} else if (tag.battle.status == "ready") {
			actionLabel.bgColor = "F08080FF";
		} else if (tag.battle.status == "over") {
			actionLabel.bgColor = "CCCCCCFF";
		}
		break;
	}
	var status = griditem.status;
	switch (status) {
	case "canMove":
		ui("layerLabel").visible = true;
		ui("layerLabel").bgColor = "CCCCCC55";
		ui("layerLabel").border = "CCCCCC55,1,[38,37,38,37]";
		break;
	case "canAttack":
		ui("layerLabel").visible = true;
		ui("layerLabel").bgColor = "FF000055";
		ui("layerLabel").border = "FF000055,1,[38,37,38,37]";
		break;
	default:
		ui("layerLabel").visible = false;
		break;
	}
}).on("touch", function() {
	if (Grid.isCreature(currentObj))
		sm("do_Page").fire("refreshStatus", currentObj.tag);
	sm("do_Page").fire("gridSelected", currentObj);
})