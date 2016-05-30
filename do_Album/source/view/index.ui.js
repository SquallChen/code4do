/**
 * @Author : and
 * @Timestamp : 2016-05-27
 */
// 创建一个album实例
var album = sm("do_Album");
var nf = sm("do_Notification");

////
var page = sm("do_Page");
var app = sm("do_App");
var close = ui("close");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})
// //

var select = ui("select");
select.on("touch", function() {
	album.select(1, 400, -1, 100, false, function(data, e) {
		select.source = data[0];
	})
});

var img1 = ui("img1");
var source1 = img1.source;
img1.on("touch", function() {
	album.save(source1, "test.jpg", function(data, e) {
		nf.alert(data, "保存到本地是否成功：");
	})
})