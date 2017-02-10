/**
 * New DeviceOne File
 */
var Util = require("util");
var Creature = require("creature");
var Weapon = require("weapon");
var Spell = require("spell");
var dojs = require("dojs");
var Distance = require("battle/tactics/distance");

// 计算能攻击的范围，武器的range+spell的range
module.exports.computeRange = computeRange;
function computeRange(attacker, spell) {
	var weapon_range = 0;
	if (attacker.wield && attacker.wield.right) {
		var weapon_id = attacker.wield.right;
		var weapon = Weapon.init(weapon_id);
		weapon_range = weapon.range
	}
	return spell.range + weapon_range;
}

// 计算能攻击对手的个数
module.exports.computeMulti = function(attacker, defender, spell, attackers, defenders) {
	var multis = [];
	var count = isMulti(spell, attacker);
	multis.push(defender);
	if (count > 1) {
		var spell_range = computeRange(attacker, spell);
		var index1 = 0;
		var index2 = 0;
		while (index1 < (count - 1) && index2 < defenders.length) {
			if (defenders[index2].id != defender.id) {
				if (Distance.computeDistanceWithTarget(attacker.battle.index, defenders[index2].battle.index) <= spell_range) {
					multis.push(defenders[index2]);
					index1++;
				}
			}
			index2++;
		}
	}
	return multis;
}
// 计算能攻击对手的次数
module.exports.computeRepeat = function(attacker, defender, spell, attackers, defenders) {
	var count = isRepeat(spell, attacker);
	return count;
}
// 选择一个技能
module.exports.select = function(creature) {
	if (creature.battle.team == "us") {
		var selected_spell_id = creature.battle.selected_spell;
		// 如果是可控制的角色，只选择最后选中的spell，如果达不到条件，使用缺省的普通攻击
		if (isCan(creature, selected_spell_id))
			return Spell.init(selected_spell_id);
		return Spell.init(creature.battle.default_spell);
	} else {
		// 从所有可用的spells里随机选择一个，假定没有补血之类对自身队伍的spell
		var spells = creature.spells;
		var r = Util.getRandom(spells.length);
		var spell_id = spells[r];
		if (isCan(creature, spell_id))
			return Spell.init(spell_id);
		return Spell.init(spells[0]);// 缺省第一个是普通攻击

	}
}
function isMulti(spell, attacker) {
	if (spell.id == "spell.stick.multi" || spell.id == "spell.sword.multi") {
		var skill_level = attacker.skills[spell.skill];
		var counts = spell.multi_count;
		var index = parseInt(skill_level / 100);
		if (index > 3)
			index = 3;
		var count = counts[index];
		return count;
	}
	return 1;
}
function isRepeat(spell, attacker) {
	if (spell.id == "spell.sword.repeat") {
		var skill_level = attacker.skills[spell.skill];
		var counts = spell.repeat_count;
		var index = parseInt(skill_level / 100);
		if (index > 3)
			index = 3;
		var count = counts[index];
		return count;
	}
	return 1;
}

// 判断技能能否施展
function isCan(creature, spell_id) {
	var spell = Spell.init(spell_id);
	var spell_cast = spell.cast;
	var current_mp = Creature.getMP(creature);
	if (current_mp >= spell_cast)
		return true;
	return false;
}