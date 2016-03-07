//引入组件库
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_Global = sm("do_Global");
//声明UI变量
var do_TextField_url=ui("do_TextField_url");
var do_ImageView_opt=ui("do_ImageView_opt");
var do_ALayout_opt=ui("do_ALayout_opt");
var do_WebView_content=ui("do_WebView_content");
var do_ALayout_testPage=ui("do_ALayout_testPage");
var do_ALayout_deviceonePage=ui("do_ALayout_deviceonePage");

//根据url内容是否为空，决定当前操作的图片
do_TextField_url.on("textChanged", function(){
	if (do_TextField_url.text.length > 0){
		do_ImageView_opt.source="source://image/go.png";
	}
	else{
		do_ImageView_opt.source="source://image/barcode.png";
	}
});

//打开测试页面
do_ALayout_testPage.on("touch", function(){
	do_TextField_url.text = "source://view/find/webTest.htm";
	//对do_ALayout_opt发送touch消息
	do_ALayout_opt.fire("touch");
});

//打开官网首页
do_ALayout_deviceonePage.on("touch", function(){
	do_TextField_url.text = "http://www.deviceone.net";
	//对do_ALayout_opt发送touch消息
	do_ALayout_opt.fire("touch");
});

//根据url内容是否为空，决定当前操作的方法(扫描网址或直接打开网址)
do_ALayout_opt.on("touch", function(){
	if (do_TextField_url.text.length > 0){
		do_WebView_content.url = "";
		do_WebView_content.url = do_TextField_url.text;
	}
	else{
		do_App.openPage({
			source:"source://view/find/scanBarcode.ui", 
			statusBarState:"transparent",
			animationType: "fade"
				});
	}
});

//上层Page关闭时的事件
do_Page.on("result", function(data) {
	if (data==null || data.length <=0) return;
	do_TextField_url.text = data;
	//对do_ALayout_opt发送touch消息
	do_ALayout_opt.fire("touch");
});
