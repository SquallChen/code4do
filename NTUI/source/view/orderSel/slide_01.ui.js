var root = ui("$");
var page = sm("do_Page");
var anim = require("anim");
//var storage = sm("do_Storage");
var initdata = sm("do_InitData");
var nf = sm("do_Notification");
root.setMapping({
	"slide01box.tag":"token"
});
//菜系分类
var datacai = mm("do_ListData");
var listviewcai = ui("do_ListView_1");

listviewcai.bindItems(datacai);

initdata.readFile("initdata://cailist.json",function(data){
	datacai.addData(data);
	listviewcai.refreshItems();
});
listviewcai.on("touch",function(index){
	var cell = datacai.getOne(index);
	for(var i=0;i<datacai.getCount();i++){
		var cell = datacai.getOne(i);
		datacai.updateOne(i, {
			//"token":cell.token,
			"title":cell.title,
			"FONTCOL":i==index? "333333FF":"777777FF",
			"BGCOL":i==index? "FFFFFFFF":"00000000",
			"LFBG":i==index? "FFCC00FF":"FFFFFF00",
			"index":i
		});
	}
	listviewcai.refreshItems();
	//点击滚到到指定位置
//	viewcailist.scrollToPosition(menuLocation[index],false);
});

//菜品
var listviewcaipin = ui("do_ListView_2");
var datacaipin = mm("do_ListData");

listviewcaipin.bindItems(datacaipin);

initdata.readFile("initdata://caipinlist.json",function(data){
	datacaipin.addData(data);
	listviewcaipin.refreshItems();
});
//加减号
var imgshopcar = ui("do_ImageView_1");
page.on("countupdate",function(data){
	anim.animScale(imgshopcar,1.1,1.1,200);
});
