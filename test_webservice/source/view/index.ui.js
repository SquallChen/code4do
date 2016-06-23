/*******************************************************************************
 * Author :and TimeStamp :2015-10-26
 ******************************************************************************/
var nf = sm("do_Notification");
var app = sm("do_App");
// //
var page = sm("do_Page");
var close = ui("close");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})
// //

function init_http(url) {
	var http = mm("do_Http");
	http.method = "POST";
	http.url = url;
	http.contentType = "text/xml";
	http.on("result", function(d) {
		nf.alert(JSON.stringify(d.data));
	}).on("fail", function(d) {
		nf.alert(JSON.stringify(d));
	})
	return http;
}
var http1 = init_http("http://182.92.198.3/WebService1.asmx");
function create_soap_request(body) {
	return "<?xml version=\"1.0\" encoding=\"utf-8\"?>"
			+ "<soap12:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap12=\"http://www.w3.org/2003/05/soap-envelope\">"
			+ "<soap12:Body>" + body + "</soap12:Body>" + "</soap12:Envelope>";
}

var button1 = ui("do_Button_1");
var button2 = ui("do_Button_2");
var button3 = ui("do_Button_3");
button1.on("touch", function() {
	var body = "<HelloWorld xmlns=\"http://tempuri.org/\" />";
	http1.body = create_soap_request(body);
	http1.request();
});
button2.on("touch", function() {
	nf.alert("do nothing")
});
button3.on("touch", function() {
	nf.alert("do nothing")
});