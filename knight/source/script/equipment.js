/**
 * New DeviceOne File
 */
var d1 = require("deviceone");
var dojs = require("dojs");
var Util = require("util");
var Weapon = require("weapon");

module.exports.getColor = function(data) {
	if (data.type == "weapon")
		return Weapon.getColor(data);
	return "CCCCCCFF";
}

module.exports.getDetailDesc = function(_item) {
	switch (_item.type) {
	case "shield":
	case "armor":
	case "weapon":
		return Weapon.getDetailDesc(_item);
	default:
		return _item.desc.look;
	}
}
module.exports.add = function(backpackData, _item_id) {
	var d = {
		id : _item_id,
		count : 1
	};
	for (var i = 0; i < backpackData.objs.length; i++) {
		if (backpackData.objs[i] == "blank") {
			backpackData.objs[i] = d;
			return;
		}
	}
	backpackData.objs.push(d)
}
module.exports.remove = function(backpackData, _item_id) {
	for (var i = 0; i < backpackData.objs.length; i++) {
		if (backpackData.objs[i] != "blank" && backpackData.objs[i].id == _item_id) {
			backpackData.objs[i] = "blank";
			return;
		}
	}
}
module.exports.save = function(backpackData) {
	Util.save(backpackData, backpackData.id);
}