/**
 * related to select_bg_cell.ui
 * 
 * @Author : logo_qy@163.com
 * @Timestamp : 2016-08-11
 */
var page = sm("do_Page");
var rootView = ui("$");
var img = ui("img");
rootView.setMapping({
    "img.source":"img"
});

img.on("touch",function(){
	page.fire("select_bg1");
})
