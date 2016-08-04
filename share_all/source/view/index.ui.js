var nf = sm("do_Notification");
var initdata = sm("do_InitData");
var page = sm("do_Page");
var qq = sm("do_TencentQQ");
var wx = sm("do_TencentWX");
var wb = sm("do_SinaWeiBo");
var do_ALayout_root=ui("do_ALayout_root");
var do_ALayout_share = ui("do_ALayout_share");
var share = ui(do_ALayout_root.add("share", "source://view/share.ui", 0, 0));


do_ALayout_share.on("touch",function(){
	share.fire("show");
})
do_ALayout_share.on("touchDown",function(){
	do_ALayout_share.bgColor = "D9D9D9FF";
})
do_ALayout_share.on("touchUp",function(){
	do_ALayout_share.bgColor = "00000000";
})
initdata.copyFile("initdata://logo.jpg", "data://logo.jpg", function(data, e) {})


var key = {
	    qq: "1104824132",
	    wb: "2061910186",
	    wx: "wx36affd81495c7686",
	
	    title: "Deviceone——跨平台开发+纯原生体验的APP开发平台",
	    url:"http://www.deviceone.net",
	    image: "data://logo.jpg",
	    summary: "欢迎使用Deviceone",
	    success: "分享成功",
	    fail: "分享失败"
	};
var shareTo = function(id){
    switch (id) {
        case "wx":
        	wx.share({
                appId: key.wx,
                scene: 0,//0：分享到微信好友；1：分享到微信朋友圈
                type: 0,//0：默认，图文分享；1：纯图分享，只支持本地图片；2：音乐分享
                title: key.title,
                url: key.url,
                image:key.image,
                content: key.summary
            }, function(data){
                if (data) nf.toast(key.success);
            });
            break;
        case "qq":
        	qq.shareToQQ({
                appId: key.qq,
                type: 0,//	0：默认，图文分享；1：纯图分享，只支持本地图；2：音乐分享；3：应用分享
                title: key.title,
                url: key.url,
                image:key.image,
                summary: key.summary,
                audio:"",//音乐文件的远程链接, 以URL的形式传入, 不支持本地音乐
                appName:"分享demo"
            }, function(data){
                if (data) nf.toast(key.success);
            });
            break;
        case "wb":
            wb.share({
                appId: key.wb,
                type: 0,//0：默认，图文分享；1：网页分享；2：音乐分享；3：视频分享；4：音频分享；
                title: key.title,
                image: key.image,
                url: key.url,
                summary: key.summary
            }, function(data){
                if (data) nf.toast(key.success);
            });
            break;
        default :
            nf.toast(key.fail);
    }
};

page.on("share-listen",shareTo);