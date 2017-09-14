/**
 * New DeviceOne File
 */
var d1 = require("deviceone");

module.exports.paintStack = function(canvas, name, data, position, size) {
	canvas.strokeColor = "000000FF";
	var x = position.x;
	var y = position.y;
	var w = (size) ? size.w : 50;
	var h = (size) ? size.h : 200;
	canvas.defineLine({
		x : x,
		y : y
	}, {
		x : x,
		y : y + h
	});
	canvas.defineLine({
		x : x,
		y : y + h
	}, {
		x : x + w,
		y : y + h
	});
	canvas.defineLine({
		x : x + w,
		y : y + h
	}, {
		x : x + w,
		y : y
	});
	if (data) {
		for (var i = 0; i < data.length; i++) {
			canvas.defineText({
				text : data[i],
				coord : {
					x : x + w / 2 - 8 * (data[i].toString().length),
					y : y + h - 40 - 40 * i
				},
				fontStyle : "normal",
				textFlag : "normal",
				fontSize : 32,
			});
			canvas.defineLine({
				x : x,
				y : y + h - 40 - 40 * i
			}, {
				x : x + w,
				y : y + h - 40 - 40 * i
			});
		}
	}
	canvas.defineText({
		text : name,
		coord : {
			x : x,
			y : y + h + 10
		},
		fontStyle : "bold",
		textFlag : "normal",
		fontSize : 32,
	});
};