/**
 * related to course.ui
 * 
 * @Author : and
 * @Timestamp : 2016-08-21
 */
var root = ui("$");
root.setMapping({
	"do_Label_1.text" : "courseName",
	"do_Label_2.text" : "courseTime",
	"do_ALayout_1.bgColor" : "bgColor",
	"do_ALayout_2.bgColor" : "bgColor",
	"do_Label_1.tag" : "height",
})
var label1 = ui("do_Label_1")
var label2 = ui("do_Label_2")
var layout1 = ui("do_ALayout_1");
var layout2 = ui("do_ALayout_2");

root.on("dataRefreshed", function() {
	root.height = label1.tag;
	layout1.height =root.height/2;
	layout2.y = root.height/2;
	layout2.height = root.height/2;
	
	label1.y = layout1.height - 50;
	root.redraw();
});