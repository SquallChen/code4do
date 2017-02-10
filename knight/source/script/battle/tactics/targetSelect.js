/**
 * New DeviceOne File
 */
// AI选中目标的规则
var d1 = require("deviceone");
var dojs = require("dojs");
var Util = require("util");
var Distance = require("battle/tactics/distance")
var Condition = require("battle/tactics/conditionAffect")
var Armor = require("battle/tactics/armor");

// 选择攻击目标的规则
module.exports.selectEnemy = function(attacker, defenders) {
	// 如果中了嘲讽技能，直接选择释放嘲讽的人
	if (Condition.isTaunt(attacker)) {
		var caster_id = conditions.taunt.caster_id;// 找到嘲讽的释放者id
		var caster = getCreatureByID(caster_id, defenders);
		if (caster && caster.battle.status != "die")
			return caster;
	}
	// 或者从4种选择机制中随机选一个（以后可能更多）：
	// 0. 距离优先，
	// 1.敌人的生命低优先，
	// 2.敌人的防御值优先
	// 3.随机选一个敌人
	return select(attacker, defenders);
}
//
function select(attacker, defenders) {
	var r = Util.getRandom(4);
	var target;
	switch (r) {
	case 0:
		target = selectMinDistanceEnemy(attacker, defenders);
	case 1:
		target = selectMinHPEnemy(attacker, defenders);
	case 2:
		target = selectMinArmorEnemy(attacker, defenders);
	case 3:
		target = defenders[Util.getRandom(defenders.length)];
	}
	if (target.battle.status == "die")
		return select(attacker, defenders);
	else 
		return target;
}
// 选择最近的敌人
function selectMinDistanceEnemy(attacker, defenders) {
	return Distance.getTargetWithMinDistance(attacker.battle.index, defenders);
}
// 选择血最少的敌人
function selectMinHPEnemy(attacker, defenders) {
	var min = Number.MAX_VALUE;
	var mIndex = 0;
	for (var i = 0; i < defenders.length; i++) {
		var defender = defenders[i];
		var hp = parseInt(defender.HP.split("/")[0]);
		if (hp < min) {
			min = hp;
			mIndex = i;
		}
	}
	return defenders[mIndex];
}
// 选择防御值最低的敌人
function selectMinArmorEnemy(attacker, defenders) {
	var min = Number.MAX_VALUE;
	var mIndex = 0;
	for (var i = 0; i < defenders.length; i++) {
		var defender = defenders[i];
		var armor = Armor.compute(defender);
		if (armor < min) {
			min = armor;
			mIndex = i;
		}
	}
	return defenders[mIndex];
}
function getCreatureByID (id, creatures) {
	for (var i = 0; i < creatures.length; i++) {
		if (id == creatures[i].id)
			return creatures[i];
	}
}
