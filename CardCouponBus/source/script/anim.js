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
//Scale缩放
module.exports.animScale = function(animid,fx,fy,tox,toy,dur){
	var animScale = deviceone.mm("do_Animation");
	animScale.fillAfter = true;
	animScale.scale({
	    delay: 0,
	    duration: dur,
	    curve: "EaseOut",
	    scaleFromX: fx,
	    scaleFromY: fy,
	    scaleToX: tox,
	    scaleToY: toy,
	    pivotX: 0.5,
	    pivotY: 0.5
	});
	animid.animate(animScale);
}

//BK动画
module.exports.animBK = function(animid,options,dur,curve,callback){
	var animBK = deviceone.mm("do_Animator");
	animBK.append(dur, options, curve);
	animid.animate(animBK,function(){
		callback();
	});
}
//BK2动画
module.exports.animBK2 = function(animid,options,options2,dur,dur2,curve,callback){
	var animBK = deviceone.mm("do_Animator");
	animBK.append(dur, options, curve);
	animBK.append(dur2, options2, curve);
	animid.animate(animBK,function(){
		callback();
	});
}
//BKNO动画
module.exports.animBKN = function(animid,options,dur,curve){
	var animBK = deviceone.mm("do_Animator");
	animBK.append(dur, options, curve);
	animid.animate(animBK);
}
//BKN2动画
module.exports.animBKN2 = function(animid,options,options2,dur,dur2,curve){
	var animBK = deviceone.mm("do_Animator");
	animBK.append(dur, options, curve);
	animBK.append(dur2, options2, curve);
	animid.animate(animBK);
}