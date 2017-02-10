/**
 * related to index.ui
 * 
 * @Author : and
 * @Timestamp : 2017-01-28
 */
// require
var Creature = require("creature");
var dojs = require("dojs");
var Util = require("util");
var Equipment = require("equipment");

// variables
var pcs = [];
var currentSelectItem;
var currentPC;
var backPackData;
var me = Creature.init("pc.me");

// initialize
(function() {
	initData();
})();
// event
sm("do_Page").on("loaded", function() {
	initLayout();
}).on("itemSelected", function(_item) {
	selectItem(_item, false);
}).on("pcSelected", function(p) {
	changePC(p);
}).on("equipedItemSelected", function(_item) {
	selectItem(_item, true);
}).on("back", function() {
	sm("do_App").closePage("backpack");
})
ui("closeButton").on("touch", function() {
	sm("do_App").closePage("backpack");
})
// private function
function refreshAction() {
	ui("useButton").visible = false;
	ui("wieldButton").visible = false;
	ui("removeButton").visible = false;
}
function selectItem(_item, isEquiped) {
	refreshAction();
	currentSelectItem = null;
	if (_item.desc && _item.desc.look) {
		currentSelectItem = _item;
		ui("titleLabel").text = _item.name;
		ui("itemDesc").text = Equipment.getDetailDesc(_item);
		if (_item.type == "shiled" || _item.type == "armor" || _item.type == "weapon") {
			if (isEquiped)
				ui("removeButton").visible = true;
			else
				ui("wieldButton").visible = true;
		} else
			ui("useButton").visible = true;
	}
}
function initData() {
	sm("do_Global").setMemory("lastSelectedItem", "");
	pcs.push(me);
	if (me.ally) {
		for (var i = 0; i < me.ally.length; i++) {
			pcs.push(Creature.init(me.ally[i]));
		}
	}
}
function initLayout() {
	dojs.style.css([ ui("closeButton"), ui("useButton"), ui("wieldButton"), ui("removeButton") ], "dynamicButton");
	ui("do_ALayout_5").add("equipmentLayout", "source://view/backpack/equipmentLayout.ui", 0, 0);
	ui("do_ALayout_4").add("nameLayout", "source://view/common/nameLayout.ui", 0, 0);
	ui("do_ALayout_7").add("backPack", "source://view/backpack/backPack.ui", 0, 60);
	ui("nameLayout").fire("init", pcs);
	backPackData = Util.getObjectByID("pc.backpack");
	ui("backPack").fire("init", backPackData);
	changePC(me);
	ui("useButton").on("touch", function() {
		use();
	})
	ui("wieldButton").on("touch", function() {
		wield();
		afterChangeEquipment();
	})
	ui("removeButton").on("touch", function() {
		remove();
		afterChangeEquipment();
	})
}
function afterChangeEquipment() {
	refreshAction();
	// dojs.core.p(currentPC, "after pc");
	// dojs.core.p(backPackData, "after backpack");
	ui("equipmentLayout").fire("init", currentPC);
	Util.save(currentPC, currentPC.id);
	ui("backPack").fire("update", backPackData);
	Equipment.save(backPackData);
}
function changePC(_pc) {
	currentPC = _pc;
	ui("equipmentLayout").fire("init", currentPC);
}
function use() {

}
function wield() {
	if (currentSelectItem.wield.indexOf("right") >= 0) {
		// 如果不匹配武器技能，不能装备
		if (!currentPC.skills[currentSelectItem.match]){
			sm("do_Notification").toast("你不能装备这件武器！");
			return;
		}
	}
	for ( var key in currentPC.wield) {
		// right&left 需要remove左手和右手
		if (currentSelectItem.wield.indexOf(key) >= 0) {
			Equipment.add(backPackData, currentPC.wield[key]);
			delete currentPC.wield[key];
		}
	}
	if (currentSelectItem.wield == "right&left")
		currentPC.wield["right"] = currentSelectItem.id;
	else
		currentPC.wield[currentSelectItem.wield] = currentSelectItem.id;
	Equipment.remove(backPackData, currentSelectItem.id);
}
function remove() {
	for ( var key in currentPC.wield) {
		if (currentPC.wield[key] == currentSelectItem.id) {
			delete currentPC.wield[key];
			break;
		}
	}
	Equipment.add(backPackData, currentSelectItem.id);
}