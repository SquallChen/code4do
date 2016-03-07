//引入组件库
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_Device = sm("do_Device");
//声明UI变量
var do_ALayout_back=ui("do_ALayout_back");
var do_ALayout_flash=ui("do_ALayout_flash");
var do_BarcodeView_scan=ui("do_BarcodeView_scan");

//订阅android系统返回键的事件：关闭当前页面
do_Page.on("back", function(){
	do_App.closePage();
});

//关闭当前页面
do_ALayout_back.on("touch", function(){
	do_App.closePage();
});


//打开关闭闪光灯
var isFlashOpening =false;
do_ALayout_flash.on("touch", function() {
	if (isFlashOpening){
		isFlashOpening=false;
		do_BarcodeView_scan.flash("off");
	}
	else{
		isFlashOpening=true;
		do_BarcodeView_scan.flash("on");
	}
});

//扫描二维码
do_BarcodeView_scan.start(function(data, e) {
    //扫描成功，执行回调函数
	do_Device.beep();
	do_App.closePage(data.value);
});

