/**
 * New DeviceOne File
 */
var Condition = require("battle/tactics/conditionAffect")
var dojs = require("dojs");

// 计算攻击者的移动距离
module.exports.compute = function(creature) {
	// 晕倒或击倒，不能移动
	if (Condition.isFaint(creature) || Condition.isKO(creature))
		return 0;
	// 被减速则speed减少 TODO
	return creature.speed;
}