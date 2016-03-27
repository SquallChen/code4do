var deviceone = require("deviceone");
var nf = deviceone.sm("do_Notification");
var cacher = deviceone.sm("do_DataCache");

var domain = "http://www.shenghuafood.com";
var access_token = '';

/**
 * API 地址定义
 */
var api = {
	login: domain + '/user/token/login',
	articleView: domain + '/article/article/view',
	articleList: domain + '/article/article/index',
	calendarEvent: domain + '/calendar/event/events',
};

/**
 * 正在加载UI
 */
var loading = function(id, y) {
	id = id || '';
	y  = y || 400;
	var root = deviceone.ui("$");
	return deviceone.ui(root.add('loading_' + id, "source://view/common/loading.ui", 0, y));
}
module.exports.loading = loading;

/**
 * HTTP Post方法
 */
var post = function(uri, data, success, error, progressbar) {

	var post = deviceone.mm('do_Http');
	post.method = 'post';
	post.timeout = 60000;
	post.contentType = 'application/json';
	post.setRequestHeader("Accept", 'application/json');
	post.setRequestHeader("X-Auth-Token", cacher.loadData("access_token"));
	post.url = api[uri];
	post.body = data;
	
	if(progressbar) {
		progressbar.visible = true;
	}
	
	post.on("fail", function(data) {
		
		if(progressbar) {
			progressbar.visible = false;
		}
		if (typeof error == "function") {
			error(data);
		} else {
			nf.toast(data.message);
		}
		
	}).on("success", function(data) {
		
		if(progressbar) {
			progressbar.visible = false;
		}
		
		if (typeof success == "function") {
			success(data);
		}
	});
	post.request();
};
module.exports.post = post;

/**
 * HTTP Get方法
 */
var get = function(uri, data, success, fail, progressbar) {
	
	var query = queryString(data);
	
	var get = deviceone.mm("do_Http");
	get.method = "get";
	get.timeout = "60000";
	get.contentType = "application/json";
	get.setRequestHeader('Accept', 'application/json');
	get.setRequestHeader('X-Auth-Token', cacher.loadData('access_token'));
	get.url = api[uri] + '?' + query;
	
	if(progressbar) {
		progressbar.visible = true;
	}
	
	get.on("fail", function(data) {
		if(progressbar) {
			progressbar.visible = false;
		}
		if (typeof fail == "function") {
			fail(data);
		}
	}).on("success", function(data) {
		if(progressbar) {
			progressbar.visible = false;
		}
		if (typeof success == "function") {
			success(data);
		}
	});
	get.request();
};
module.exports.get = get;

/**
 * 对象转URL
 */
var queryString = function(obj, sep, eq, name) {
    sep = sep || '&';
    eq = eq || '=';
    obj = obj === null ? undefined : obj;
    var Euc = encodeURIComponent;
    if (typeof obj === "object") return Object.keys(obj).map(function(k){
        var ks = Euc(k) + eq;
        if (Array.isArray(obj[k])) return obj[k].map(function(v){
            return ks + Euc(v)
        }).join(sep);
        else return ks + Euc(obj[k]);
    }).join(sep);
    if (!name) return "";
    return Euc(name) + eq + Euc(obj);
};
module.exports.queryString = queryString;
