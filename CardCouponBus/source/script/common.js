var deviceone = require("deviceone");
var cacher = deviceone.sm("do_DataCache");
var device = deviceone.sm("do_Device");
var network = deviceone.sm("do_Network");
var global = deviceone.sm("do_Global");

//返回设备
var equipment = function(){
	var info = device.getInfo();
	if(info.OS=="android"){
		return 0;
	}else{   //if(info.OS=="iPhone OS")
		return 1;
	}
}

var ip = function(){
	return network.getIP({});
}

//分割字符串
var segmentation = function(str,n){
	var _str = "";
	for(var i=0;i<str.length;i++){
		_str+=str.charAt(i);
		if((i+1)%n==0){
			_str+=" ";
		}
	}
	return _str;
}

//字符串补位
var fillString = function(n,m,str){
	var _str = str.toString();
	while(_str.length<n){
		_str = m+_str;
	}
	return _str;
}

module.exports.equipment = equipment;
module.exports.ip = ip;
module.exports.segmentation = segmentation;
module.exports.fillString = fillString;