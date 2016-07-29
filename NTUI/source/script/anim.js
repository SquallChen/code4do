/**
 * New DeviceOne File
 */
var deviceone = require("deviceone");
var root = deviceone.ui("$");
var page = deviceone.sm("do_Page");
var app = deviceone.sm("do_App");
var nf = deviceone.sm("do_Notification");

//按下动画
module.exports.animbtn = function(animid){
	var animbtn = deviceone.mm("do_Animator");
	var propsbtn = {alpha:0.2};
	var propsbtn1 = {alpha:1};
	animbtn.append(100, propsbtn);
	animbtn.append(200, propsbtn1);
	animid.animate(animbtn);
}
//按下动画1
module.exports.animbtn1 = function(animid){
	var animbtn = deviceone.mm("do_Animator");
	var propsbtn = {alpha:0.5};
	var propsbtn1 = {alpha:1};
	animbtn.append(100, propsbtn);
	animbtn.append(200, propsbtn1);
	animid.animate(animbtn);
}
//Y动画
module.exports.animY = function(animid,ynum,dur){
	var animY = deviceone.mm("do_Animator");
	var propsY = {y:ynum};
	animY.append(dur, propsY);
	animid.animate(animY);
}
//height动画
module.exports.animH = function(animid,Hnum,dur){
	var animH = deviceone.mm("do_Animator");
	var propsH = {height:Hnum};
	animH.append(dur, propsH);
	animid.animate(animH);
}
//height动画
module.exports.animBg = function(animid,bgColor,dur){
	var animBg = deviceone.mm("do_Animator");
	var propsBg = {bgColor:bgColor};
	animBg.append(dur, propsBg);
	animid.animate(animBg);
}
//Scale缩放
module.exports.animScale = function(animid,tox,toy,dur){
	var animScale = deviceone.mm("do_Animation");
	animScale.scale({
	    delay: 0,
	    duration: dur,
	    curve: "EaseOut",
	    scaleFromX: 1,
	    scaleFromY: 1,
	    scaleToX: tox,
	    scaleToY: toy,
	    pivotX: 0.5,
	    pivotY: 0.5
	});
	animid.animate(animScale);
}