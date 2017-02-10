/**
 * New DeviceOne File
 */
var Condition = require("battle/tactics/conditionAffect")

// 计算生物的防御值
module.exports.compute = function(creature) {
	// 被击倒armor减少
	var bArmor = 0;
	if (creature.defend)
		bArmor = creature.defend[0];
	// 如果装备盾牌，受盾防技能影响
	// TODO
	// 如果被眩晕，armor减少
	// TODO
	// 被击倒，armor减少
	if (Condition.isKO(creature)) {
		var level = creature.conditions.ko.level;
		// 基数是20%，敌人释放的spell对应的skill的技能点从0-400以上
		var armor = parseInt(bArmor * (1 - 0.2 - 0.1 * level / 100))
		return armor;
	}
	return bArmor;
}
