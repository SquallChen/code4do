/**
 * New DeviceOne File
 */
var d1 = require("deviceone");
var util = require("util");
var MAX_COUNT = 10;

module.exports.getCount = function() {
	return MAX_COUNT;
};

module.exports.play = function(canvas, label, index) {
	canvas.clear();
	switch (index) {
	case 1:
		play1(canvas, label);
		break;
	case 2:
		play2(canvas, label);
		break;
	case 3:
		play3(canvas, label);
		break;
	case 4:
		play4(canvas, label);
		break;
	default:
		break;
	}
	canvas.paint();
};
function paintBase(canvas,express, oa, va) {
	util.paintExpression(canvas, express, {
		x : 375,
		y : 120
	});
	util.paintStack(canvas, "操作数栈", oa, {
		x : 150,
		y : 250
	}, {
		w : 100,
		h : 400
	});
	util.paintStack(canvas, "运算符栈", va, {
		x : 500,
		y : 250
	}, {
		w : 100,
		h : 400
	});
}
function play1(canvas, label) {
	paintBase(canvas,"(1+((5*4)+3))", [], []);
	var comment = "Dijkstra双栈算法用于计算一个数学表达式字符串的值,这里以\"(1+((5*4)+3))\"为例.\n首先需要有2个栈,一个用于存储运算符比如+-*/,其它的数字存储于操作数栈.";
	label.text = comment;
}
function play2(canvas, label) {
	paintBase(canvas,"1+((5*4)+3))", [], []);
	var comment = "表达式从左到右,一个个字符开始解析,碰到左括号{就不做任务处理,跳过!";
	label.text = comment;
}
function play3(canvas, label) {
	paintBase(canvas,"+((5*4)+3))", ["1"], []);
	var comment = "1 不是运算符,是操作数,压入操作数栈";
	label.text = comment;
}
function play4(canvas, label) {
	paintBase(canvas,"((5*4)+3))", ["1"], ["+"]);
	var comment = "+ 是运算符,压入运算符栈";
	label.text = comment;
}
