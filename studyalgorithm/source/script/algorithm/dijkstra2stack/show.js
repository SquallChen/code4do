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
	var comment = "";
	switch (index) {
	case 0:
		comment = "Dijkstra双栈算法用于计算一个数学表达式字符串的值,这里以\"(1+((5*4)+3))\"为例.\n首先需要有2个栈,一个用于存储运算符比如+-*/,其它的数字存储于操作数栈.";
		paintBase(canvas, "", "(1+((5*4)+3))", [], [], label, comment);
		break;
	case 1:
		comment = "表达式从左到右,一个个字符开始解析,碰到左括号 { 就不做任何处理,跳过!";
		paintBase(canvas, "(", "1+((5*4)+3))", [], [], label, comment);
		break;
	case 2:
		comment = " 1 不是运算符,是操作数,压入操作数栈";
		paintBase(canvas, "(1", "+((5*4)+3))", [ "1" ], [], label, comment);
		break;
	case 3:
		comment = " + 是运算符,压入运算符栈";
		paintBase(canvas, "(1+", "((5*4)+3))", [ "1" ], [ "+" ], label, comment);
		break;
	case 4:
		comment = " (( 连续2个左括号都不做任何处理";
		paintBase(canvas, "(1+((", "5*4)+3))", [ "1" ], [ "+" ], label, comment);
		break;
	case 5:
		comment = " 5 继续压入操作数栈,接着把 * 压入运算符栈,再把 4 压入操作数栈";
		paintBase(canvas, "(1+((5*4", ")+3))", [ "1", "5", "4" ], [ "+", "*" ],
				label, comment);
		break;
	case 6:
		comment = " 碰到第一个右括号 ) .这个时候需要做好几个步骤:\n1. 先从操作数栈里出栈2个数字分别是5和4\n2. 从运算符栈出栈一个符号,也就是*\n3. 计算5*4=20再把结果20压入操作数栈";
		paintBase(canvas, "(1+((5*4)", "+3))", [ "1", "20" ], [ "+" ], label,
				comment);
		break;
	case 7:
		comment = " 加号和3继续压入操作数栈和运算符栈";
		paintBase(canvas, "(1+((5*4)+3", "))", [ "1", "20", "3" ],
				[ "+", "+" ], label, comment);
		break;
	case 8:
		comment = " 碰到右括号 ),,操作数栈出栈2个数:20和3,运算符出栈 + ,计算20+3=23,把23再压栈道操作数栈";
		paintBase(canvas, "(1+((5*4)+3)", ")", [ "1", "23" ], [ "+" ], label,
				comment);
		break;
	case 8:
		comment = " 最后一个碰到右括号 ),操作数栈出栈2个数:23和1,运算符出栈 + ,计算23+1=24,把24再压栈道操作数栈";
		paintBase(canvas, "(1+((5*4)+3)", ")", [ "24" ], [], label, comment);
		break;
	case 9:
		comment = " 最后操作数栈出栈1个数:24就是最后结果,运算完毕!";
		paintBase(canvas, "(1+((5*4)+3))", ")", [], [], label, comment);
		break;
	default:
		break;
	}
	canvas.paint();
};
function paintBase(canvas, express1, express2, oa, va, label, comment) {
	paintExpression(canvas, express1, express2, {
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
	label.text = comment;
}
function paintExpression(canvas, data1, data2, position) {
	canvas.strokeColor = "CCCCCCFF";
	var leftPostion = {};
	leftPostion.x = position.x - 120;
	leftPostion.y = position.y;
	canvas.defineText({
		text : data1,
		coord : leftPostion,
		fontStyle : "normal",
		textFlag : "normal",
		textAlign : "center",
		fontSize : 32,
	});
	canvas.strokeColor = "000000FF";
	canvas.defineText({
		text : data2,
		coord : position,
		fontStyle : "normal",
		textFlag : "normal",
		textAlign : "center",
		fontSize : 32,
	});
}