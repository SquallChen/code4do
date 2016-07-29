//related to header_index.ui
var rootview = ui("$");
var nf = sm("do_Notification");
var page = sm("do_Page");
var app = sm("do_App");
var anim = require("anim");
var storage = sm("do_Storage");
//close
var closebtn = ui("do_ALayout_3");
closebtn.on("touch","",300,function(){
	anim.animbtn1(closebtn);
	app.closePage();
});
//刷新
var refersbtn = ui("do_ALayout_4");
refersbtn.on("touch","",300,function(){
	anim.animbtn1(refersbtn);
	nf.alert("刷新抵价券");
});

var titles = ui("do_Label_1");
titles.text = "抵价券";

var labcount = ui("do_Label_2");
/*
 *  coverFlow
 */
var coverflowf = ui("do_CoverFlowView_1");
var cfdata = mm("do_ListData");
var data1 = [
	             {"template":0,"name":"通用券","cfnumb":"5185 8848 6546","bzot":"全平台各服务通用","gettime":"2016-09-21到期","bgColor":"E05252FF"},
	             {"template":0,"name":"高氏驴肉火烧","cfnumb":"1252 5212 3687","bzot":"仅限本店使用","gettime":"无限期"},
	             {"template":0,"name":"小聚生活","cfnumb":"6352 5847 9968","bzot":"仅限本店使用","gettime":"无限期"},
	             {"template":0,"name":"粥公粥婆","cfnumb":"8456 3251 8563","bzot":"仅限本店使用","gettime":"无限期"}
	            ];
cfdata.addData(data1);
coverflowf.bindItems(cfdata);
coverflowf.refreshItems();
//index文字
var numcount = cfdata.getCount();
labcount.text = (coverflowf.index + 1) +"/"+numcount;
coverflowf.on("indexChanged",function(data){
	labcount.text = (coverflowf.index + 1) +"/"+numcount;
});

