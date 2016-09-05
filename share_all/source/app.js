var d1 = require("deviceone");
var app = d1.sm("do_App");
var initdata = d1.sm("do_InitData");

app.on("loaded", function () {
	initdata.copy(["initdata://logo.jpg","initdata://music_icon.jpg","initdata://video.png"], "data://", function(data, e) {
		app.openPage({
			source:"source://view/index.ui",
			statusBarState:"transparent",
			animationType: "fade"
		});
	})
});
