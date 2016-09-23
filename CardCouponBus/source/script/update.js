var deviceone = require("deviceone");
var app = deviceone.sm("do_App");
var storage = deviceone.sm("do_Storage");
var device = deviceone.sm("do_Device");
var nf = deviceone.sm("do_Notification");
var global = deviceone.sm("do_Global");
var external = deviceone.sm("do_External");
var initdata = deviceone.sm("do_InitData");

var $U = require("url");
var Euc = encodeURIComponent;
var param = {datafile:"data://version.txt",initdatafile:"initdata://version.txt"};

module.exports.compare = function(){
	var info = device.getInfo();
	if(info.OS=="android")
		param.equipment = 0;
	else{
		param.equipment = 1;
	}
	readFile();
}
//read文件
function readFile(){
	storage.readFile(param.datafile, function(data, e) {
		if(data==""){
			copyFile();
		}else{
			if(param.system!="" && data!=""){
				version_http.url = $U.url.versionContrast+"?version="+Euc(data)+"&name=appMerchantCardCoupon&type=APP&equipment="+param.equipment; // 请求的 URL
				version_http.request();
			}
		}
	});
}
//copy文件
function copyFile(){
	//从initdata文件中拷贝
	initdata.copy([param.initdatafile], "data://", function(flag, e) {
		if(flag){
			readFile();
		}
	});
}

var version_http = deviceone.mm("do_Http");
version_http.method = "POST";// GET | POST
version_http.timeout = 60000; // 超时时间 : 单位 毫秒
version_http.contentType = "application/json"; // Content-Type
version_http.on("success", function(databus) {
	if(databus.error_code==0){
		var _data = databus.DataSource;
		param.version = _data.versionNumber;
		param.path = $U.domain+_data.path.substring(1);
		if(_data.updateWay==1){  //从新安装
			nf.confirm({text:"发现新版本",title:"发现新版本"+_data.versionNumber, button2text:"稍后再说", button1text:"立马就去"},function(data, e) {
				if(data==1){
					stratUpdate(param.path);
				}
			});
		}else if(_data.updateWay==0){   //内更新
			InUpdate(param.path);
		}
	}
});
//打开对应的更新地址
function stratUpdate(path){
	external.openURL(path);
}

//内更新地址
function InUpdate(path){
	var http4;
	var zip = "initdata://update.zip";
	http4 = deviceone.mm("do_Http");
	http4.timeout = 300000;
	http4.contentType = "application/json";
	http4.url = path;
	 
	http4.on("success", function(data) {
		update(zip);
	});
	http4.download(zip)
}

//解压，然后覆盖旧的文件，然后更新本地版本号
function update(zip) {
	var updateFile = "data://update";
	initdata.unzip(zip, updateFile, function(data, e) {
		if(data){
			//这里可以拷贝文件，也可以拷贝目录
			app.update([updateFile],"source://", function(flag, e) {
	        	if(flag){
	                storage.writeFile(param.datafile, param.version,function(data1){
	                	
	                });
	        	}  
	        });
		}
	});
}