/*******************************************************************************
 * Author :
 * 
 * @Author Timestamp :
 * @Timestamp
 ******************************************************************************/
var nf = sm("do_Notification");
var page = sm("do_Page");
var close = ui("close");
var app = sm("do_App");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})

function init() {
	for (i = 2; i <= 7; i++) {
		var imageview = ui("do_ImageView_" + i);
		imageview.tag = i - 2;// 把序号记录在imageview的tag属性
		imageview.on("touch", function() {
			click(this);
		})
	}

}
init();

var images = [
		{
			source : "http://pic3.nipic.com/20090525/2416945_231841034_2.jpg",
			init : "source://image/1.jpg"
		},
		{
			source : "http://pic9.nipic.com/20100904/4845745_195609329636_2.jpg",
			init : "source://image/2.jpg"
		},
		{
			source : "http://pic1.nipic.com/2008-12-09/200812910493588_2.jpg",
			init : "source://image/3.jpg"
		},
		{
			source : "http://img.61gequ.com/allimg/2011-4/201142614314278502.jpg",
			init : "source://image/4.jpg"
		},
		{
			source : "http://hiphotos.baidu.com/praisejesus/pic/item/e8df7df89fac869eb68f316d.jpg",
			init : "source://image/5.jpg"
		},
		{
			source : "http://pic37.nipic.com/20140209/8821914_163234218136_2.jpg",
			init : "source://image/6.jpg"
		} ];

var imageBrowser = sm("do_ImageBrowser");

function click(obj) {
	imageBrowser.show(images, obj.tag);
}