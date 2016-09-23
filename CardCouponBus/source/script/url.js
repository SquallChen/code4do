var deviceone = require("deviceone");
var open = require("open");
var cacher = deviceone.sm("do_DataCache");

var Euc = encodeURIComponent;

//var domain = "http://192.168.1.109:9862/";
var domain = "http://123.56.132.95/";
var oatestapi = domain + "app/";

var merchant = oatestapi + "appMerchant/";
var roll = oatestapi + "appRoll/";
var evaluate = oatestapi + "appEvaluate/";

var url = {
	merchantLogin: merchant+"appMerchantLogin",
	merchantInfo: merchant+"appMerchantInfo",
	merchantNoticeEdit: merchant+"appMerchantNoticeEdit",
	merchantRecommendEdit: merchant+"appMerchantRecommendEdit",
	merchantRecruitmentList: merchant+"appMerchantRecruitmentList",
	merchantRecruitmentEdit: merchant+"appMerchantRecruitmentEdit",
	merchantRecruitmentDel: merchant+"appMerchantRecruitmentDel",
	merchantRecruitmentInfo: merchant+"appMerchantRecruitmentInfo",
	merchantPaymentRecords: merchant+"appMerchantPaymentRecords",
	merchantSettlement: merchant+"appMerchantSettlement",
	merchantApplySettlement: merchant+"appMerchantApplySettlement",
	
	rollMerchantList: roll+"appRollMerchantList",
	rollMerchantRelease: roll+"appRollMerchantRelease",
	rollMerchantSoldOut: roll+"appRollMerchantSoldOut",
	rollSweepCode: roll+"appRollSweepCode",
	rollSweepCodeUse: roll+"appRollSweepCodeUse",
	rollSweepCodeRecord: roll+"appRollSweepCodeRecord",
	
	evaluateTitle: evaluate+"appEvaluateTitle",
	evaluateList: evaluate+"appEvaluateList",
	evaluateMerchantsReply: evaluate+"appEvaluateMerchantsReply"
}

var token = function(url,name){
	var json = cacher.loadData("userLogin");
	var _token = json.storeToken;
	if(_token==undefined)
		_token = "";
    return url + "?"+name+"=" + Euc(_token);
};

//默认图片
var defaultImg = function(path){
	if(path==null || path==undefined || path==""){
		return "source://image/quesheng_th.jpg";
	}else{
		return path;
	}
}

var loadCacher = function(name,key,value){
	if(key==""){
		cacher.saveData(name, {});
	}else{
		var json = cacher.loadData(name);
		json[key] = value;
		cacher.saveData(name, json);
	}
}

var tokenExist = function(){
	var json = cacher.loadData("userLogin");
	return (json!="" && json!=undefined);
};

//未登录跳转页面
var tokenPage = function(url,data){
	if(tokenExist()){
		open.startb(url,"push_r2l_1",data);
	}else{
		open.startb("source://view/logreg/login.ui","push_r2l_1",{url:url,option:data});
	}
}

module.exports.url = url;
module.exports.token = token;
module.exports.defaultImg = defaultImg;
module.exports.loadCacher = loadCacher;
module.exports.tokenPage = tokenPage;
module.exports.tokenExist = tokenExist;