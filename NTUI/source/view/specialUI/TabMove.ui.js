var nf = sm("do_Notification");
var page = sm("do_Page");
var root = ui("$");

var tabbox = ui("tabbox");
var tabtn1 = ui("do_Button_1"),tabtn2 = ui("do_Button_2"), tabtn3 = ui("do_Button_3");
var btnList = [tabtn1,tabtn2,tabtn3];
var btnmove = ui("tabmove");
var moves = btnmove.width;
//animateyes

var paytouch = function(index){
	for(var i=0;i<btnList.length;i++){
		if(i!=index){
			btnList[i].fontColor = "0278feff";
		}else{
			btnList[i].fontColor = "FFFFFFFF";
			var animtabyes= mm("do_Animator");
			var propstabyes = {x:moves*i};
			animtabyes.append(300, propstabyes, "EaseOut");
			btnmove.animate(animtabyes);
			tabbox.tag = btnList[i].tag;
		}
	}
	root.fire("tabSpeF",tabbox.tag);
};
btnList.forEach(function(dc,i){
	dc.on("touch","",300, function(datac, e) {
		paytouch(i);
	});
});

root.on("tabSpe",function(data){
	tabbox.tag = data[0];
	
	//默认tab位置
	for(var i=0;i<btnList.length;i++){
		btnList[i].text = data[1][i]; //tab文字
		if(i!=tabbox.tag){
			btnList[i].fontColor = "0278feff";
		}else{
			btnList[i].fontColor = "FFFFFFFF";
			var animtabyes= mm("do_Animator");
			var propstabyes = {x:moves*i};
			animtabyes.append(300, propstabyes, "EaseOut");
			btnmove.animate(animtabyes);
			tabbox.tag = btnList[i].tag;
		}
	}
	root.fire("tabSpeF",tabbox.tag);
});