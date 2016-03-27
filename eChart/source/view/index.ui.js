/*******************************************************************************
 * @ 依赖于: do_SegmentView do_SlideView
 * 
 */

var app = sm("do_App");
var page = sm("do_Page");

ui("action_back").on("touch", function(data, e) {
    app.closePage();
});

page.on("back",function(){
	app.closePage();
})

var web = ui("do_WebView_1");
web.url = "source://view/html/chart.html";
