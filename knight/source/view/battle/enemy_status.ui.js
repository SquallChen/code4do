/**
 * related to status.ui
 * 
 * @Author : and
 * @Timestamp : 2017-01-24
 */
var Util = require("util");

var healthLabel = ui("healthLabel");
var powerLabel = ui("powerLabel");
ui("$").on("refresh", function(_data) {
	ui("nameLabel").text = _data.name;
	var health = _data.HP.split("/");
	healthLabel.width = parseInt(180 * health[0] / health[1]);
	if (healthLabel.width < 0)
		healthLabel.width = 0;
	healthLabel.x = 460 + 180 - healthLabel.width;
	healthLabel.redraw();
	ui("healthNumberLabel").text = _data.HP;

	var power = _data.MP.split("/");
	powerLabel.width = parseInt(180 * power[0] / power[1]);
	if (powerLabel.width < 0)
		powerLabel.width = 0;
	powerLabel.x = 460 + 180 - powerLabel.width;
	powerLabel.redraw();
	ui("powerNumberLabel").text = _data.MP;

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