//引入组件库
var do_Notification = sm("do_Notification");
var do_Global = sm("do_Global");
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var do_External = sm("do_External");
//声明UI变量
var do_ALayout_root=ui("do_ALayout_root");
var do_Label_Name=ui("do_Label_Name");

ui("$").setMapping({
	"do_Label_Name.text" : "text",
	"do_Label_Name.tag" : "phone"
});

do_ALayout_root.on("touch", function(){
	do_External.openDial(do_Label_Name.tag);
	
});