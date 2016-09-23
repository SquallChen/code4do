var root = ui("$");
var anim = require("anim");
var btnyes = ui("do_Button_1");
var textf1=ui("do_TextField_1");

btnyes.on("touch","",300,function(data){
	anim.animbtn(btnyes);
	var txtcount = {"txt1":textf1.text};
	root.fire("coup2",txtcount);
});
