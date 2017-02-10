/**
 * New DeviceOne File
 */
//
var Condition = require("battle/tactics/Condition");
var Grid = require("battle/grid");

var GRID_COUNT = 64;
var GRID_COLUMN = 8;
var GRID_ROW = 8;

// 计算攻击者和目标群每个生物的距离
module.exports.computeDistancesWithTargets = computeDistancesWithTargets;
module.exports.computeDistanceWithTarget = computeDistanceWithTarget;
module.exports.getTargetWithMinDistance = getTargetWithMinDistance;
module.exports.computeCanMovePosition = computeCanMovePosition;
module.exports.computeRangePositions = computeRangePositions;
module.exports.computeAttackRangeOfIndex = computeAttackRangeOfIndex;
module.exports.computeMinDistanceWithMovedPostion=computeMinDistanceWithMovedPostion;
function computeDistancesWithTargets(index, targets) {
	var results = [];
	for (var i = 0; i < targets.length; i++) {
		var target = targets[i];
		if(target.battle.status=="die")
			continue;
		var distance = computeDistanceWithTarget(index, target.battle.index);
		var result = {};
		result["distance"] = distance;
		result["target"] = target;
		results.push(result);
	}
	return results;
}

function computeDistanceWithTarget(aIndex, dIndex) {
	var r1 = parseInt(aIndex / GRID_COLUMN);
	var c1 = aIndex % GRID_COLUMN;
	var r2 = parseInt(dIndex / GRID_COLUMN);
	var c2 = dIndex % GRID_COLUMN;
	// dojs.core.p("r1:"+r1+",c1:"+c1+" r2:"+r2+",c2:"+c2,"r1,r2,c1,c2")
	// 2个点的距离是行差和列差的最大值
	var distance = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1));
	return distance;
}
// 计算当前攻击者和所有目标的距离中的最小值
 function getTargetWithMinDistance(index, targets) {
	var results = computeDistancesWithTargets(index, targets);
	var min = GRID_COUNT;
	var minIndex;
	for (var i = 0; i < results.length; i++) {
		var result = results[i];
		var minDistance = result.distance;
		if (minDistance < min) {
			min = minDistance;
			minIndex = i;
		}
	}
	if(results[minIndex])
	return results[minIndex].target;
}
// 选中一个点附近一格或多格位置
function computeRangePositions(index, range) {
	if (!range)
		range = 1;
	var temps = [];
	var n = parseInt(index / GRID_COLUMN);//   行
	var m = index % GRID_COLUMN;// 列
	var min_n = n - range;
	if (min_n < 0)
		min_n = 0;
	var min_m = m - range;
	if (min_m < 0)
		min_m = 0;
	var max_n = n + range;
	if (max_n >= GRID_ROW)
		max_n = GRID_ROW - 1;
	var max_m = m + range;
	if (max_m >= GRID_COLUMN)
		max_m = GRID_COLUMN - 1;
	for (var i = min_n; i <= max_n; i++) {
		for (var j = min_m; j <= max_m; j++) {
			var t = i * GRID_COLUMN + j;
			if (t >= 0&&t<GRID_COUNT)
				temps.push(t);
		}
	}
	return temps;
}
// 选中一个点计算附近一格或多格可以移动的位置
function computeCanMovePosition(positions,attacker,attackers,defenders) {
	var attacker_indexs =[];
	for(var i = 0;i<attackers.length;i++){
		attacker_indexs.push(attackers[i].battle.index);
	}
	var defender_indexs =[];
	for(var i = 0;i<defenders.length;i++){
		defender_indexs.push(defenders[i].battle.index);
	}
	// 去掉无效的
	var changed = [];
	changed.push(attacker.battle.index);// 自身位置也可以移动
	for (var i = 0; i < positions.length; i++) {
		var index = positions[i];
		if(isInPositions(index,attacker_indexs)||isInPositions(index,defender_indexs)){
			continue;
		}
		changed.push(index);
	}
	return changed;
}
// 计算当前攻击者在可移动的访问区间内和目标的距离中的最小值,从而决定怎么自动移动
function computeMinDistanceWithMovedPostion(speed,attacker,defender,attackers,defenders){
	var tempPositions = computeRangePositions(attacker.battle.index, speed);
	var movedPositions = computeCanMovePosition(tempPositions,attacker,attackers,defenders);
	
	var min = GRID_COUNT;
	var movedIndex ;
	var result={};
	for (var i = 0; i < movedPositions.length; i++) {
		var distance = computeDistanceWithTarget(movedPositions[i], defender.battle.index);
		// dojs.core.p(_result,"most close:");
		if (distance <= min) {
			min = distance;
			result.index = movedPositions[i];
			result.distance = min;
		}
	}
	return result;
}

// 选中一个点附近一格或多格位置,可以攻击的位置
// type 可以是attack，也可以是heal
function computeAttackRangeOfIndex(index, range,spell_type,griddata) {
	var temps = computeRangePositions(index,range);
	// 去掉无效的
	var changed = [];
	// dojs.core.p(currentTeam,"currentteam");
	for (var i = 0; i < temps.length; i++) {
		var temp = temps[i];
		if(spell_type.indexOf("attack")>=0){
			if(temp==index)// 不能攻击自己
				continue;
			if(Grid.getTeam(griddata[temp])=="us")
					continue;
			if(griddata[temp].tag.battle&&griddata[temp].tag.battle.status=="die")
					continue;
		}else {
			if(Grid.getTeam(griddata[temp])=="enemies")
				continue;
			if(griddata[temp].tag.battle&&griddata[temp].tag.battle.status=="die")
				continue;
		}
		changed.push(temp);
	}
	return changed;
}

function isInPositions(index, positions) {
	for (var i = 0; i < positions.length; i++) {
		if (positions[i] == index)
			return true;
	}
	return false;
}