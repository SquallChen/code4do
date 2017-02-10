/**
 * New DeviceOne File
 */
var d1 = require("deviceone");
var Creature = require("creature");
var Util = require("util");
var Weapon = require("weapon");
var Creature = require("creature");
var Spell = require("spell");
var dojs = require("dojs");

module.exports.condition = function(attacker, spell, defender) {
	var condition = Util.getObjectByID(spell.condition.id);
	var desc = Util.getRandomValue(condition.random);
	var desc = render(desc, attacker, defender, spell);
	desc = "<condition>" + desc + "</condition>"
	print(desc);
}
module.exports.blood = function(attacker, damage) {
	var desc = "<condition>" + Creature.getColorName(attacker) + "受到<d3>流血</d3>效果的伤害(<d3>"+damage+"</d3>)</condition>";
	print(desc);
}
module.exports.faint = function(attacker) {
	var desc = "<condition>" + Creature.getColorName(attacker) + "受到<d1>眩晕</d1>效果,什么也干不了。</condition>";
	print(desc);
}
module.exports.multi = function(attacker,spell) {
	var desc = "<condition>" + Creature.getColorName(attacker) + "的<spell>"+spell.name+"</spell>触发<d1>多重打击</d1>效果。</condition>";
	print(desc);
}
module.exports.repeat = function(attacker,spell) {
	var desc = "<condition>" + Creature.getColorName(attacker) + "的<spell>"+spell.name+"</spell>触发<d1>连击</d1>效果。</condition>";
	print(desc);
}
module.exports.move = function(attacker, defender) {
	var desc = "<move>" + Creature.getColorName(attacker) + "对着" + Creature.getColorName(defender) + "走了几步，离的更近了。</move>";
	print(desc);
}
module.exports.attack = function(attackData) {
	var attacker = attackData.attacker;

	if (!attacker)
		return;
	var defender = attackData.defender;
	var spell = attackData.spell;
	var desc = Util.getRandomValue(spell.random.attack);
	var commonDesc = Util.getObjectByID("desc.common");
	if (!attackData.can) {
		var missdesc = Util.getRandomValue(commonDesc["miss"]);
		desc = desc + "," + missdesc;
	} else {
		if (attackData.defend >= attackData.damage) {
			var guarddesc;
			if (attacker.wield.left && Weapon.init(attacker.wield.left).type == "shield") {
				guarddesc = Util.getRandomValue(commonDesc.guard.shield);
			} else {
				guarddesc = Util.getRandomValue(commonDesc.guard.no - shield);
			}
			desc = desc + "," + missdesc;
		} else {
			var totalHealth = defender.HP.split("/")[1];
			var resultDamage = attackData.damage - attackData.defend;
			var rate = resultDamage / totalHealth;
			var index = 0;
			for (var i = 0; i < commonDesc.damage.length; i++) {
				var dRange = commonDesc.damage[i].range;
				if (rate <= dRange) {
					index = i;
					break;
				}
			}
			desc = desc + "," + spell.random.damage[index] + "受到" + commonDesc.damage[index].desc;
			desc = desc + spell.damage_type + "(<d" + (index + 1) + ">-" + resultDamage + "</d" + (index + 1) + ">)";
		}
	}
	var part;
	if (defender.type == "animal") {
		part = Util.getRandomValue(commonDesc.parts.animal);
	} else {
		part = Util.getRandomValue(commonDesc.parts.person);
	}
	desc = "<" + attacker.type + "-battle>" + desc + "。<" + attacker.type + "-battle/>";
	// dojs.core.p(desc, "attack desc");
	desc = render(desc, attacker, defender, spell, part);
	print(desc);
}
function render(desc, attacker, defender, spell, part) {
	if (desc.indexOf("{{source.wield.right}}") >= 0) {
		var right = Weapon.getRightColorNameByCreature(attacker);
		desc = desc.replace(/{{source.wield.right}}/g, right);
	}
	if (desc.indexOf("{{target.wield.right}}") >= 0) {
		var right = Weapon.getRightColorNameByCreature(defender);
		desc = desc.replace(/{{target.wield.right}}/g, right);
	}
	if (desc.indexOf("{{source.wield.left}}") >= 0) {
		var left = Weapon.getLeftColorNameByCreature(attacker);
		desc = desc.replace(/{{source.wield.left}}/g, left);
	}
	if (desc.indexOf("{{target.wield.left}}") >= 0) {
		var left = Weapon.getLeftColorNameByCreature(defender);
		desc = desc.replace(/{{target.wield.left}}/g, left);
	}
	if (desc.indexOf("{{source}}") >= 0) {
		desc = desc.replace(/{{source}}/g, Creature.getColorName(attacker));
	}
	if (desc.indexOf("{{target}}") >= 0) {
		desc = desc.replace(/{{target}}/g, Creature.getColorName(defender));
	}
	if (desc.indexOf("{{spell}}") >= 0) {
		desc = desc.replace(/{{spell}}/g, Spell.getColorName(spell));
	}
	if (desc.indexOf("{{part}}") >= 0) {
		desc = desc.replace(/{{part}}/g, part);
	}
	return desc;
}
function print(desc) {
	d1.sm("do_Page").fire("print", desc);
}