/**
 * related to status.ui
 * 
 * @Author : and
 * @Timestamp : 2017-01-25
 */
var Util = require("util");
var dojs = require("dojs");

ui("$").on("refresh", function(_data) {
	ui("nameLabel").text = _data.name;
	var health = _data.HP.split("/");
	ui("healthLabel").width = parseInt(180 * health[0] / health[1]);
	if (ui("healthLabel").width < 0)
		ui("healthLabel").width = 0;
	ui("healthLabel").redraw();
	ui("healthNumberLabel").text = _data.HP;
	if (_data.MP) {
		var power = _data.MP.split("/");
		ui("powerLabel").width = parseInt(180 * power[0] / power[1]);
		if (ui("powerLabel").width < 0)
			ui("powerLabel").width = 0;
		ui("powerLabel").redraw();
		ui("powerNumberLabel").text = _data.MP;
	}
	for (var i = 0; i < 4; i++) {
		ui("con" + (i + 1) + "_Label").text = "";
	}
	
	if (_data.battle.conditions) {
		var index = 1;
		for ( var key in _data.battle.conditions) {
			var condition = Util.getObjectByID(key);
			if (_data.battle.conditions[key].turn > 0) {
				ui("con" + index + "_Label").text = condition.name + ":" + _data.battle.conditions[key].turn;
				index++;
			}
		}
	}
});