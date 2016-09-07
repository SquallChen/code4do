var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_Global = sm("do_Global");
var do_Button_line = ui("do_Button_line");
var do_Button_bar = ui("do_Button_bar");
var do_Button_ring = ui("do_Button_ring");
var do_Button_pie = ui("do_Button_pie");
var do_ALayout_back = ui("do_ALayout_back");

var http = require("http");


do_ALayout_back.on("touch",function(){
	do_App.closePage();
})
do_Page.on("back",function(){
	do_App.closePage();
})

//折线图
do_Button_line.on("touch", function() {
	http.get_MockData("app/line.html",function(data){
		do_Global.setMemory("echarts_datas", data)
		do_App.openPage({
			source:"source://view/show_chart.ui",
			data:do_Button_line.text,
			statusBarState:"transparent"
		})
	})
});

//柱状图
do_Button_bar.on("touch", function() {
	http.get_MockData("app/bar.html",function(data){
		do_Global.setMemory("echarts_datas", data)
		do_App.openPage({
			source:"source://view/show_chart.ui",
			data:do_Button_bar.text,
			statusBarState:"transparent"
		})
	})
});

//圆环图
do_Button_ring.on("touch", function() {
	http.get_MockData("app/ring.html",function(data){
		do_Global.setMemory("echarts_datas", data)
		do_App.openPage({
			source:"source://view/show_chart.ui",
			data:do_Button_ring.text,
			statusBarState:"transparent"
		})
	})
});

//圆饼图
do_Button_pie.on("touch", function() {
	http.get_MockData("app/pie.html",function(data){
		do_Global.setMemory("echarts_datas", data)
		do_App.openPage({
			source:"source://view/show_chart.ui",
			data:do_Button_pie.text,
			statusBarState:"transparent"
		})
	})
});