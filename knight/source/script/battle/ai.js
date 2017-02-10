/**
 * New DeviceOne File
 */

var d1 = require("deviceone");
var dojs = require("dojs");
var util = require("util");
var Grid = require("battle/grid");
var Creature = require("creature");
var Weapon = require("weapon");
var Spell = require("spell");
var SpellCast = require("battle/tactics/spellCast");
var Target = require("battle/tactics/targetSelect");
var Distance = require("battle/tactics/distance");
var Speed = require("battle/tactics/speed");
var Damage = require("battle/tactics/damage");
var Armor = require("battle/tactics/armor");
var Condition = require("battle/tactics/conditionAffect");
var Describtion = require("describtion");

module.exports.attack = attack;
module.exports.autoBattle = function(griddata, battles) {
	if (battles.current == "us") {
		for (var i = 0; i < battles.us.length; i++) {
			var pc = battles.us[i];
			if (pc.battle.status == "ready") {
				combat(pc, battles.us, battles.enemies, griddata);
				break;
			}
		}
	} else {
		for (var i = 0; i < battles.enemies.length; i++) {
			var enemy = battles.enemies[i];
			if (enemy.battle.status == "ready") {
				combat(enemy, battles.enemies, battles.us, griddata);
				break;
			}
		}
	}
}

function combat(attacker, attackers, defenders, griddata) {
	// 战斗前，处理condition效果
	if (Condition.affect(attacker, attackers, defenders, griddata) == false) {
		attacker.battle.status = "over";
		return;
	}
	var isAlldie = true;
	for (var i = 0; i < defenders.length; i++) {
		if (defenders[i].battle.status != "die") {
			isAlldie = false;
			break;
		}
	}
	if(isAlldie){
		attacker.battle.status = "over";
		return;
	}
	// 0. 计算能移动的距离
	var move_speed = Speed.compute(attacker);
	// 1. 选择攻击对象
	var defender = Target.selectEnemy(attacker, defenders);
	// 2. 计算与攻击者的距离
	var distance = Distance.computeDistanceWithTarget(attacker.battle.index, defender.battle.index);
	// 3. 选择使用的spell
	var spell = SpellCast.select(attacker);
	// 4. 计算使用的spell的攻击范围
	var spell_range = SpellCast.computeRange(attacker, spell);
	// 6. move或attack
	// 如果被攻击者已经在攻击范围内，直接攻击
	// dojs.core.p(attacker.name + " attack " + defender.name + " with " +
	// spell.id);
	if (spell_range >= distance) {
		attack(attacker, defender, spell, attackers, defenders);
	} else {
		// 否则先移动
		// 找出移动后那个位置离敌人最近
		var result = Distance.computeMinDistanceWithMovedPostion(move_speed, attacker, defender, attackers, defenders)
		Grid.move(attacker.battle.index, result.index, griddata);
		Describtion.move(attacker, defender);
		if (spell_range >= result.distance) {
			attack(attacker, defender, spell, attackers, defenders);
		}
	}
	attacker.battle.status = "over";
}
// 开始多重攻击,有一些技能可以同时攻击多人,或攻击一个人多次
function attack(attacker, defender, spell, attackers, defenders) {
	var mutltis = SpellCast.computeMulti(attacker, defender, spell, attackers, defenders);
	if (mutltis.length > 1) {
		for (var i = 0; i < mutltis.length; i++) {
			if (i > 0)
				Describtion.multi(attacker, spell);
			attackOne(attacker, mutltis[i], spell, attackers, defenders);
		}
	} else {
		var count = SpellCast.computeRepeat(attacker, defender, spell, attackers, defenders);
		for (var i = 0; i < count; i++) {
			if (i > 0)
				Describtion.repeat(attacker, spell);
			attackOne(attacker, defender, spell, attackers, defenders);
		}
	}
}
// 开始攻击
function attackOne(attacker, defender, spell, attackers, defenders) {
	var attackData = {};
	attackData.attacker = attacker;
	attackData.spell = spell;
	attackData.defender = defender;

	var canDamge = Damage.can(attacker, defender, spell);
	attackData.can = canDamge;
	dojs.core.p(canDamge + " " + attacker.name + " " + defender.name + " " + spell.name);
	Creature.changeMP(attacker, -1 * spell.cast);
	if (canDamge) {
		var damage = Damage.compute(attacker, spell);
		var defend = Armor.compute(defender);
		// dojs.core.p(defender.name + " get " + damage + "," + defend,
		// "damage,defend");
		attackData.damage = damage;
		attackData.defend = defend;
		if (damage > defend) {
			Creature.changeHP(defender, (defend - damage));
			if (Creature.isDie(defender)) {
				defender.battle.status = "die";
				attackData.die = true;
			}
		}
	}
	Describtion.attack(attackData);
	Condition.create(attackData);
}