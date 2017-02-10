/**
 * New DeviceOne File
 */
var Util = require("util");
var Describtion = require("describtion");
var dojs = require("dojs");
var Creature = require("creature");
var d1 = require("deviceone");

//
module.exports.isTaunt = isTaunt
function isTaunt(creature) {
	return isCondition(creature, "taunt");
}
module.exports.isKO = isKO
function isKO(creature) {
	return isCondition(creature, "condition.ko");
}
module.exports.isFaint = isFaint
function isFaint(creature) {
	return isCondition(creature, "condition.faint");
}
module.exports.isBlood = isBlood
function isBlood(creature) {
	return isCondition(creature, "condition.blood");
}
module.exports.affect = function(attacker) {
	if (isBlood(attacker)) {
		var _condition = attacker.battle.conditions["condition.blood"];
		var _damage = -0.5 * _condition.damage;
		Creature.changeHP(attacker, _damage);
		Describtion.blood(attacker, _damage);
	}
	if (isFaint(attacker)) {
		Describtion.faint(attacker);
		return false;
	}
	return true;
}
module.exports.create = function(affackdata) {
	if (affackdata.can != true)
		return;
	var spell = affackdata.spell;
	if (spell.condition && spell.condition.id) {
		var attacker = affackdata.attacker;
		var defender = affackdata.defender;
		var damage = affackdata.damage;

		var skill_level = attacker.skills[spell.skill];
		var spell_rate = spell.condition.rate;

		spell_rate = spell_rate + spell_rate * skill_level / 100;
		if (spell_rate >= Math.random()) {
			var turn = computeTurn(spell.condition.id, spell, skill_level)
			var _condition = {
				turn : turn,
				damage : damage,
				caster_id : attacker.id
			};
			changeCondition(defender, _condition, spell.condition.id);
			Describtion.condition(attacker, spell, defender);
		}
	}
}
function changeCondition(defender, _condition, _id) {
	if (!defender.battle.conditions) {
		defender.battle.conditions = {};
	}
	defender.battle.conditions[_id] = _condition;
	d1.sm("do_Page").fire("refreshStatus", defender);
}
// 计算condition的执行轮数
function computeTurn(condition_id, spell, skill_level) {
	var condition = Util.getObjectByID(condition_id);
	var turns = condition.turn;
	var turn = turns[0];
	if (skill_level > 100)
		turn = turns[1];
	if (skill_level > 200)
		turn = turns[2];
	if (skill_level > 300)
		turn = turns[3];
	return turn;
}
// 是否遭受某种效果
function isCondition(creature, condition) {
	var conditions = creature.battle.conditions;
	if (conditions) {
		if (conditions[condition] && conditions[condition].turn > 0) {
			return true;
		}
	}
	return false;
}
