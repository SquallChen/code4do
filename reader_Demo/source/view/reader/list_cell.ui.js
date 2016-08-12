var do_Page=sm("do_Page");
var root=ui("$");
var do_ALayout_root = ui("do_ALayout_root")
var do_Label_content = ui("do_Label_content")
var do_Notification = sm("do_Notification");

//设置数据绑定的映射关系
root.setMapping({
	"do_Label_content.text":"text",
	"do_Label_content.fontColor":"fontcolor",
	"do_ALayout_root.bgColor":"bgcolor",
	"do_Label_content.fontSize":"fontsize"
});

do_ALayout_root.on("touch",function(){
	do_Page.fire("show");
})

