var deviceone = require("deviceone");
var cacher = deviceone.sm("do_DataCache");
var page = deviceone.sm("do_Page");
var storage = deviceone.sm("do_Storage");

var $U = require("url");
module.exports.compare = function(path,callback){
	var img_http = deviceone.mm("do_Http");
	img_http.timeout = 60000; // 超时时间 : 单位 毫秒
	img_http.contentType = "application/json"; // Content-Type
	img_http.on("success", function(databus) {
		callback(json.path);
	});

	img_http.on("fail", function(databus) {
		//deviceone.print(JSON.stringify(databus),"2");
	});
	img_http.on("progress", function(databus) {
		//deviceone.print(JSON.stringify(databus),"3");
	});
	
	var json = cacher.loadData("userLogin");
	var flag = false;
	if(json!="" && json.defaultHead!=undefined){
		if(json.defaultHead==path){   //当前图片和缓存中的图片一致
			if(json.path==undefined || json.path==""){
				if(path==""){
					json.path = $U.defaultImg("");
					cacher.saveData("userLogin", json);
					callback(json.path);
				}else{
					flag=true;
				}
			}else{
				if(storage.fileExist(json.path)){
					callback(json.path);
				}else{
					flag=true;
				}
			}
		}else{
			json.defaultHead = path;
			cacher.saveData("userLogin", json);
			flag=true;
		}
	}
	if(flag){
		var myDate = new Date();
		var name = myDate.getFullYear().toString()+(myDate.getMonth()+1).toString()+myDate.getDate().toString()+(myDate.getHours()+1).toString()+myDate.getMinutes().toString()+myDate.getSeconds().toString()+myDate.getMilliseconds().toString();
		
		json.path = "data://head/"+name+path.substring(path.lastIndexOf('.'));
		cacher.saveData("userLogin", json);
		
		img_http.url = path;
		img_http.download(json.path);
	}
};
