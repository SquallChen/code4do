//related to probar_anim.ui
var root = ui("$");

var procon = ui("do_ALayout_2");
var protxt = ui("do_Label_1");
root.on("probars",function(data){
	var getwidth = data*7;
	
	var animpbar= mm("do_Animator");
	var proppbar = {width:getwidth};
	animpbar.append(300, proppbar, "EaseOut");
	procon.animate(animpbar);
	
	protxt.text = data+"%";
	root.fire("probarsf",getwidth);
});

