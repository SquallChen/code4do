/**
 * @Author : and
 * @Timestamp : 2017-09-06
 */
var algData = sm("do_Page").getData();
var alg = require("/algorithm/" + algData.id + "/show");
var currentIndex = -1;
// initialize
(function() {
	ui("do_Label_1").text = algData.name;
})();

// event
sm("do_Page").on("loaded", function() {
	play(1);
});
ui("do_ALayout_3").on("touch", function() {
	sm("do_App").closePage();
});
ui("do_ALayout_8").on("touch", function() {
	sm("do_App").openPage({
		source : "source://view/src/index.ui",
		data : algData,
		animationType : "push_r2l_1",
		statusBarBgColor : "22282CFF"
	});
});
ui("prevButton").on("touch", function() {
	if (currentIndex > 0)
		play(-1);
});
ui("nextButton").on("touch", function() {
	if (currentIndex < (alg.getCount()-1))
		play(1);
});

// function
function play(index) {
	currentIndex = currentIndex + index;
	deviceone.print(currentIndex);
	ui("indexLabel").text = (currentIndex + 1);
	alg.play(ui("do_Canvas_1"), ui("do_Label_2"), currentIndex);
	if (currentIndex <= 0) {
		currentIndex = 0;
		ui("do_ImageView_6").source = "source://image/prev_no.png";
	} else {
		ui("do_ImageView_6").source = "source://image/prev.png";
	}
	if (currentIndex >= alg.getCount() - 1) {
		currentIndex = alg.getCount() - 1;
		ui("do_ImageView_4").source = "source://image/next_no.png";
	} else {
		ui("do_ImageView_4").source = "source://image/next.png";
	}
}
