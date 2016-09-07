var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_Label_title = ui("do_Label_title");
var do_WebView_echart = ui("do_WebView_echart");
var do_ALayout_back = ui("do_ALayout_back");


do_ALayout_back.on("touch",function(){
	do_App.closePage();
})
do_Page.on("back",function(){
	do_App.closePage();
})

do_Label_title.text = do_Page.getData();
if (do_Page.getData() == "折线图"){
	do_WebView_echart.url = "source://view/echart_line.do.html";
} else if (do_Page.getData() == "柱状图"){
	do_WebView_echart.url = "source://view/echart_bar.do.html";
} else if (do_Page.getData() == "圆环图"){
	do_WebView_echart.url = "source://view/echart_ring.do.html";
} else{
	do_WebView_echart.url = "source://view/echart_pie.do.html";
}



