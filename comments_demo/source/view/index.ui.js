var rootview = ui("$");
var app = sm("do_App");
var page = sm("do_Page");
var nf = sm("do_Notification");
var global = sm("do_Global");
var imgbrowser = sm("do_ImageBrowser");
var do_Storage =sm("do_Storage")
var defaultData = require("defaultData")

var canBack = false;
var delay3 = mm("do_Timer");
delay3.delay = 3000;
delay3.on("tick", function(){
	delay3.stop();
    canBack = false;
}); 
page.on("back", function(){
    if (canBack) {
    	global.exit();
    } else {
    	nf.toast("再次点击退出应用");
        canBack = true;
        delay3.start();
    }
});

var listview = ui("do_ListView");
var listdata = mm("do_ListData");
listview.bindItems(listdata);

//绑定初始数据
var datas = defaultData.getAllData();
listdata.addData(datas);
listview.refreshItems();

//查看全文、收起全文
page.on("check-all-listen", function(data){
    listdata.getRange(0).forEach(function(v, k){
    	if(v.id == "3"){
            v.msgVis = !data.vis;
            v.msgAllVis = data.vis;
            v.lb_check = (v.msgVis ? "查看全部" : "收起全文") ;
            listdata.updateOne(k, v);
            return listview.refreshItems();
    	}
    });
});

//图片浏览
page.on("imgs-listen", function(data){
    imgbrowser.show(data.s, data.i);
});

page.on("comment-listen", function(data){
	app.openPage({source: "source://view/comment_pub.ui", data: data, keyboardMode: "hidden"});
});

var commentList1 = []
var commentList2 = []
var commentList3 = []
var commentList4 = []
var commentList5 = []
var commentList6 = []
var commentList7 = []
//发表评论后重新绑定数据
page.on("result", function(data){
	if (do_Storage.fileExist("data://comment")){
		do_Storage.readFile("data://comment", function(data, e) {
			datas = defaultData.getAllData();
			if(data.WorkCircleId == "1"){
				var comment = ""
				commentList1.push({commentList:data.commentList})
				commentList1.forEach(function(k, v) {
					comment+=k.commentList
				})
				listdata.updateOne(1, {"id":"1",template:1,"UserIcon" : "http://www.easyicon.net/api/resizeApi.php?id=543476&size=96","UserName":"晴天的小雨","Message":"今天真的很不爽啊！","msgVis":"true","btn_check":"false","lb_check":"","CreateTime":"1小时前","commentList":"王 岚:怎么啦？\r\n郭 宇:怎么啦兄弟？\r\n王聪:？？？\r\n梦楠:谁惹你啦？\r\n"+comment,"commentVis":"true"})
				listview.refreshItems();
			}
			if(data.WorkCircleId == "2"){
				var comment = ""
				commentList2.push({commentList:data.commentList})
				commentList2.forEach(function(k, v) {
					comment+=k.commentList
				})
				listdata.updateOne(2, {"id":"2",template:1,"UserIcon" : "http://www.easyicon.net/api/resizeApi.php?id=1096314&size=96","UserName":"飞天猪","Message":"中国队加油啊！！！","msgVis":"true","btn_check":"false","lb_check":"","CreateTime":"昨天","commentList":"仲宇:加油！\r\n尹航:球迷啊兄弟？\r\n迟建:还看球呢啊？\r\n慧慧:加油\r\n李步安:必须赢\r\n天宏:加油\r\n"+comment,"commentVis":"true"})
				listview.refreshItems();
			}
			if(data.WorkCircleId == "3"){
				var comment = ""
				commentList3.push({commentList:data.commentList})
				commentList3.forEach(function(k, v) {
					comment+=k.commentList
				})
				listdata.updateOne(3, {"id":"3",template:1,"UserIcon" : "http://www.easyicon.net/api/resizeApi.php?id=1081923&size=96","UserName":"孤独者","Message":"你在我眼中是最美,每一个微笑都让我沉醉,你的怀你的好,你发脾气时翘起的嘴. 你在我眼中是最美,每一个微笑都让我沉醉,你的怀你的好,你发脾气时翘起的嘴.","msgVis":"true","btn_check":"true","lb_check":"查看全部","CreateTime":"昨天","commentList":"李秋平:赞！\r\n"+comment,"commentVis":"true"})
				listview.refreshItems();
			}
			if(data.WorkCircleId == "4"){
				var comment = ""
				commentList4.push({commentList:data.commentList})
				commentList4.forEach(function(k, v) {
					comment+=k.commentList
				})
				listdata.updateOne(4,{
				    "id":"4",
				    template:2,
				    "UserIcon" : "http://www.easyicon.net/api/resizeApi.php?id=1140681&size=96",
				    "UserName":"雨后彩虹","Message":"心如大海般的宽广","msgVis":"true","btn_check":"false","lb_check":"false",
				    "sources":datas[4].sources,
				    "img0t":"http://img4.imgtn.bdimg.com/it/u=83706964,3584924808&fm=206&gp=0.jpg","img0v":"true",
				    "img1t":"http://img2.imgtn.bdimg.com/it/u=3957342124,3169925288&fm=206&gp=0.jpg","img1v":"true",
				    "img2t":"http://pic.58pic.com/58pic/14/27/55/90Q58PICFrz_1024.jpg","img2v":"true",
				    "CreateTime":"2天前","commentList":"李秋平:赞！\r\n红玉:说的太好了！\r\n甜甜:看好你啊！\r\n"+comment,"commentVis":"true"
			    })
				listview.refreshItems();
			}
			if(data.WorkCircleId == "5"){
				var comment = ""
				commentList5.push({commentList:data.commentList})
				commentList5.forEach(function(k, v) {
					comment+=k.commentList
				})
				listdata.updateOne(5,{
				    "id":"5",
				    template:3,
				    "UserIcon" : "http://www.easyicon.net/api/resizeApi.php?id=1118131&size=72",
				    "UserName":"春天里","Message":"我家大贝贝","msgVis":"true","btn_check":"false","lb_check":"false",
				    "sources":datas[5].sources,
				    "img0t":"http://image6.huangye88.com/2013/04/18/81ad1ea76bde68f0.jpg","img0v":"true",
				    "img1t":"http://img1.3lian.com/img013/v2/96/d/24.jpg","img1v":"true",
				    "img2t":"http://att2.citysbs.com/tiaozao/2012/09/14/10/middle_105935_13221347591575559_03e24f5496f0beca0a9ad5347bf0708f.jpg","img2v":"true",
				    "img3t":"http://image6.huangye88.com/2014/03/12/ac1e6e5edf367e22.jpg","img3v":"true",
				    "img4t":"http://www.zhongaigou.com/uploadfiles/41148/4841%20%2818%29.jpg","img4v":"true",
				    "img5t":"http://h.hiphotos.baidu.com/zhidao/pic/item/86d6277f9e2f07080f07efcde824b899a801f2f9.jpg","img5v":"true",
				    "CreateTime":"2天前","commentList":"鸿运当头:赞！\r\n"+comment,"commentVis":"true"
			    })
				listview.refreshItems();
			}
			if(data.WorkCircleId == "6"){
				var comment = ""
				commentList6.push({commentList:data.commentList})
				commentList6.forEach(function(k, v) {
					comment+=k.commentList
				})
				listdata.updateOne(6,{
				    "id":"6",
				    template:4,
				    "UserIcon" : "http://www.easyicon.net/api/resizeApi.php?id=1082075&size=96",
				    "UserName":"潇潇洒洒","Message":"中国女排好样的！","msgVis":"true","btn_check":"false","lb_check":"false",
				    "sources":datas[6].sources,
				    "img0t":"http://dealer2.autoimg.cn/dealerdfs/g6/M05/0D/3F/620x0_1_q87_autohomedealer__wKgHzVe7nKiATV36AAKnEkrSFYo668.jpg","img0v":"true",
				    "img1t":"http://www.chinaacc.com/upload/html/2016/08/21/yud01b880c28684df28173790ce70b9876.jpg","img1v":"true",
				    "img2t":"http://365jia.cn/uploads/news/folder_199665/images/4cc851514e7e18a7dffe799daf285429.jpg","img2v":"true",
				    "img3t":"http://epaper.ssrb.com.cn/resfile/2016-08-22/08/h22ldlb0801_s.jpg","img3v":"true",
				    "img4t":"http://www.16fafa.cn/file/upload/201608/21/164308601.jpg","img4v":"true",
				    "img5t":"http://pic1.hebei.com.cn/003/006/439/00300643930_d82f8d96.jpg","img5v":"true",
				    "img6t":"http://image99.360doc.com/DownloadImg/2016/08/2301/78515567_2.JPG","img6v":"true",
				    "img7t":"http://wb.xxrb.com.cn/res/1/2/2016-08/22/A14/res01_attpic_brief.jpg","img7v":"true",
				    "CreateTime":"3天前","commentList":"李秋平:赞！\r\n"+comment,"commentVis":"true"
			    })
				listview.refreshItems();
			}
			if(data.WorkCircleId == "7"){
				var comment = ""
				commentList7.push({commentList:data.commentList})
				commentList7.forEach(function(k, v) {
					comment+=k.commentList
				})
				listdata.updateOne(7,{
				    "id":"7",
				    template:5,
				    "UserIcon" : "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=4282290173,3793333611&fm=58",
				    "UserName":"科比","Message":"我永远的男神！","msgVis":"true","btn_check":"false","lb_check":"false",
				    "sources":datas[7].sources,
				    "img0t":"https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1466477620&di=2221f1bc400ca208709720a31bc5d7a3&src=http://photocdn.sohu.com/20151206/Img429926183.jpg","img0v":"true",
				    "CreateTime":"3天前","commentList":"李秋平:赞！\r\n"+comment,"commentVis":"true"
			    })
				listview.refreshItems();
			}
		})
	}
});

