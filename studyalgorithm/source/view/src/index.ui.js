/**
 * @Author : and
 * @Timestamp : 2017-09-06
 */
var algData = sm("do_Page").getData();
var alg = require("/algorithm/" + algData.id+"/main");

// initialize
(function() {
	ui("do_Label_1").text = algData.name+"源码";
	ui("do_WebView_1").url = "https://github.com/do-project/code4do/blob/master/studyalgorithm/source/script/algorithm/"+algData.id+"/main.js";
})();

// event
ui("do_ALayout_3").on("touch", function() {
	sm("do_App").closePage();
});

ui("do_Button_1").on("touch", function() {
	sm("do_Notification").alert(alg.run());
});

