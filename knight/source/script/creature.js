/**
 * New DeviceOne File
 */
/**
 * New DeviceOne File
 */
var util = require("util");
var dojs = require("dojs");
var d1 = require("deviceone");
var weapon = require("weapon");

module.exports.init = function(id) {
	var data = util.getObjectByID(id);
	return data;
}
module.exports.changeHP = function(data, point) {
	var hp = data.HP.split("/");
	var php = parseInt(hp[0]) + point;
	data.HP = php + "/" + hp[1];
	d1.sm("do_Page").fire("refreshStatus", data);
}
module.exports.getHP = function(data) {
	var hp = data.HP.split("/");
	return parseInt(hp[0]);
}
module.exports.getMP = function(data) {
	var mp = data.MP.split("/");
	return parseInt(mp[0]);
}
module.exports.changeMP = function(data, point) {
	var mp = data.MP.split("/");
	var pmp = parseInt(mp[0]) + point;
	data.MP = pmp + "/" + mp[1];
	d1.sm("do_Page").fire("refreshStatus", data);
}
module.exports.isDie = function(data) {
	var hp = data.HP.split("/");
	return (hp[0] < 0);
}
module.exports.getInitDesc = function(data) {
	var i = data.desc.init;
	if (!i)
		i = "{{source}}出现了";

	return i;// 出现，出场的行为动作，只有描述
}
module.exports.getColorName = getColorName;
function getColorName(data) {
	return "<" + data.type + ">" + data.name + "</" + data.type + ">";
}

module.exports.getColorInitDesc = function(data) {
	var source = getColorName(data);
	var wield_right = data.wield.right;
	var source_wield_right;
	if (wield_right)
		source_wield_right = weapon.getColorName(weapon.init(wield_right));
	var desc = util.render(data.desc.init, source, source_wield_right)
	desc = "<" + data.type + "-action>" + desc + "</" + data.type + "-action>";
	return desc;
}