/*******************************************************************************
 * Author : But Timestamp : 2015-07-23
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

var playPngs = ui("playPngs");
var playGIF = ui("playGIF");
// 根据FrameAnimationView的id获取对应的对象
var pngsView = ui("pngsView");
var gifView = ui("gifView");

// 构建一组连续的图片，一共180张png图片
var pngs = [];
for (var i = 1; i <= 180; i++) {
	var a = {};
	// 设定每个图片播放的间隔都是50毫秒
	a.duration = 50;
	if (i < 10)
		a.path = "source://image/p31b000" + i + ".png";
	else if (i >= 10 && i < 100)
		a.path = "source://image/p31b00" + i + ".png";
	else
		a.path = "source://image/p31b0" + i + ".png";
	pngs.push(a);
}

playPngs.on("touch", function(d, e) {
	//pngsView.stop();
	// 重复播放这组图片形成动画
	pngsView.startImages(pngs, -1);
});

playGIF.on("touch", function(d, e) {
	gifView.stop();
	// 重复播放一个gif动画
	gifView.startGif("source://image/gun.gif", -1);
});
