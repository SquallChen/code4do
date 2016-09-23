//related to tab_top3.ui
var nf = sm("do_Notification");
var page = sm("do_Page");
var root = ui("$");
var tabbox = ui("tabtopbox");
var tabtn1 = ui("do_btntype1"),tabtn2 = ui("do_btntype2"), tabtn3 = ui("do_btntype3");
var btnList = [tabtn1,tabtn2,tabtn3];
var tabtntxt1 = ui("do_btntxt1"),tabtntxt2 = ui("do_btntxt2"), tabtntxt3 = ui("do_btntxt3");
var btnListtxt = [tabtntxt1,tabtntxt2,tabtntxt3];
//tabbox.tag;
//animateyes
var animtabyes= mm("do_Animator");
var propstabyes = {bgColor:"8080ffff"};
animtabyes.append(100, propstabyes, "EaseOut");
//animateno
var animtabno= mm("do_Animator");
var propstabno = {bgColor:"ffffff00"};
animtabno.append(100, propstabno, "EaseOut");

root.fire("tabtop",tabbox.tag);
btnList.forEach(function(dc,i){
	dc.on("touch","",300, function(datac, e) {
		paytouch(i);
	});
});

var paytouch = function(index){
	for(var i=0;i<btnList.length;i++){
		if(i!=index){
			btnListtxt[i].fontColor = "8080ffff";
			btnList[i].animate(animtabno);
			
		}else{
			btnListtxt[i].fontColor = "FFFFFFFF";
			btnList[i].animate(animtabyes);
			tabbox.tag = btnList[i].tag;
		}
	}
	root.fire("tabtop3",tabbox.tag);
};
root.on("tabtopb3",function(data){
	tabbox.tag = data[0];
	
	//默认tab位置
	for(var i=0;i<btnList.length;i++){
		btnListtxt[i].text = data[1][i]; //tab文字
		if(i!=tabbox.tag){
			btnListtxt[i].fontColor = "8080ffff";
			btnList[i].animate(animtabno);
		}else{
			btnListtxt[i].fontColor = "FFFFFFFF";
			btnList[i].animate(animtabyes);
			tabbox.tag = btnList[i].tag;
		}
	}
	root.fire("tabtop3",tabbox.tag);
});
