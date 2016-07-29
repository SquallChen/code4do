/**
 * New DeviceOne File
 */
var deviceone = require("deviceone");
var root = deviceone.ui("$");
var page = deviceone.sm("do_Page");
var app = deviceone.sm("do_App");
var nf = deviceone.sm("do_Notification");

module.exports.handClose = function(isOff,data){
	var isOff;
	if(isOff == 1){
		page.supportPanClosePage(data);
	}
}