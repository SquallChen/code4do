var app, page, nf;
app = sm("do_App");
page = sm("do_Page");
/** ****************************************************** */
var buttons = [];
var size = 200;
var scale = 3;
var source = "source://image/image.jpg";

page.on("back", function() {
	app.closePage();
})
ui("do_ALayout_2").on("touch", function() {
	app.closePage();
})

ui("do_ImageView_2").on("touch", function() {
	var album = sm("do_Album");
	album.select(1, "", "", "", function(data, e) {
		source = data[0];
		ui("do_ImageView_1").source = source;
		ui("do_ImageView_1").redraw();
		initCavas();
	})

})

ui("do_ImageView_1").y = 850;
ui("do_ImageView_1").redraw();
ui("do_ImageView_1").on("touch", function() {
	initCavas();
})


var initPosIndex = [ 0,1,2,3,4,5,6,7,8 ];
// var initPosIndex = [ 0, 1, 2, 3, 4, 5, 7, 8,6 ];

function initCavas() {
	randomMove();
	for (var i = 0; i < scale * scale; i++) {
		var row = Math.floor(i / scale);
		var column = i % scale;
		var button1;
		if (buttons.length > i) {
			button1 = buttons[i];
		} else {
			button1 = ui(ui("$").add("button" + i, "source://view/button.ui",
					0, 0));
		}

		var isSpace = (i == (scale * scale - 1));
		if (isSpace) {
			button1.off("control_OK");
			button1.on("control_OK", function() {
				nf.alert("拼好了")
			})
		}
		button1.fire("init", {
			"isSpace" : isSpace,
			"imageIndex" : i,
			"posIndex" : initPosIndex[i],
			"size" : size,
			"scale" : scale,
			"cavasX" : 60,
			"cavasY" : 200,
			"source":source
		});
		if (buttons.length < scale * scale) {
			buttons.push(button1);
		}

	}

	for (var i = 0; i < scale * scale; i++) {
		var isSpace = (i == (scale * scale - 1));
		buttons[i].fire("initCheckOk");
	}
}

function randomMove(){
	for(var i=0;i<scale*scale-1;i++){
		var obj = Math.floor(Math.random()*9);
		var swap =initPosIndex[obj];
		initPosIndex[obj] = initPosIndex[i];
		initPosIndex[i] = swap;
	}
}

initCavas();