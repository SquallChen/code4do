/**
 * related to day.ui
 * 
 * @Author : and
 * @Timestamp : 2016-08-20
 */
var root = ui("$");
root.setMapping({
	"do_Label_1.text" : "courseWeek",
	"do_Label_2.text" : "courseDate",
	"do_ALayout_1.tag" : "courseOneDayList",
})

var alayout1 = ui("do_ALayout_1");
var alayout2 = ui("do_ALayout_2");
var alayout3 = ui("do_ALayout_3");
var alayout4 = ui("do_ALayout_4");

var colors = [ [], [ "FF6FCFFF" ], [ "FF6FCFFF", "FF8000FF" ],
		[ "00FF80FF", "FF8000FF", "6666FFFF" ],
		[ "FF6FCFFF", "00FF80FF", "FF8000FF", "6666FFFF" ] ]

root.on("dataRefreshed", function() {
	var data = JSON.parse(alayout1.tag);
	addCourse(data[0], alayout2)
	addCourse(data[1], alayout3)
	addCourse(data[2], alayout4)
})

function addCourse(d, main) {
	var y = 0;
	var l = d.length;
	if (l == 0)
		return;
	var h = 400 / l;

	for ( var count in d) {
		var cd = d[count];

		var added = ui(main.add("id" + main.getAddress() + y,
				"source://view/course.ui", 0, y));
		y = y + h;
		var hashdata = mm("do_HashData");
		added.bindData(hashdata);

		cd["bgColor"] = colors[l][count];
		cd["height"] = h;

		hashdata.addData(cd);
		added.refreshData();
	}
}