var root = ui("$");
var page = sm("do_Page");
var external = sm("do_External");
var anim = require("anim");
var nf = sm("do_Notification");
root.setMapping({
	"slide03box.tag":"token",
	"slide03box.height":"slheight"
});
//配送时间
var awaytime = ui("do_Label_4");
awaytime.text = "10:30-22:00";
//商家电话
var phonecall = ui("do_ALayout_2");
var phonenumber = ui("do_Label_6");
phonenumber.text = "0479-8332232";
phonecall.on("touch","",300,function(){
	anim.animbtn1(phonecall);
	nf.confirm({text:phonenumber.text,title:"商家客服",button1text:"拨打",button2text:"取消"},function(datacall,e){
		if(datacall == 1){
			external.openDial(phonenumber.text);
		}
	});
});
//地址
var shopaddress = ui("do_LinearLayout_2");
var shoptxt = ui("do_Label_9");
shoptxt.text = "内蒙古自治区锡林浩特市那达慕大街银座广场";
shopaddress.on("touch","",300,function(){
	anim.animbtn1(shopaddress);
	nf.alert("打开地图界面");
});
//配送方
var disparty = ui("do_Label_11");
disparty.text = "纳豆网  提供配送服务";