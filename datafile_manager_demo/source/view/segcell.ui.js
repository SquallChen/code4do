/**
 * related to segcell.ui.ui
 * 
 * @Author : logo_qy@163.com
 * @Timestamp : 2016-08-17
 */
var page = sm("do_Page");
var rootView = ui("$");
var do_Label_2 = ui("do_Label_2");
rootView.setMapping({
    "do_Label_2.text":"text",
    "do_Label_2.tag":"index"
});
	
rootView.on("touch",function(){
	page.fire("touch_mulu",do_Label_2.tag)
	})