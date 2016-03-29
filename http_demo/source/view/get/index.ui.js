//related to index.ui
var app = sm("do_App");
var page = sm("do_Page");
var request_header_view = ui("do_Label_3");
var request_parameter_view = ui("do_Label_8");
var status_view = ui("do_Label_4");
var response_header_view = ui("do_Label_5");
var response_body_view = ui("do_Label_6");
// //返回按钮
var close = ui("close");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})

var host = page.getData();
function init_http() {
	var http = mm("do_Http");
	http.method = "GET";
	http.url = "http://" + host + "/testget?a=x&b=2";
	http.setRequestHeader("test1", "value1");
	http.setRequestHeader("test2", "value2");
	http.on(
			"result",
			function(data) {
				deviceone.print(JSON.stringify(data));
				status_view.text = "返回status:" + data.status;
				var obj = JSON.parse(data.data);
				request_header_view.text = "返回request的header:\n"
						+ printJSON(obj.request.header);
				request_parameter_view.text = "返回request的parameters:\n"
						+ printJSON(obj.request.parameters);
				response_header_view.text = "返回response的header:\n"
						+ printJSON(obj.response.header);
				response_body_view.text = "返回response的data:\n"
						+ printJSON(obj.response.data);
			}).on("fail", function(data) {
		deviceone.print(JSON.stringify(data));
	})
	return http;
}
var http = init_http();

var button1 = ui("testget");
button1.on("touch", function() {
	http.request();
})

function printJSON(obj) {
	if (typeof obj == "string")
		return obj;
	var a = "";
	for ( var x in obj) {
		a = a + x + "=" + obj[x] + "\n";
	}
	return a;
}