var root = ui("$");
var page = sm("do_Page");
var imageBrowser = sm("do_ImageBrowser");
root.setMapping({
	"do_ImageView_head.source":"userpath",
	"do_ImageView_head.tag":"token",
	"do_Label_username.text":"username",
	"do_Label_sendtime.text":"evaluateTime",
	"do_Label_sendtextcon.text":"content",
	"do_Label_busniesstext.text" :"reply",
	"do_Label_busniesstext.visible" :"replyVisible",
	"do_Label_aboutpoint.text" :"otherScore",
	"do_ImageView_2.source":"img1",
	"do_ImageView_2.visible":"vimg1",
	"do_ImageView_2.tag":"oimg1",
	"do_ImageView_3.source":"img2",
	"do_ImageView_3.visible":"vimg2",
	"do_ImageView_3.tag":"oimg2",
	"do_ImageView_4.source":"img3",
	"do_ImageView_4.visible":"vimg3",
	"do_ImageView_4.tag":"oimg3",
	"do_ImageView_5.source":"img4",
	"do_ImageView_5.visible":"vimg4",
	"do_ImageView_5.tag":"oimg4"
});
var head = ui("do_ImageView_head");
var imgBtn = [ui("do_ImageView_2"),ui("do_ImageView_3"),ui("do_ImageView_4"),ui("do_ImageView_5")]
imgBtn.forEach(function(dc,i){
	dc.on("touch", function(datac, e) {
		if(dc.source!=""){
			page.fire("ImgShow",[i,head.tag]);
		}
	});
});

var img1 = ui("do_ImageView_2");
var img2 = ui("do_ImageView_3");
var img3 = ui("do_ImageView_4");
var img4 = ui("do_ImageView_5");
var panel = [img1,img2,img3,img4];

panel.forEach(function(data,index) {
	panel[index].on("touch","",300,function(){
		var images = [];
		if(img1.tag!=""){
			images[images.length] = {source:img1.tag,init:img1.source};
		}
		if(img2.tag!=""){
			images[images.length] = {source:img2.tag,init:img2.source};
		}
		if(img3.tag!=""){
			images[images.length] = {source:img3.tag,init:img3.source};
		}
		if(img4.tag!=""){
			images[images.length] = {source:img4.tag,init:img4.source};
		}
		imageBrowser.show(images, index);
	});
});