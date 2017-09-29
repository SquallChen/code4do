/**
 * New DeviceOne File
 */
var d1 = require("deviceone");
var util = require("util");
var MAX_COUNT = 14;

module.exports.getCount = function() {
	return MAX_COUNT;
};

module.exports.play = function(canvas, label, index) {
	canvas.clear();
	var comment = "";
	util.paintBg(canvas);
	switch (index) {
	case 0:
		comment = "union-find算法用于解决有连接关系的多点之间如何快速判断任意二个点是否有连接的问题（动态连通性）。\n quick-find是其中最简单的实现方式。\n假定有10个点，标记为从0-9。 左边每一行2个数字表示这2个点之间有连接。\n我们需要一步步把这些点连接上，连接前先判定这2个点是否已经连接上了。";
		paintPointGroup(canvas, 250, 100, true);
		paintLineText(canvas);
		break;
	case 1:
		comment = "我们先初始化一个长度为10的数组ids，每个元素的值等于其索引，也就是：\nids[0]=0,ids[1]=1...";
		paintIds(canvas, [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 1, 2, 3, 4, 5, 6,
				7, 8, 9 ]);
		break;
	case 2:
		paintPointGroup(canvas, 250, 150, false, [ [ 4, 3 ] ]);
		comment = "第一个判定的2个数是4 3，我们先比较ids[4]和ids[3]的值是否一样，肯定不一样。\n这2个点没有连接，我们把它连接上。\n我们看id[4]=4,然后遍历ids，看看那个元素的值为4,就把这个值改为3，这次只需要改一个值";
		paintLineText(canvas);
		paintIds(canvas, [ 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ], [ 0, 1, 2, 3, 3, 5, 6,
				7, 8, 9 ]);
		break;
	case 3:
		paintPointGroup(canvas, 250, 224, false, [ [ 4, 3 ], [ 3, 8 ] ]);
		comment = "再看3 8，我们先比较ids[3]=3和ids[8]=8的值是否一样，不一样。\n这2个点没有连接，我们把它连接上。\n我们看id[3]=3,然后遍历ids，看看那个元素的值为3,就把这个值改为8，这次只需要改2个值";
		paintLineText(canvas);
		paintIds(canvas, [ 0, 0, 0, 1, 1, 0, 0, 0, 0, 0 ], [ 0, 1, 2, 8, 8, 5, 6,
				7, 8, 9 ]);
		break;
	case 4:
		paintPointGroup(canvas, 250, 298, false, [ [ 4, 3 ], [ 3, 8 ], [ 6, 5 ] ]);
		comment = "再看6 5，我们先比较ids[6]=6和ids[5]=5的值是否一样，不一样。\n这2个点没有连接，我们把它连接上。\n我们看id[6]=6,然后遍历ids，看看那个元素的值为6,就把这个值改为5，这次只需要改1个值";
		paintLineText(canvas);
		paintIds(canvas, [ 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 ], [ 0, 1, 2, 8, 8, 5, 5,
				7, 8, 9 ]);
		break;
	case 5:
		paintPointGroup(canvas, 250, 372, false, [ [ 4, 3 ], [ 3, 8 ], [ 6, 5 ],
				[ 9, 4 ] ]);
		comment = "再看9 4，我们先比较ids[9]=9和ids[4]=8的值是否一样，不一样。\n这2个点没有连接，我们把它连接上。\n我们看id[9]=9,然后遍历ids，看看那个元素的值为9,就把这个值改为8，这次只需要改1个值";
		paintLineText(canvas);
		paintIds(canvas, [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ], [ 0, 1, 2, 8, 8, 5, 5,
				7, 8, 8 ]);
		break;
	case 6:
		paintPointGroup(canvas, 250, 446, false, [ [ 4, 3 ], [ 3, 8 ], [ 6, 5 ],
				[ 9, 4 ], [ 2, 1 ] ]);
		comment = "再看2 1，我们先比较ids[2]=2和ids[1]=1的值是否一样，不一样。\n这2个点没有连接，我们把它连接上。\n我们看id[2]=2,然后遍历ids，看看那个元素的值为2,就把这个值改为1，这次只需要改1个值";
		paintLineText(canvas);
		paintIds(canvas, [ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 1, 1, 8, 8, 5, 5,
				7, 8, 8 ]);
		break;
	case 7:
		paintPointGroup(canvas, 250, 520, false, [ [ 4, 3 ], [ 3, 8 ], [ 6, 5 ],
				[ 9, 4 ], [ 2, 1 ] ]);
		comment = "再看8 9，我们先比较ids[8]=8和ids[9]=8的值是否一样，一样。\n这2个点连接上了,无需再处理。";
		paintLineText(canvas);
		paintIds(canvas, [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 1, 1, 8, 8, 5, 5,
				7, 8, 8 ]);
		break;
	case 8:
		paintPointGroup(canvas, 250, 594, false, [ [ 4, 3 ], [ 3, 8 ], [ 6, 5 ],
				[ 9, 4 ], [ 2, 1 ], [ 5, 0 ] ]);
		comment = "再看5 0，我们先比较ids[5]=5和ids[0]=0的值是否一样，不一样。\n这2个点没有连接，我们把它连接上。\n我们看id[5]=5,然后遍历ids，看看那个元素的值为5,就把这个值改为0，这次只需要改2个值";
		paintLineText(canvas);
		paintIds(canvas, [ 0, 0, 0, 0, 0, 1, 1, 0, 0, 0 ], [ 0, 1, 1, 8, 8, 0, 0,
				7, 8, 8 ]);
		break;
	case 9:
		paintPointGroup(canvas, 250, 668, false, [ [ 4, 3 ], [ 3, 8 ], [ 6, 5 ],
				[ 9, 4 ], [ 2, 1 ], [ 5, 0 ], [ 7, 2 ] ]);
		comment = "再看7 2，我们先比较ids[7]=7和ids[2]=1的值是否一样，不一样。\n这2个点没有连接，我们把它连接上。\n我们看id[7]=7,然后遍历ids，看看那个元素的值为7,就把这个值改为1，这次只需要改1个值";
		paintLineText(canvas);
		paintIds(canvas, [ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 ], [ 0, 1, 1, 8, 8, 0, 0,
				1, 8, 8 ]);
		break;
	case 10:
		paintPointGroup(canvas, 250, 742, false, [ [ 4, 3 ], [ 3, 8 ], [ 6, 5 ],
				[ 9, 4 ], [ 2, 1 ], [ 5, 0 ], [ 7, 2 ], [ 6, 1 ] ]);
		comment = "再看6 1，我们先比较ids[6]=0和ids[1]=1的值是否一样，不一样。\n这2个点没有连接，我们把它连接上。\n我们看id[6]=0,然后遍历ids，看看那个元素的值为0,就把这个值改为1，这次只需要改3个值";
		paintLineText(canvas);
		paintIds(canvas, [ 1, 0, 0, 0, 0, 1, 1, 0, 0, 0 ], [ 1, 1, 1, 8, 8, 1, 1,
				1, 8, 8 ]);
		break;
	case 11:
		paintPointGroup(canvas, 250, 816, false, [ [ 4, 3 ], [ 3, 8 ], [ 6, 5 ],
				[ 9, 4 ], [ 2, 1 ], [ 5, 0 ], [ 7, 2 ], [ 6, 1 ] ]);
		comment = "再看1 0，我们先比较ids[1]=1和ids[0]=1的值是否一样，一样。\n这2个点连接上了,无需再处理。";
		paintLineText(canvas);
		paintIds(canvas, [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 1, 1, 1, 8, 8, 1, 1,
				1, 8, 8 ]);
		break;
	case 12:
		paintPointGroup(canvas, 250, 890, false, [ [ 4, 3 ], [ 3, 8 ], [ 6, 5 ],
				[ 9, 4 ], [ 2, 1 ], [ 5, 0 ], [ 7, 2 ], [ 6, 1 ] ]);
		comment = "再看6 7，我们先比较ids[6]=1和ids[7]=1的值是否一样，一样。\n这2个点连接上了,无需再处理。";
		paintLineText(canvas);
		paintIds(canvas, [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 1, 1, 1, 8, 8, 1, 1,
				1, 8, 8 ]);
		break;
	case 13:
		paintPointGroup(canvas, 250, 890, false, [ [ 4, 3 ], [ 3, 8 ], [ 6, 5 ],
				[ 9, 4 ], [ 2, 1 ], [ 5, 0 ], [ 7, 2 ], [ 6, 1 ] ]);
		comment = "算法结束，可以看出每次判定2个点是否连接，需要遍历整个ids，这样在数据多的时候会比较低效。";
		paintLineText(canvas);
		paintIds(canvas, [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 1, 1, 1, 8, 8, 1, 1,
				1, 8, 8 ]);
		break;
	default:
		break;
	}
	label.text = comment;
	canvas.paint();
};
function paintIds(canvas, ids, vals) {
	canvas.strokeColor = "000000FF";
	canvas.defineText({
		text : "ids: ",
		coord : {
			x : 200,
			y : 70
		},
		fontStyle : "normal",
		textFlag : "normal",
		textAlign : "left",
		fontSize : 32,
	});
	for (var i = 0; i < ids.length; i++) {
		if (ids[i])
			canvas.strokeColor = "FF0000FF";
		else
			canvas.strokeColor = "000000FF";
		canvas.defineText({
			text : vals[i],
			coord : {
				x : 260 + 30 * i,
				y : 70
			},
			fontStyle : "normal",
			textFlag : "normal",
			textAlign : "left",
			fontSize : 32,
		});
	}
}

function paintLineText(canvas) {
	canvas
			.defineText({
				text : "4 3\n\n3 8\n\n6 5\n\n9 4\n\n2 1\n\n8 9\n\n5 0\n\n7 2\n\n6 1\n\n1 0\n\n6 7",
				coord : {
					x : 80,
					y : 160
				},
				fontStyle : "normal",
				textFlag : "normal",
				textAlign : "left",
				fontSize : 32,
			});
}
function paintPointGroup(canvas, _x, _y, isDrawText, points) {
	canvas.strokeColor = "000000FF";
	canvas.isFull = true;
	for (var i = 0; i < 5; i++) {
		if (isDrawText) {
			canvas.defineText({
				text : i,
				coord : {
					x : _x + 50 * i,
					y : _y - 40
				},
				fontStyle : "normal",
				textFlag : "normal",
				textAlign : "center",
				fontSize : 32,
			});

			canvas.defineText({
				text : 5 + i,
				coord : {
					x : _x + 50 * i,
					y : _y + 10
				},
				fontStyle : "normal",
				textFlag : "normal",
				textAlign : "center",
				fontSize : 32,
			});
		}
		canvas.defineCircle({
			point : {
				x : _x + 50 * i,
				y : _y
			},
			radius : 5
		});
		canvas.defineCircle({
			point : {
				x : _x + 50 * i,
				y : _y + 50
			},
			radius : 5
		});
	}
	if (points) {
		for (var l = 0; l < points.length; l++) {
			var p = points[l];
			var p1 = getPointCoor(p[0], _x, _y);
			var p2 = getPointCoor(p[1], _x, _y);
			canvas.defineLine(p1, p2);
		}
	}
}
function getPointCoor(index, _x, _y) {
	if (index < 5) {
		return {
			x : _x + 50 * index,
			y : _y
		};
	} else {
		return {
			x : _x + 50 * (index - 5),
			y : _y + 50
		};
	}
}
