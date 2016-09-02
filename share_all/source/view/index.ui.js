var nf = sm("do_Notification");
var initdata = sm("do_InitData");
var page = sm("do_Page");
var do_App = sm("do_App");
var device = sm("do_Device");
var qq = sm("do_TencentQQ");
var wx = sm("do_TencentWX");
var wb = sm("do_SinaWeiBo");
var do_ALayout_root=ui("do_ALayout_root");
var do_Button_share = ui("do_Button_share");
var do_ALayout_back = ui("do_ALayout_back");
var share = ui(do_ALayout_root.add("share", "source://view/share.ui", 0, 0));

var do_Button_picture = ui("do_Button_picture");
var do_Button_pic_text = ui("do_Button_pic_text");
var do_Button_music = ui("do_Button_music");
var do_Button_video = ui("do_Button_video");
var do_Button_app = ui("do_Button_app");

do_ALayout_back.on("touch",function(){
	do_App.closePage();
})
page.on("back",function(){
	do_App.closePage();
})
var share_type = [ 
     	{
     		btnUI:do_Button_picture,
     		type:"0"
     	}, 
     	{
     		btnUI:do_Button_pic_text,
     		type:"1"
     	}, 
     	{
     		btnUI:do_Button_music,
     		type:"2"
     	},
     	{
     		btnUI:do_Button_video,
     		type:"3"
     	},
     	{
     		btnUI:do_Button_app,
     		type:"4"
     	}
];

var type = "0";
var action_btn = function(share_type){
	for(var i=0; i<share_type.length; i++){
		share_type[i].btnUI.on("touch", i, function(_data, _para){
			var _index = _para.data;
			for(var j=0; j<share_type.length; j++){
				if (_index==j){
					share_type[j].btnUI.bgColor = "4BACEEFF";
					share_type[j].btnUI.fontColor = "FFFFFFFF";
					type = share_type[j].type;
				} else{
					share_type[j].btnUI.bgColor = "F5F5F5FF";
					share_type[j].btnUI.fontColor = "000000FF";
				}
			}
		});
	}
}
action_btn(share_type);


do_Button_share.on("touch",function(){
	share.fire("show");
})


var key = {
	    qq: "1104684313",
	    wb: "2299300367",
	    wx: "wx7589880f174273b5",   //wx377c5bb4592b3709
	    title: "欢迎使用Deviceone第三方应用分享",
	    url:"",
	    image: "",
	    summary: "",
	    audio: "",
		appName: "",
	    success: "分享成功",
	    fail: "分享失败"
	};
key.wx = device.getInfo().OS == "android" ? "wx7589880f174273b5" : "wxba6c0c3cf39df3eb";


var shareTo = function(id){
	if (type == "0"){  
		key.title = "纯图分享";
		key.type = 1;
		key.image = "data://logo.jpg";
	} else if (type == "1"){   
		key.type = 0;
		key.title = "图文分享";
		key.url = "http://www.deviceone.net";
		key.image = "data://logo.jpg";
		key.summary = "Deviceone——跨平台开发+纯原生体验的APP开发平台";
	} else if (type == "2"){   
		key.type = 2;
		key.title = "音乐分享";
		key.url = "http://staff2.ustc.edu.cn/~wdw/softdown/index.asp/0042515_05.ANDY.mp3";
		key.audio = "http://staff2.ustc.edu.cn/~wdw/softdown/index.asp/0042515_05.ANDY.mp3";
		key.image = "data://music_icon.jpg";
		key.summary = "音乐分享为音乐文件的远程链接,只支持网络音乐";
	} else if (type == "3"){   
		key.type = 3;
		key.title = "视频分享";
		key.url = "http://www.ydtsystem.com/CardImage/21/video/20140305/20140305124807_37734.mp4";
		key.image = "data://logo.jpg";
		key.summary = "视频分享为视频文件的远程链接,以URL的形式传入";
	} else if(type == "4"){   
		key.type = 3;
		key.title = "应用分享";
		key.image = "data://logo.jpg";
		key.url = "http://www.deviceone.net";
		key.summary = "分享DC协同应用";
		key.appName = "DC协同";
	}
	
    switch (id) {
    	case "qq":   
    		if (type == "3") return nf.toast("QQ暂不支持视频分享!");
    		if (type == "4" && device.getInfo().OS != "android") return nf.toast("IOS不支持应用分享!");
    		qq.shareToQQ({
	            appId: key.qq,
	            type: key.type,
	            title: key.title,
	            url: key.url,
	            image:key.image,
	            summary: key.summary,
	            audio:key.audio,
	            appName:key.appName
	        }, function(data){
	            if (data) nf.toast(key.success);
	        });
        break;
        case "wx":   
        	if (type == "3") return nf.toast("微信暂不支持视频分享!");
        	if (type == "4") return nf.toast("微信暂不支持应用分享!");
        	wx.share({
                appId: key.wx,
                scene: 0,//0：分享到微信好友；1：分享到微信朋友圈
                type: key.type,
                title: key.title,
                content: key.summary,
                url: key.url,
                image:key.image,
                audio:key.audio
            }, function(data){
                if (data) nf.toast(key.success);
            });
            break;
        case "wb":  
        	if (type == "0") return nf.toast("微博暂不支持纯图片分享!");
        	if (type == "4") return nf.toast("微博暂不支持应用分享!");
        	if (type == "2") key.type = 2;
        	if (type == "1") {   //图文分享
        		key.type = 0;
        		key.title = "图文分享";
        		key.url = "http://www.deviceone.net";
        		key.image = "data://logo.jpg";
        		key.summary = "Deviceone——跨平台开发+纯原生体验的APP开发平台";
        	}
        	var map = {
                    appId: key.wb,
                    type: key.type,
                    title: key.title,
                    image: key.image,
                    url: key.url,
                    summary: key.summary
                }
        	deviceone.print(JSON.stringify(map))
            wb.share(map, function(data){
                if (data) nf.toast(key.success);
            });
            break;
        default :
            nf.toast(key.fail);
    }
};

page.on("share-listen",shareTo);