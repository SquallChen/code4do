var deviceone = require("deviceone");
var app = deviceone.sm("do_App");
var global = deviceone.sm("do_Global");
var nf = deviceone.sm("do_Notification");
var page = deviceone.sm("do_Page");
var storage = deviceone.sm("do_Storage");
var cacher = deviceone.sm("do_DataCache");

/**
 * 公用头UI
 */
var topBar = function(title, tag, view) {
	
	var root = deviceone.ui("$");
	var topBar = deviceone.ui(root.add("topbar", "source://view/common/topbar.ui", 0, 0));
	topBar.fire('init', {title: title, view: view, tag: tag});
	
}
module.exports.topBar = topBar;

/**
 * 判断是否已经登录
 */
module.exports.isLogin = function() {
	return cacher.hasData('access_token');
};

/**
 * 退出系统
 */
module.exports.logout = function() {
	return cacher.removeData('access_token');
};

/**
 * 退出系统确认
 */
module.exports.exitApp = function() {
	
	var canBack = false;
	page.on("back", function(){
	    if (canBack) {
	        global.exit();
	    } else {
	        nf.toast("再按一次退出");
	        canBack = true;
	        delay3.start();
	    }
	});

	var delay3 = deviceone.mm("do_Timer");
	delay3.delay = 3000;
	delay3.interval = 1000;
	delay3.on("tick", function(){
	    this.stop();
	    canBack = false;
	});
};

/**
 * 时间戳到日期
 */
var formatDate = function(str) {
	
	var now = new Date(parseInt(str) * 1000);
	
	var year = now.getFullYear();
	var month = now.getMonth()+1;
	var date = now.getDate();
	var hour = now.getHours();
	var minute = now.getMinutes();
	// var second = now.getSeconds();
	// return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
	return year + "/" + month + "/" + date + " " + hour + ":" + minute;
}
module.exports.formatDate = formatDate;
