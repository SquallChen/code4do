/**
 * @Author : and
 * @Timestamp : 2017-09-06
 */
var algData = sm("do_Page").getData();
var alg = require("/algorithm/" + algData.id+"/main");
// initialize
(function() {
	ui("do_Label_1").text = algData.name+"源码";
	ui("do_WebView_1").url = 
})();

// event
ui("do_ALayout_3").on("touch", function() {
	sm("do_App").closePage();
});

ui("playButton").on("touch", function() {
	if (state == "stop")
		state = "play";
	else if (state == "pause")
		state = "play";
	else if (state == "play")
		state = "pause";
});
ui("prevButton").on("touch", function() {
	currentIndex--;
	play();
});
ui("nextButton").on("touch", function() {
	currentIndex++;
	play();
});

// function
function play() {
	ui("indexLabel").text = (currentIndex + 1);
	alg.play(ui("do_Canvas_1"), currentIndex);
	if (currentIndex <= 0) {
		currentIndex = 0;
		ui("do_ImageView_6").source = "source://image/prev_no.png";
	} else {
		ui("do_ImageView_6").source = "source://image/prev.png";
	}
	if (currentIndex >= alg.getCount()) {
		currentIndex = alg.getCount() - 1;
		ui("do_ImageView_4").source = "source://image/next_no.png";
	} else {
		ui("do_ImageView_4").source = "source://image/next.png";
	}
}
