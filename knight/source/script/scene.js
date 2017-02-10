/**
 * New DeviceOne File
 */
var d1 = require("deviceone");
var dojs = require("dojs");
var util = require("util");
var creature = require("creature");

module.exports.init = function(id) {
	var data = util.getObjectByID(id);
	return data;// 返回最后的位置
}

module.exports.refresh = function(data, sysTime, initTime, randomOutput, callback) {
	if (!data.creatures)
		return;
	// 刷新生物列表，把该出场的，和死去到时间复活的生物出场
	for (var i = 0; i < data.creatures.length; i++) {
		var c = data.creatures[i];
		if (c.status == "normal") {
			if ((sysTime - initTime) >= c.appear) {
				c.status = "appear";
				createCreature(creature.init(c.id), randomOutput);
			}
		} else if (c.status == "die") {
			if (sysTime >= c.revival) {
				c.status = "appear";
				createCreature(creature.init(c.id), randomOutput);
			}
		}
	}
	var randomDesc = getRandomDesc(randomOutput);
	if (randomDesc)
		callback(randomDesc);
}
module.exports.exit = function(data) {
	if (!data.creatures)
		return;
	// 生物退场
	for (var i = 0; i < data.creatures.length; i++) {
		var c = data.creatures[i];
		if (c.status == "appear") {
			c.status = "normal";
		}
	}
}

function createCreature(cObj, randomOutput) {
	d1.sm("do_Page").fire("creatrue_appear", cObj);

	var descs = cObj.desc.random;
	for (var i = 0; i < descs.length; i++) {
		var desc = {};
		desc.obj = cObj;
		desc.content = descs[i];
		randomOutput.push(desc);
	}
}
function getRandomDesc(randomOutput) {
	if (!randomOutput || randomOutput.length <= 0)
		return;
	// 随机显示人物的语言和动作
	var max = randomOutput.length * 10;
	if (max < 100)
		max = 100;
	var r = util.getRandom(max);
	if (r < randomOutput.length) {
		var descObj = randomOutput[r];
		var cObj = descObj.obj;
		var desc = util.render(descObj.content, creature.getColorName(cObj));
		desc = "<" + cObj.type + "-action>" + desc + "</" + cObj.type + "-action>";
		return desc;
	}
}
module.exports.interact = function(me, _data, _callback) {
	var data = _data.data;
	if (_data.tag == "ask") {
		ask(me, data, _callback);
	}
	if (_data.tag == "fight") {
		battle(me, data, "fight")
	}
	if (_data.tag == "kill") {
		battle(me, data, "kill")
	}
}
function ask(_m, _creature, _callback) {
	var aDesc = _creature.desc.ask;
	if (!aDesc)
		aDesc = _m.desc.ask;
	aDesc = util.render(aDesc, creature.getColorName(_m), null, creature.getColorName(_creature), null, _creature.call);
	aDesc = "<pc-say>" + aDesc + "</pc-say>";
	_callback(aDesc);

	var rDesc = _creature.desc.reply;
	if (!rDesc)
		rDesc = "{{source}}看了看，没理你";
	rDesc = util.render(rDesc, creature.getColorName(_creature));
	rDesc = "<npc-say>" + rDesc + "</npc-say>";
	_callback(rDesc);
}

function battle(_m, _creature, _tag) {
	var bObj = {};
	bObj.tag = _tag;// fight 或kill
	bObj.me = _m;
	bObj.enemy = _creature;
	d1.sm("do_App").openPage({
		source : "source://view/battle/index.ui",
		statusBarBgColor : "111111FF",
		data : bObj
	});
}