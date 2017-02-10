/**
 * New DeviceOne File
 */
var util = require("util");
var dojs = require("dojs");
var d1 = require("deviceone");
var Creature = require("creature");
var Grid = require("battle/grid");
var SpellCast = require("battle/tactics/spellCast");
var Distance = require("battle/tactics/distance");
var Speed = require("battle/tactics/speed");
var AI = require("battle/ai");
var Condition = require("battle/tactics/conditionAffect");

var stack = [];
module.exports.init = function(data) {
	var battles = {};
	battles.round = 1;// 回合数
	battles.current = "us";// 当前攻击者，us或enemies
	battles.status = "ing";// 战斗进行中，还有3个值"win","lost","halt"
	battles.control = "manual";// 自动控制，还有一个值auto
	battles.tag = data.tag;// kill fight
	battles.us = [];
	data.me.battle.status = "ready";
	data.me.battle.team = "us";
	battles.us.push(data.me);
	battles.me = data.me;
	if (data.me.ally) {
		for (var i = 0; i < data.me.ally.length; i++) {
			var c = Creature.init(data.me.ally[i]);
			c.battle.status = "ready";
			c.battle.team = "us"
			battles.us.push(c);
		}
	}

	battles.enemies = [];
	data.enemy.battle.status = "over";
	data.enemy.battle.team = "enemies";
	battles.enemies.push(data.enemy);
	if (data.enemy.ally) {
		for (var i = 0; i < data.enemy.ally.length; i++) {
			var c = Creature.init(data.enemy.ally[i]);
			c.battle.status = "over";
			c.battle.team = "enemies";
			battles.enemies.push(c);
		}
	}
	return battles;
}
module.exports.isAllDie = function(battles) {
	var isdie = true;
	if (battles.current == "us") {
		for (var i = 0; i < battles.us.length; i++) {
			if (battles.us[i].battle.status != "die") {
				isdie = false;
				break;
			}
		}
	} else {
		for (var i = 0; i < battles.enemies.length; i++) {
			if (battles.enemies[i].battle.status != "die") {
				isdie = false;
				break;
			}
		}
	}
	return isdie;
}

module.exports.isAllOver = isAllOver;
function isAllOver(battles) {
	var isover = true;
	if (battles.current == "us") {
		for (var i = 0; i < battles.us.length; i++) {
			if (battles.us[i].battle.status == "ready") {
				isover = false;
				break;
			}
		}
	} else {
		for (var i = 0; i < battles.enemies.length; i++) {
			if (battles.enemies[i].battle.status == "ready") {
				isover = false;
				break;
			}
		}
	}
	return isover;
}
// 修改激活的spell
module.exports.changeActivied_Spell = function(data, battles) {
	getPCByID(data.current, battles).battle.selected_spell = data.id;
}
module.exports.selectGrid = function(data, battles, griddata, endButton) {
	if (data == "end") {
		if (stack.length > 0) {
			toAction(battles, griddata, endButton);
		}
	} else {
		if (stack.length <= 0) {
			stack0(data, battles, griddata, endButton);
		} else if (stack.length == 2) {
			stack2(data, battles, griddata, endButton);
		} else if (stack.length == 4) {
			stack4(data, battles, griddata, endButton);
		} else {
			reback();
		}
	}
}
function toAction(battles, griddata, endButton) {
	if (stack.length <= 2) {
		griddata[stack[0].source].tag.battle.status = "over";
	} else {
		if (stack.length >= 3) {
			var colorName = Creature.getColorName(griddata[stack[0].source].tag);
			Grid.move(stack[0].source, stack[2].moved, griddata, function(d) {
				// ai.print(d, colorName);
			});
		}
		if (stack.length >= 5) {
			var attackData = {};
			AI.attack(griddata[stack[2].moved].tag, griddata[stack[4].target].tag, SpellCast.select(griddata[stack[2].moved].tag), battles.us, battles.enemies);
			// ai.printAttackDesc(attackData);
		}
		// 移动后index发生变化了
		griddata[stack[2].moved].tag.battle.status = "over";
	}
	stack = [];
	endButton.visible = false;
	if (isAllOver(battles)) {
		Grid.refreshBlank(griddata);
		d1.sm("do_Page").fire("usOver");
	} else
		d1.sm("do_Page").fire("rebackGridData");

}
function stack4(data, battles, griddata, endButton) {
	if (stack[3].canAttack) {
		if (data.index == stack[2].moved) {
			toAction(battles, griddata, endButton);
			return;
		}
		if (pointInPoints(data, stack[3].canAttack)) {
			var spell = SpellCast.select(griddata[stack[0].source].tag);
			if (Grid.isCreature(data)) {
				if (Grid.getTeam(griddata[stack[0].source]) == Grid.getTeam(data) && spell.type.indexOf("attack") < 0) {
					stack.push({
						target : data.index
					});
					toAction(battles, griddata, endButton);
					return;
				}
				if (Grid.getTeam(griddata[stack[0].source]) != Grid.getTeam(data) && spell.type.indexOf("attack") >= 0) {
					stack.push({
						target : data.index
					});
					toAction(battles, griddata, endButton);
					return;
				}
			}
		}
	}
	reback();
}
function stack2(data, battles, griddata, endButton) {
	if (stack[1].canMove) {
		if (pointInPoints(data, stack[1].canMove)) {
			stack.push({
				moved : data.index
			});
			var spell = SpellCast.select(griddata[stack[0].source].tag);
			var range = SpellCast.computeRange(griddata[stack[0].source].tag, spell);
			var attackdPoints = Distance.computeAttackRangeOfIndex(data.index, range, spell.type, griddata);
			stack.push({
				canAttack : attackdPoints
			});
			// dojs.core.p(attackdPoints, "attackdPoints");
			Grid.setAttackPoints(attackdPoints, griddata);
			endButton.visible = true;
			return;
		}
	}
	reback();
}
function stack0(data, battles, griddata, endButton) {
	if (Grid.getTeam(data) == battles.current && data.tag.battle.status == "ready") {
		stack.push({
			source : data.index
		});

		var attacker = griddata[data.index].tag;
		if (Condition.affect(attacker) == false) {
			toAction(battles, griddata, endButton);
			return;
		}
		var range = Speed.compute(attacker);
		var movedPoints;
		if (range == 0)
			movedPoints.push(data.index);
		else {
			var tempPoints = Distance.computeRangePositions(data.index, range);
			movedPoints = Distance.computeCanMovePosition(tempPoints, attacker, battles.us, battles.enemies)
		}
		stack.push({
			canMove : movedPoints
		});
		Grid.setMovedPoints(movedPoints, griddata);
		endButton.visible = true;
		return;
	}
	reback();
}
function pointInPoints(data, moved) {
	for (var i = 0; i < moved.length; i++) {
		if (data.index == moved[i]) {
			return true;
		}
	}
	return false
}
function reback() {
	stack = [];
	d1.sm("do_Page").fire("rebackGridData");
}
function getPCByID(id, battles) {
	for (var i = 0; i < battles.us.length; i++) {
		if (battles.us[i].id == id)
			return battles.us[i];
	}
}