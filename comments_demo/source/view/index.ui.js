var rootview = ui("$");
var app = sm("do_App");
var page = sm("do_Page");
var nf = sm("do_Notification");
var global = sm("do_Global");
var imgbrowser = sm("do_ImageBrowser");

var back = ui("back")
back.on("touch",function(){
    nf.confirm("确定退出应用吗?", function(state){
        if (state != 1) return;
        global.exit();
    });
})

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


//模板1-3图片点击放大数据
var temps_images = [
              {
                      source : "http://img5.imgtn.bdimg.com/it/u=3587880145,3506996870&fm=21&gp=0.jpg",
                      init : "http://img5.imgtn.bdimg.com/it/u=3587880145,3506996870&fm=21&gp=0.jpg"
              },
              {
                      source : "http://img5.imgtn.bdimg.com/it/u=696350241,2257397444&fm=21&gp=0.jpg",
                      init : "http://img5.imgtn.bdimg.com/it/u=696350241,2257397444&fm=21&gp=0.jpg"
              },
              {
                      source : "http://img4.imgtn.bdimg.com/it/u=1030613886,823910518&fm=21&gp=0.jpg",
                      init : "http://img4.imgtn.bdimg.com/it/u=1030613886,823910518&fm=21&gp=0.jpg"
              }
];

//模板4图片点击放大数据
var temp4_images = [
              {
                      source : "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1466477620&di=2221f1bc400ca208709720a31bc5d7a3&src=http://photocdn.sohu.com/20151206/Img429926183.jpg",
                      init : "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1466477620&di=2221f1bc400ca208709720a31bc5d7a3&src=http://photocdn.sohu.com/20151206/Img429926183.jpg"
              }
];

//模板绑定数据
var datas = 
	[
	 //模板0对应cell0.ui
    {"id":"1",template:0,"UserIcon" : "http://www.easyicon.net/api/resizeApi.php?id=543476&size=96","UserName":"晴天的小雨","Message":"今天真的很不爽啊！","msgVis":"true","btn_check":"false","lb_check":"","CreateTime":"1小时前","commentList":"王 岚:怎么啦？\r\n郭 宇:怎么啦兄弟？\r\n王聪:？？？\r\n梦楠:谁惹你啦？","commentVis":"true"},
    //模板0对应cell0.ui
    {"id":"2",template:0,"UserIcon" : "http://www.easyicon.net/api/resizeApi.php?id=1096314&size=96","UserName":"飞天猪","Message":"中国队加油啊！！！","msgVis":"true","btn_check":"false","lb_check":"","CreateTime":"昨天","commentList":"仲宇:加油！\r\n尹航:球迷啊兄弟？\r\n迟建:还看球呢啊？\r\n慧慧:加油\r\n李步安:必须赢\r\n天宏:加油\r\n","commentVis":"true"},
    //模板0对应cell0.ui
    {"id":"3",template:0,"UserIcon" : "http://www.easyicon.net/api/resizeApi.php?id=1081923&size=96","UserName":"孤独者","Message":"你在我眼中是最美,每一个微笑都让我沉醉,你的怀你的好,你发脾气时翘起的嘴. 你在我眼中是最美,每一个微笑都让我沉醉,你的怀你的好,你发脾气时翘起的嘴.","msgVis":"true","btn_check":"true","lb_check":"查看","CreateTime":"昨天","commentList":"","commentVis":"false"},        
    //模板1对应cell1.ui
    {
	    "id":"4",
	    template:1,
	    "UserIcon" : "http://www.easyicon.net/api/resizeApi.php?id=1140681&size=96",
	    "UserName":"雨后彩虹","Message":"心如大海般的宽广","msgVis":"true","btn_check":"false","lb_check":"false",
	    "sources":temps_images,
	    "img0t":"http://img5.imgtn.bdimg.com/it/u=3587880145,3506996870&fm=21&gp=0.jpg","img0v":"true",
	    "img1t":"http://img5.imgtn.bdimg.com/it/u=696350241,2257397444&fm=21&gp=0.jpg","img1v":"true",
	    "img2t":"http://img4.imgtn.bdimg.com/it/u=1030613886,823910518&fm=21&gp=0.jpg","img2v":"true",
	    "img3t":"http://img4.imgtn.bdimg.com/it/u=1030613886,823910518&fm=21&gp=0.jpg","img3v":"true",
	    "img4t":"http://img4.imgtn.bdimg.com/it/u=1030613886,823910518&fm=21&gp=0.jpg","img4v":"true",
	    "CreateTime":"2天前","commentList":"李秋平:赞！\r\n红玉:说的太好了！\r\n甜甜:看好你啊！","commentVis":"true"
    },
    //模板2对应cell2.ui
    {
	    "id":"5",
	    template:2,
	    "UserIcon" : "http://www.easyicon.net/api/resizeApi.php?id=1118131&size=72",
	    "UserName":"春天里","Message":"我爱你大海","msgVis":"true","btn_check":"false","lb_check":"false",
	    "sources":temps_images,
	    "img0t":"http://img5.imgtn.bdimg.com/it/u=3587880145,3506996870&fm=21&gp=0.jpg","img0v":"true",
	    "img1t":"http://img5.imgtn.bdimg.com/it/u=696350241,2257397444&fm=21&gp=0.jpg","img1v":"true",
	    "img2t":"http://img4.imgtn.bdimg.com/it/u=1030613886,823910518&fm=21&gp=0.jpg","img2v":"true",
	    "img3t":"http://img5.imgtn.bdimg.com/it/u=3587880145,3506996870&fm=21&gp=0.jpg","img3v":"true",
	    "img4t":"http://img5.imgtn.bdimg.com/it/u=696350241,2257397444&fm=21&gp=0.jpg","img4v":"true",
	    "img5t":"http://img4.imgtn.bdimg.com/it/u=1030613886,823910518&fm=21&gp=0.jpg","img5v":"true",
	    "CreateTime":"2天前","commentList":"鸿运当头:赞！","commentVis":"true"
    },  
    //模板3对应cell3.ui
    {
	    "id":"6",
	    template:3,
	    "UserIcon" : "http://www.easyicon.net/api/resizeApi.php?id=1082075&size=96",
	    "UserName":"潇潇洒洒","Message":"第一次看见大海 好激动啊！","msgVis":"true","btn_check":"false","lb_check":"false",
	    "sources":temps_images,
	    "img0t":"http://img5.imgtn.bdimg.com/it/u=3587880145,3506996870&fm=21&gp=0.jpg","img0v":"true",
	    "img1t":"http://img5.imgtn.bdimg.com/it/u=696350241,2257397444&fm=21&gp=0.jpg","img1v":"true",
	    "img2t":"http://img4.imgtn.bdimg.com/it/u=1030613886,823910518&fm=21&gp=0.jpg","img2v":"true",
	    "img3t":"http://img5.imgtn.bdimg.com/it/u=3587880145,3506996870&fm=21&gp=0.jpg","img3v":"true",
	    "img4t":"http://img5.imgtn.bdimg.com/it/u=696350241,2257397444&fm=21&gp=0.jpg","img4v":"true",
	    "img5t":"http://img4.imgtn.bdimg.com/it/u=1030613886,823910518&fm=21&gp=0.jpg","img5v":"true",
	    "img6t":"http://img5.imgtn.bdimg.com/it/u=3587880145,3506996870&fm=21&gp=0.jpg","img6v":"true",
	    "img7t":"http://img5.imgtn.bdimg.com/it/u=696350241,2257397444&fm=21&gp=0.jpg","img7v":"true",
	    "CreateTime":"3天前","commentList":"","commentVis":"false"
    },  
   //模板4对应cell4.ui
    {
	    "id":"7",
	    template:4,
	    "UserIcon" : "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=4282290173,3793333611&fm=58",
	    "UserName":"科比","Message":"我永远的男神！","msgVis":"true","btn_check":"false","lb_check":"false",
	    "sources":temp4_images,
	    "img0t":"https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1466477620&di=2221f1bc400ca208709720a31bc5d7a3&src=http://photocdn.sohu.com/20151206/Img429926183.jpg","img0v":"true",
	    "CreateTime":"3天前","commentList":"","commentVis":"false"
    }  
    ]

listdata.addData(datas);
listview.refreshItems();

//查看全文、收起全文
page.on("check-all-listen", function(data){
    listdata.getRange(0).forEach(function(v, k){
    	if(v.id == "3"){
            v.msgVis = !data.vis;
            v.msgAllVis = data.vis;
            v.lb_check = (v.msgVis ? "查看" : "收起") + "全文";
            listdata.updateOne(k, v);
            return listview.refreshItems();
    	}
    });
});

//图片浏览
page.on("imgs-listen", function(data){
    imgbrowser.show(data.s, data.i);
});

