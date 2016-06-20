/**
 * @Author : zxhuizhi@126.com
 * @Timestamp : 2016-06-16
 */
// 根据sm的类型获取单实例对象
var nf = sm("do_Notification");
var pedometer = sm("M1294_Pedometer");
var page = sm("do_Page");
var storage = sm("do_Storage");
var global = sm("do_Global");
var app = sm("do_App");
var close = ui("close");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})
var d0 = new Date();
var d = JSON.stringify(new Date()).substring(1, 11)
var d1 = JSON.stringify(new Date(d0 - (86400000 * 1))).substring(1, 11);
var d2 = JSON.stringify(new Date(d0 - (86400000 * 2))).substring(1, 11);
var d3 = JSON.stringify(new Date(d0 - (86400000 * 3))).substring(1, 11);
var d4 = JSON.stringify(new Date(d0 - (86400000 * 4))).substring(1, 11);
var d5 = JSON.stringify(new Date(d0 - (86400000 * 5))).substring(1, 11);
var d6 = JSON.stringify(new Date(d0 - (86400000 * 6))).substring(1, 11);

page.on("loaded",function(){
	pedometer.start();
	count.text = pedometer.getInfo().count;
	pbar.text = pedometer.getInfo().count;
	delay3.start();
})


var count = ui("count");
var pbar = ui("do_ProgressBar2_1")
var webview = ui("do_WebView_1")
var delay3 = mm("do_Timer");
delay3.interval = 1000;
delay3.on("tick", function(){
	if(storage.fileExist("data://bushu.text")){
		storage.readFile("data://bushu.text",function(data,e){
		var datas = data;
		if(datas[0].day == d){
			datas[0].data = pedometer.getInfo().count;
		}else{
			datas.unshift({day:d,data:pedometer.getInfo().count});
			datas.splice(datas.length-1,1);
		}
		
		var count1 = parseInt(data[6].data);
      	var count2 = parseInt(data[5].data);
      	var count3 = parseInt(data[4].data);
      	var count4 = parseInt(data[3].data);
      	var count5 = parseInt(data[2].data);
      	var count6 = parseInt(data[1].data);
      	var count7 = parseInt(data[0].data);
      	var T = [count1,count2,count3,count4,count5,count6,count7];
      	global.setMemory("T", T);
      	page.fire("xsqs", function(data){
        });
		storage.writeFile("data://bushu.text",datas);
		});
	}else{
		var datas = [
                   	 {day : d,data:0},
                   	 {day : d1,data:0},
                   	 {day : d2,data:0},
                   	 {day : d3,data:0},
                   	 {day : d4,data:0},
                   	 {day : d5,data:0},
                   	 {day : d6,data:0}
                   	]

		storage.writeFile("data://bushu.text", datas);
	}
	count.text = pedometer.getInfo().count;
	pbar.text = pedometer.getInfo().count;
});






