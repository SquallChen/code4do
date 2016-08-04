var do_App = sm("do_App")
var do_ALayout_txt = ui("do_ALayout_txt")

do_ALayout_txt.on("touch",function(){
	do_App.openPage({
		source:"source://view/reader/main.ui", 
		statusBarState:"show",
		animationType: "slide_r2l"
	});
})