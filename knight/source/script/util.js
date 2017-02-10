/**
 * New DeviceOne File
 */
var d1 = require("deviceone");
var dojs = require("dojs");
var cachedata = {};

module.exports.getRandom = function(max) {
	// 取0到max之间的随机值，可以为0，不包括max，max为整数
	return parseInt(Math.random() * max);
};
module.exports.getRandomMin2Max = function(min, max) {
	// 取min到max之间的随机值，可以为min，包括max，max为整数
	var r = parseInt(Math.random() * (max - min + 1))
	return min + r;
};
module.exports.getRandomMinAndMax = function(v) {
	// v是xx/yy的格式取xx到yy之间的随机值，可以为xx，包括yy为整数
	var vs = v.split("/");
	var min = parseInt(vs[0]);
	var max = parseInt(vs[1]);
	var r = parseInt(Math.random() * (max - min + 1))
	return min + r;
};
module.exports.getRandomValue = function(array) {
	// 从数组中随机选一个
	var max = array.length;
	var i = parseInt(Math.random() * max);
	return array[i];
};
module.exports.getRandomTrueOrFalse = function(rate) {
	// 给定一个随机概率值<1，判断是或否
	return (rate >= Math.random());
};

module.exports.getMutilRandom = getMutilRandom;
function getMutilRandom(max, count, array) {
	if (count > max)
		return;
	// 取0到max之间的多个随机值，可以为0，不包括max，max为整数
	var r = parseInt(Math.random() * max);
	var allNotSame = true;
	for (var i = 0; i < array.length; i++) {
		if (array[i] == r) {
			allNotSame = false;
			break;
		}
	}
	if (allNotSame) {
		array.push(r);
	}
	if (array.length == count)
		return;
	getMutilRandom(max, count, array);
};

module.exports.getObjectByID = function(id) {
	if (cachedata[id]) {
		return cachedata[id];
	}
	var path = id.replace(/\./g, "/");
	var dataFile = "data://" + path;
	var initDataFile = "initdata://" + path;
	if (d1.sm("do_Storage").fileExist(dataFile + ".json")) {
		cachedata[id] = d1.sm("do_Storage").readFileSync(dataFile + ".json");
		return cachedata[id];
	} else {
		cachedata[id] = d1.sm("do_InitData").readFileSync(initDataFile + ".json");
		d1.sm("do_Storage").writeFile(dataFile + ".json", cachedata[id]);
		return cachedata[id];
	}
};
module.exports.save = function(data, id) {
	var path = id.replace(/\./g, "/");
	var dataFile = "data://" + path;
	d1.sm("do_Storage").writeFile(dataFile + ".json", data);
}
// 这些对象都是多实例的，每次都构建新的
module.exports.newObject = function(id) {
	var path = id.replace(/\./g, "/");
	var dataFile = "data://" + path;
	var initDataFile = "initdata://" + path;
	if (d1.sm("do_Storage").fileExist(dataFile + ".json")) {
		return d1.sm("do_Storage").readFileSync(dataFile + ".json");
	} else {
		var content = d1.sm("do_InitData").readFileSync(initDataFile + ".json");
		d1.sm("do_Storage").writeFile(dataFile + ".json", content);
		return content;
	}
};
// 转换 {{source.wield.right}}，{{source}},{{target}},{{target.call}}
module.exports.render = function(desc, source, source_wield_right, target, target_wield_right, target_call) {

	if (desc && desc.indexOf("{{source.wield.right}}") >= 0 && source_wield_right) {
		desc = desc.replace(/{{source.wield.right}}/g, source_wield_right);
	}
	if (desc && desc.indexOf("{{target.wield.right}}") >= 0 && target_wield_right) {
		desc = desc.replace(/{{target.wield.right}}/g, target_wield_right);
	}
	if (desc && desc.indexOf("{{source}}") >= 0 && source) {
		desc = desc.replace(/{{source}}/g, source);
	}
	if (desc && desc.indexOf("{{target}}") >= 0 && target) {
		desc = desc.replace(/{{target}}/g, target);
	}
	if (desc && desc.indexOf("{{target.call}}") >= 0 && target_call) {
		desc = desc.replace(/{{target.call}}/g, target_call);
	}
	return desc;
};