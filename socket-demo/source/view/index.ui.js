/**
 * @Author : and
 * @Timestamp : 2016-09-29
 */
// require
var page = require("do/page");
var core = require("do/core");
var twowayBinding = require("do/tools/twowayBinding");
// sm
var do_Page = sm("do_Page");
var do_Notification = sm("do_Notification");
var do_DataCache = sm("do_DataCache");
var do_Storage = sm("do_Storage");
var do_Algorithm = sm("do_Algorithm");
// mm
var do_Socket = mm("do_Socket");
// ui
var connect_button = ui("connect_button");
var send_button = ui("send_button");
var ip_textfield = ui("ip_textfield");
var port_textfield = ui("port_textfield");
var output_label = ui("output_label");
var send_textbox = ui("send_textbox")
// var
var binding_id;
var send_type = "UTF-8";
// init
(function() {
	page.allowClose(ui("do_ALayout_3"));
	page.allowHideKeyboard();

	ui("$").add("select_type_ui", "source://view/send_type_selector.ui", 56,
			758);
	binding_id = twowayBinding.define(ui("$"), {
		"ip_textfield.text" : "ipaddress",
		"port_textfield.text" : "port"
	});
	var saved_ip_port = do_DataCache.loadData("saved_ip_port");
	if (saved_ip_port)
		twowayBinding.setData(binding_id, saved_ip_port);
})();
// event
connect_button.on("touch", function() {
	do_Page.hideKeyboard();
	var ipport = twowayBinding.getData(binding_id);
	core.p(ipport);
	do_Socket.connect(ipport.ipaddress, ipport.port, function(data, e) {
		if (data) {
			var msg = "连接Socket Server 成功!";
			do_Notification.toast(msg);
			do_DataCache.saveData("saved_ip_port", ipport)
			println(msg, ">");
		} else {
			do_Notification.toast("连接失败!")
		}
	})
})

send_button.on("touch", function() {
	var content = send_textbox.text;
	if (send_type == "HEX") {
		send(stringToHex(content));
	} else if (send_type == "file") {
		var filename = "data://temp.txt";
		content = " 写内容到文件" + filename + ":" + content;
		do_Storage.writeFile(filename, content, function(data, e) {
			send(filename);
		})
	} else {
		send(content);
	}

})

do_Socket.on("receive", function(data) {
	// 接受到是16进制，需要转换
	do_Algorithm.hex2Str(data,"utf-8",function(d){
		println(d, "R");
	})
}).on("error", function(data) {
	core.alert(data, "error");
	println(JSON.stringify(data), "E");
})

do_Page.on("send_type", function(d) {
	send_type = d;
})
// private function
function println(msg, tag) {
	output_label.text = output_label.text + tag + ": " + msg + "\n";
}

function send(content) {
	println(content, "S");
	do_Socket.send(send_type, content, function(data, e) {
		if (!data) {
			println("发送失败!");
		}
	})
}
function stringToHex(str){
　　　　var val="";
　　　　for(var i = 0; i < str.length; i++){
　　　　　　if(val == "")
　　　　　　　　val = str.charCodeAt(i).toString(16);
　　　　　　else
　　　　　　　　val += str.charCodeAt(i).toString(16);
　　　　}
　　　　return val;
　　}
