/**
 * New DeviceOne File
 */
var util = require("util");
var dojs = require("dojs");
var d1 = require("deviceone");

module.exports.init = function(id) {
	var data = util.getObjectByID(id);
	return data;
}

module.exports.getRandomDamage = function(data) {
	if (!data.damage)
		return 0;
	var d = data.damage.split("/");
	return util.getRandomMin2Max(parseInt(d[0]), parseInt(d[1]));
}
module.exports.getColorName = function(data) {
	var d = data.name;
	return "<spell>" + d + "</spell>";
}
