/**
 * New DeviceOne File
 */
var util = require("util");
var dojs = require("dojs");
var d1 = require("deviceone");

module.exports.init = init;
function init(id) {
	var data = util.getObjectByID(id);
	return data;
}
module.exports.create = function(id) {
	var data = util.newObject(id);
	return data;
}
module.exports.getRandomDamage = function(data) {
	var d = data.damage.split("/");
	return util.getRandomMin2Max(parseInt(d[0]), parseInt(d[1]));
}
module.exports.getMaxDamage = function(data) {
	var d = data.damage.split("/");
	return parseInt(d[1]);
}
module.exports.getColor = function(data) {
	switch (data.level) {
	case 1:
		return "C0C0C0FF";
	case 2:
		return "00FF7FFF";
	case 3:
		return "1E90FFFF";
	case 4:
		return "FFD700";
	case 5:
		return "DA70D6";
	default:
		return "C0C0C0FF";
	}
}

module.exports.getColorName = getColorName;
function getColorName(data) {
	var d = data.name;
	return "<weapon" + data.level + ">" + d + "</weapon" + data.level + ">";
}
module.exports.getRightColorNameByCreature = function(creature) {
	if (creature.wield.right) {
		var data = init(creature.wield.right);
		return getColorName(data);
	} else {
		return "";
	}
}
module.exports.getLeftColorNameByCreature = function(creature) {
	if (creature.wield.left) {
		var data = init(creature.wield.left);
		return getColorName(data);
	} else {
		return "";
	}
}
module.exports.getDetailDesc = function(obj) {
	var desc = [];
	desc.push(obj.desc.look);
	desc.push(" ")
	desc.push("类型: 武器");
	switch (obj.wield) {
	case "right":
		desc.push("装备: 右手");
		break;
	case "right&left":
		desc.push("装备: 双手");
		break;
	case "left":
		desc.push("装备: 左手");
		break;
	}
	desc.push("伤害: " + obj.damage);
	desc.push("范围: " + obj.range);
	return desc.join("\n");
}
