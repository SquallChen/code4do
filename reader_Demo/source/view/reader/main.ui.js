var do_Global = sm("do_Global");
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_InitData = sm("do_InitData")

var slideview = ui("do_SlideView");
var listdata = mm("do_ListData");
slideview.bindItems(listdata);

var text_datas = [];
var page_length = 1000;

do_Page.on("loaded", function() {
	do_InitData.readFile("initdata://mock/reader.txt", function(data, e) {
		var total = parseInt(data.length / page_length);
		for (var i = 0; i < total; i++) {
			text_datas[i] = {
				"index" : i ,
				"text" : data.substr(i * page_length, page_length),
				"total_index" : "/" + total
			};
		}
		var d = [ text_datas[0], text_datas[1], text_datas[2] ];
		listdata.addData(d);
	
		slideview.refreshItems();
	})
});

slideview.on("indexChanged", function(index) {
	var next = index+1;
	if (next > 2)
		next = 0;
	var pre = index-1;
	if (pre < 0)
		pre = 2;
	var current_d = listdata.getOne(index);
	var current_total_index = current_d.index;

	var next_d = listdata.getOne(next);
	var next_total_index = next_d.index;
	
	var pre_d = listdata.getOne(pre);
	var pre_total_index = pre_d.index;
	
	deviceone.print(pre+";"+index+";"+next);
	deviceone.print(pre_total_index+";"+current_total_index+";"+next_total_index);
	if (next_total_index != (current_total_index + 1)) {
		listdata.updateOne(next, text_datas[(current_total_index + 1)]);
		
	}
	
	if (pre_total_index != (current_total_index - 1)) {
		listdata.updateOne(pre, text_datas[(current_total_index - 1)]);
	}
	next_d = listdata.getOne(next);
	next_total_index = next_d.index;
	
	pre_d = listdata.getOne(pre);
	pre_total_index = pre_d.index;
	deviceone.print(pre_total_index+";"+current_total_index+";"+next_total_index);
	
	deviceone.print(JSON.stringify(listdata.getRange(0)));

	slideview.refreshItems();
})