/**
 * @Author : and
 * @Timestamp : 2016-06-30
 */
var nf = sm("do_Notification");
var initdata = sm("do_InitData");
var page = sm("do_Page");
var app = sm("do_App");

var close = ui("close");
var scrollview = ui("do_ScrollView_1");
var label = ui("do_RichLabel_1");
var alignment = ui("do_Button_1");
var emoji = ui("do_Button_2");
var href = ui("do_Button_3");
var image = ui("do_Button_4");
var language = ui("do_Button_5");
var lineheight = ui("do_Button_6");
var list = ui("do_Button_7")
var styles = ui("do_Button_8");
// //返回按钮

close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})

alignment.on("touch", function() {
	initdata.readFile("initdata://Alignment.html", function(data) {
		label.text = data;
	})
});

emoji.on("touch", function() {
	initdata.readFile("initdata://EmojiTest.html", function(data) {
		label.text = data;
	})
});
href.on("touch", function() {
	initdata.readFile("initdata://href.html", function(data) {
		label.text = data;
	})
});
image.on("touch", function() {
	initdata.readFile("initdata://Image.html", function(data) {
		label.text = data;
	})
});
language.on("touch", function() {
	initdata.readFile("initdata://Languages.html", function(data) {
		label.text = data;
	})
});
lineheight.on("touch", function() {
	initdata.readFile("initdata://LineHeight.html", function(data) {
		label.text = data;
	})
});
list.on("touch", function() {
	initdata.readFile("initdata://ListTest.html", function(data) {
		label.text = data;
	})
});
styles.on("touch", function() {
	initdata.readFile("initdata://styles.html", function(data) {
		label.text = data;
	})
});