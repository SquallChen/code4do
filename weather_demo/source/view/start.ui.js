/**
 * related to start.ui
 * 
 * @Author : zxhuizhi@126.com
 * @Timestamp : 2016-08-12
 */
var page = sm("do_Page");
var do_ALayout_Root = ui("do_ALayout_Root");
do_ALayout_Root.on("touch",function(){
	page.fire("COLSE");
})
