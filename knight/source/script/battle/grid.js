/**
 * New DeviceOne File
 */
var util = require("util");
var dojs = require("dojs");
var d1 = require("deviceone");
var creature = require("creature");

var GRID_COUNT = 64;
var GRID_COLUMN = 8;
var GRID_ROW = 8;

module.exports.init = function(battles) {
	var us = battles.us;
	var enemies = battles.enemies;
	var gd = [];
	for (var i = 0; i < GRID_COUNT; i++) {
		var d = {};
		d.status = "blank";
		d.tag = {};
		d.index = i;
		gd[i] = d;
	}
	for (var i = 0; i < us.length; i++) {
		gd[i].tag = us[i];
		us[i].battle.index = i;
	}
	for (var i = 0; i < enemies.length; i++) {
		gd[GRID_COUNT - 1 - i].tag = enemies[i];
		enemies[i].battle.index = GRID_COUNT - 1 - i;
	}
	dojs.core.p(gd, "gd");

	return gd;
}
module.exports.getGridItemByID = function(id, griddata) {
	for (var i = 0; i < griddata.length; i++) {
		if (griddata[i].tag) {
			if (griddata[i].tag.id == id)
				return griddata[i];
		}
	}
}
module.exports.setMovedPoints = function(points, griddata) {
	refreshBlank(griddata);
	for (var i = 0; i < points.length; i++) {
		griddata[points[i]].status = "canMove";
	}
	d1.sm("do_Page").fire("refreshGridData");
}
module.exports.setAttackPoints = function(points, griddata) {
	for (var i = 0; i < points.length; i++) {
		griddata[points[i]].status = "canAttack";
	}
	d1.sm("do_Page").fire("refreshGridData");
}

module.exports.move = function(oldIndex, newIndex, griddata, callback) {
	if (oldIndex != newIndex) {
		var oldObj = griddata[oldIndex];
		var newObj = griddata[newIndex];
		newObj.tag = oldObj.tag;
		newObj.tag.battle.index = newIndex;
		oldObj.status = "blank";
		oldObj.tag = {};
	}
}
module.exports.refreshBlank = refreshBlank;
function refreshBlank(griddata) {
	for (var i = 0; i < griddata.length; i++) {
		griddata[i].status = "blank";
	}
}
// 获取grid中某个对象所在的team：blank，us，enemies
module.exports.getTeam = function(item) {
	// dojs.core.p(item);
	if (!item || !item.tag||!item.tag.battle)
		return "blank"
	return item.tag.battle.team;
}
// 判断当前grid中某个对象所在的team是us或enemies
module.exports.isCreature = function(item) {
	// dojs.core.p(item);
	if (!item || !item.tag||!item.tag.battle)
		return false
	return true;
}
