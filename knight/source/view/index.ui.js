/**
 * @Author : and
 * @Timestamp : 2017-01-25
 */
// require
var dojs = require("dojs");
var util = require("util");
var env = require("env");
var Scene = require("scene");
var creature = require("creature");

// variable
var initTime, randomOutput, me, currentScene;
var listdata, listview;
var dirs = [ "center", "east", "west", "north_west", "north", "south", "north_east", "south_west", "south_east" ];
var dirsDesc = [ "", "东面是", "西面是", "西北方向是通往", "北面是", "南面是", "东北方向是通往", "西南方向是通往", "东南方向是通往" ];
var dirsID = [ "map", "", "", "", "", "", "", "", "" ];
// initialize
(function() {
	dojs.page.allowExit();
	me = creature.init("pc.me");
	listdata = mm("do_ListData");
	listview = ui("creatureListView");
	listview.bindItems(listdata);
	initMap();
})();
// event
sm("do_Page").on("webivew_loaded", function() {
	var envData = env.init();
	initScene(envData.current);
	sm("do_App").on("time", function(currentTime) {
		if (!initTime)
			initTime = currentTime;// 初始化进入场景的时间
		ui("timerLabel").text = currentTime;
		Scene.refresh(currentScene, currentTime, initTime, randomOutput, function(desc) {
			print(desc);
		});
	})
});

sm("do_Page").on("creatrue_appear", function(data) {
	listdata.addOne(data);
	listview.refreshItems();
	print(creature.getColorInitDesc(data));
});

sm("do_Page").on("interact", function(_d) {
	Scene.interact(me, _d, function(_desc) {
		print(_desc);
	});
});

sm("do_Page").on("result", function(_d) {
	if (_d == "backpack") {
		me = util.newObject(me.id);
		dojs.core.p(me, "after");
	} else if (_d.tag) {
		if (_d.tag == "win") {
			print("战斗胜利，获取到经验" + _d.exp);
			me.exp = me.exp + _d.exp;
			print("当前经验" + me.exp);
			var dahuang = util.getObjectByID("yangzhou.poshang.animal.dahuang");
			dahuang.exp = dahuang.exp + _d.exp;
			util.save(me, me.id);
			util.save(dahuang, dahuang.id);
			dojs.core.p(me.exp + "," + dahuang.exp);
		}
	}
});
ui("backpackLayout").on("touch", function() {
	util.save(me, me.id);
	dojs.core.p(me, "before");
	sm("do_App").openPage({
		source : "source://view/backpack/index.ui",
		statusBarBgColor : "111111FF",
	});
})
ui("roleLayout").on("touch", function() {
	sm("do_Notification").toast("开发中...")
})
ui("skillLayout").on("touch", function() {
	sm("do_Notification").toast("开发中...")
})
ui("questLayout").on("touch", function() {
	sm("do_Notification").toast("开发中...")
})
dojs.style.css([ ui("roleLayout"), ui("skillLayout"), ui("questLayout"), ui("backpackLayout") ], "dynamicButton");
ui("center").on("touch", function() {
	sm("do_Notification").toast("开发中...")
})
// private function
function initMap() {
	for (var i = 0; i < 9; i++) {
		var dir = ui(dirs[i]);
		dojs.style.css(dir, "dynamicButton");
		dir.on("touch", i, function(d, e) {
			go(dirsID[e.data]);
		})
	}
}
function go(direction) {
	if (direction == "map") {

	} else if (direction == "") {

	} else
		initScene(direction);
}
// 输出文字描述到webview组件
function print(_info, _type) {
	if (_type && _type == "init") {
		ui("webview").eval("init(\"" + _info + "\")");
	} else {
		ui("webview").eval("append(\"" + _info + "\")");
	}
}
function initScene(id) {
	randomOutput = [];
	listdata.removeAll();
	listview.refreshItems();
	if (currentScene)
		Scene.exit(currentScene);
	currentScene = Scene.init(id);
	ui("title_Label").text = currentScene.name;
	print(currentScene.desc.look, "init");
	initExits();
	initTime = null;
}
function initExits() {
	var exits = currentScene.exits;
	if (exits) {
		for (var i = 1; i < 9; i++) {
			var goD = exits[dirs[i]];
			ui(dirs[i]).text = "";
			ui(dirs[i]).border = "CCCCCC00,1,2"
			dirsID[i] = "";
			if (goD) {
				var _scene = Scene.init(goD.id);
				dirsID[i] = goD.id;
				ui(dirs[i]).text = _scene.name;
				ui(dirs[i]).border = "CCCCCCFF,1,2"
				print(dirsDesc[i] + "<scene>" + _scene.name + "</scene>");
			}
		}
	}
}