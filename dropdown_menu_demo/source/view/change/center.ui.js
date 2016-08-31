var do_Page=sm("do_Page");
var do_Label_title = ui("do_Label_title")

//传递文字
do_Page.on("pass_title",function(data){
	do_Label_title.text = data.data
})