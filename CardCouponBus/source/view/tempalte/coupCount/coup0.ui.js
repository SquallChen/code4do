var root = ui("$");
var anim = require("anim");
var btnyes = ui("do_Button_1");
var textf1=ui("do_TextField_1");
var textf2=ui("do_TextField_2");

btnyes.on("touch","",300,function(data){
	anim.animbtn(btnyes);
	var txtcount = {"txt1":textf1.text,"txt2":textf2.text};
	root.fire("coup0",txtcount);
});
