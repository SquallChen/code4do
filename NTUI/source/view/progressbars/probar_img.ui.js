//related to probar_anim.ui
var root = ui("$");

var procon = ui("do_ImageView_1");
var protxt = ui("do_Label_1");
root.on("probarsimg",function(data){
	var getwidth = data*7;
	
	var animpbari= mm("do_Animator");
	var proppbari = {width:getwidth};
	animpbari.append(300, proppbari, "EaseOut");
	procon.animate(animpbari);
	
	protxt.text = data+"%";
	root.fire("probarsfimg",getwidth);
});

