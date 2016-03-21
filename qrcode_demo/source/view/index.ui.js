/*******************************************************************************
 * Author :
 * 
 * @Author Timestamp :
 * @Timestamp
 ******************************************************************************/
var page = sm("do_Page");
var close = ui("close");
var app = sm("do_App");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})

// 生成二维码
var button = ui("do_Button_1");
var textfield = ui("do_TextField_1");
var iamgeview = ui("do_ImageView_2");
var qr = sm("do_QRCode");

button.on("touch", function() {
	qr.create(textfield.text, 400, function(data, e) {
		iamgeview.source = data;
	})
})
// 识别二维码
var layout = ui("do_ALayout_4");
var nf = sm("do_Notification");
layout.on("longTouch", function() {
	qr.recognition(iamgeview.source, function(data, e) {
		nf.alert(data);
	})
})
//layout.on("touch", function() {
//	
//})