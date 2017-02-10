/**
 * New DeviceOne File
 */
var Spell = require("spell");
var Weapon = require("weapon");

// 判断是否能击中
module.exports.can = function(attacker, defender, spell) {
	// 判断是否能击中,基础是经验比较
	var rate = attacker.exp / (attacker.exp + defender.exp);
	if (spell.extra_rate) {
		// 加上额外的spell带来的几率，这个几率受skill的影响
		var skill_level = attacker.skills[spell.skill];
		rate = rate + (spell.extra_rate * skill_level / 100);
	}
	if (rate < 0.01)
		rate = 0.01;
	var ramdom = Math.random();
	return (rate >= ramdom);
}
// 计算伤害值
module.exports.compute = function(attacker, spell) {
	var totalDamage = 0;
	// 计算伤害值=(武器伤害值+spell伤害值)*(1+(skill值/100))
	var weapon_damage = 0;
	if (attacker.wield && attacker.wield.right) {
		var weaponObj = Weapon.init(attacker.wield.right);
		if (spell.id == "spell.stick.heavy" || spell.id == "spell.sword.heavy")
			weapon_damage = Weapon.getMaxDamage(weaponObj)
		else
			weapon_damage = Weapon.getRandomDamage(weaponObj);
	}
	var skill_level = attacker.skills[spell.skill];
	var spell_damage = Spell.getRandomDamage(spell);
	totalDamage = (weapon_damage + spell_damage) * (1 + (skill_level / 100));
	return parseInt(totalDamage);
}