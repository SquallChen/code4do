/**
 * @Author : and
 * @Timestamp : 2016-09-27
 */
var core = require("do/core");
var page = require("do/page");

var listview = ui("do_ListView_1");
var listdata = mm("do_ListData");
listview.bindItems(listdata);

page.allowClose(ui("do_ALayout_3"));

var image_count_group = [3,1,4,1,5,9,2,6,3];
function initdata() {
	var data = [];
	var index = 1;
	for (var i = 0; i < image_count_group.length; i++) {
		var d = {};
		d.template = 0;
		d.group_title="图标组"+(i+1);
		data.push(d);
		d = {};
		d.template = 1;
		d.icons_data=[];
		for(var j=0;j<image_count_group[i];j++){
			d.icons_data[j]={};
			d.icons_data[j].icon_source="source://image/"+index+".png";
			index++;
		}
		data.push(d);
	}
	core.p(data);
	listdata.addData(data);
	listview.refreshItems();
}
initdata();