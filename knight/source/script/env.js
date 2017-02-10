/**
 * New DeviceOne File
 */
/**
 * New DeviceOne File
 */
var util = require("util");
var dojs = require("dojs");
var d1 = require("deviceone");
module.exports.init = function() {
	var data = util.getObjectByID("env");
	initTimer(data);
	return data;// 返回最后的位置
}

function save(data) {
	var dataFile = "data://env";
	d1.sm("do_Storage").writeFile(dataFile + ".json", data);
}
function initTimer(data) {
	var app = d1.sm("do_App");
	var timer = d1.mm("do_Timer", "time", "app");
	timer.interval = 2000;

	timer.on("tick", function() {
		data.time = data.time + 1;
		app.fire("time", data.time);
	})
	if (!timer.isStart()) {
		timer.start();
	}

	d1.sm("do_Global").on("background", function() {
		if (timer.isStart()) {
			timer.stop();
		}
		save(data);
	}).on("foreground", function() {
		if (!timer.isStart()) {
			timer.start();
		}
	})
}