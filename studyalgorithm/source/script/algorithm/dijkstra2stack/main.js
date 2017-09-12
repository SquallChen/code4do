var d1 = require("deviceone");

module.exports.run = function() {
	var s = "(1+((5*4)+3))";
	return run(s.split(""));
};
function run(a) {
	var stackOps = [];
	var stackVal = [];
	for (var i = 0; i < a.length; i++) {
		switch (a[i]) {
		case "(":
			break;
		case "+":
		case "-":
		case "*":
		case "/":
			stackOps.push(a[i]);
			break;
		case ")":
			var v1 = parseFloat(stackVal.pop());
			var v2 = parseFloat(stackVal.pop());
			var opt = stackOps.pop();
			var v;
			switch (opt) {
			case "+":
				v = v1 + v2;
				break;
			case "-":
				v = v1 - v2;
				break;
			case "*":
				v = v1 * v2;
				break;
			case "/":
				v = v1 / v2;
				break;
			}
			d1.print(v);
			stackVal.push(v);
			break;
		default:
			stackVal.push(a[i]);
		}
	}
	return stackVal.pop();
}