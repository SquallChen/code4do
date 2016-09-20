/**
 * @Author : and
 * @Timestamp : 2016-09-20
 */
deviceone.print("start load index.ui.js")

var layout = ui("ALayout_1");
layout.add("idtest", "source://view/added.ui")

var viewshower = ui("do_ViewShower_1");

var data = [ {
	"id" : "test1",
	"path" : "source://view/1.ui"
}, {
	"id" : "test2",
	"path" : "source://view/2.ui"
}, {
	"id" : "test3",
	"path" : "source://view/3.ui"
} ];

viewshower.addViews(data);
viewshower.showView("test2");

var page = sm("do_Page");
page.on("loaded", function() {
	deviceone.print("index.ui.js loaded!");
})

deviceone.print("end load index.ui.js");
