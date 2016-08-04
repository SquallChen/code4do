/**
 * related to listcell.ui
 * 
 * @Author : zxhuizhi@126.com
 * @Timestamp : 2016-07-20
 */
var page = sm("do_Page");

var rootView = ui("$");
var do_ImageView_1 =ui("do_ImageView_1");
var do_Label_1 = ui("do_Label_1");
var do_Label_3 = ui("do_Label_3");
rootView.setMapping({
    "do_ImageView_1.source":"source",
    "do_Label_1.text":"text",
    "do_Label_3.text":"text3"
});