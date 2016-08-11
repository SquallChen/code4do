/**
 * related to select_bg.ui
 * 
 * @Author : logo_qy@163.com
 * @Timestamp : 2016-08-11
 */
var page = sm("do_Page")
var do_ALayout_root = ui("do_ALayout_root")
var do_GridView_bg = ui("do_GridView_bg");
var listdata = mm("do_ListData");
do_GridView_bg.bindItems(listdata);

var data_bg = [
               {img:"source://image/bg_img/1.png"},
               {img:"source://image/bg_img/2.png"},
               {img:"source://image/bg_img/3.png"},
               {img:"source://image/bg_img/4.png"},
               {img:"source://image/bg_img/5.png"},
               {img:"source://image/bg_img/6.png"},
               {img:"source://image/bg_img/7.png"},
               {img:"source://image/bg_img/8.png"},
               {img:"source://image/bg_img/9.png"},
               {img:"source://image/bg_img/10.png"},
               {img:"source://image/bg_img/11.png"},
               {img:"source://image/bg_img/12.png"}
           ]
listdata.addData(data_bg);
do_GridView_bg.refreshItems();

do_ALayout_root.on("touch",function(){
	page.fire("select_bg1");

})
