var do_App = sm("do_App");

var do_Label_title=ui("do_Label_title");

//标题虚化
var anima_title = mm("do_Animation");
anima_title.fillAfter = true;
anima_title.alpha({
    delay: 0,
    duration: 2400,
    curve: "Linear",
    repeatCount:1,
    autoReverse: true,
    alphaFrom: 0,
    alphaTo: 1
});
//标题放大
anima_title.scale({
    delay: 0,
    duration: 2400,
    curve: "EaseOut",
    autoReverse: false,
    scaleFromX: 1,
    scaleFromY: 1,
    scaleToX: 2.2,
    scaleToY: 2.2,
    pivotX:0.5,
    pivotY:0.5
});
do_Label_title.animate(anima_title, function(){
	do_App.openPage({
		source:"source://view/index.ui", 
		statusBarState:"transparent",
		animationType: "fade"
		});
});