/**
 * related to equipmentLayout.ui
 * 
 * @Author : and
 * @Timestamp : 2017-01-28
 */
var dojs = require("dojs");
var Util = require("util");
var Equipment = require("equipment");
var Weapon = require("weapon");

var bodys = [ "left", "right", "head", "neck", "body", "leg", "foot" ];
var currentData = [ {}, {}, {}, {}, {}, {}, {} ];
var currentPC;
var descs = [ "左手", "右手", "头部", "颈部", "身体", "腿部", "脚步" ]
for (var i = 0; i < bodys.length; i++) {
	dojs.style.css(ui(bodys[i]), "dynamicButton");
}

ui("$").on("init", function(pc) {
	currentPC = pc;
	for (var i = 0; i < bodys.length; i++) {
		remove(i);
		if (pc.wield && pc.wield[bodys[i]]) {
			var item = Util.getObjectByID(currentPC.wield[bodys[i]]);
			wield(i, item);
		}
	}
	compute();
})
function compute() {
	ui("attack_physical").text = "0/0";
	if (currentPC.wield.right)
		ui("attack_physical").text = Weapon.init(currentPC.wield.right).damage;
	var defend = [ 0, 0, 0, 0, 0, 0 ];
	for (var j = 0; j < 6; j++) {
		for (var i = 0; i < bodys.length; i++) {
			if (currentPC.wield[bodys[i]]) {
				defend[j] = defend[j] + currentPC.wield[bodys[i]][j];
			}
		}
	}
	for (var j = 0; j < 6; j++) {
		ui("defend" + j).text = defend[j];
	}
	currentPC.defend = defend;
}
function wield(i, item) {
	if (currentPC.wield) {
		currentData[i] = item;
		ui(bodys[i]).text = currentData[i].name;
		ui(bodys[i]).fontColor = Equipment.getColor(currentData[i]);
	}
}

function remove(i) {
	currentData[i] = {};
	ui(bodys[i]).text = descs[i];
	ui(bodys[i]).fontColor = "696969AA";
}
for (var i = 0; i < bodys.length; i++) {
	ui(bodys[i]).on("touch", i, 1000, function(d, e) {
		var index = e.data;
		sm("do_Page").fire("equipedItemSelected", currentData[index]);
		var lastSelected = sm("do_Global").getMemory("lastSelectedItem");
		if (lastSelected)
			ui(lastSelected).bgColor = "00000000";
		ui(bodys[index]).bgColor = "69696955";
		sm("do_Global").setMemory("lastSelectedItem", ui(bodys[index]).getAddress());
	})
}