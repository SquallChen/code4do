/**
 * related to index.ui
 * 
 * @Author : zxhuizhi@126.com
 * @Timestamp : 2016-07-28
 */
var toolbar = require("toolbar"),
    URL = require("url"),
    page = sm("do_Page"),
    nf = sm("do_Notification"),
    baidulocation = sm("do_BaiduLocation"),
    rootview = ui("$"),
    data = mm("do_HashData");


var VerticalSlideView = ui("do_VerticalSlideView_1");
//添加模板数据
var data1 = [
    {template:0},
    {template:1}
    ];
 
//根据ID获取VerticalSlideVie实例对象；
var VerticalSlideView = ui("do_VerticalSlideView_1");
 
//创建一个ListData集合对象
var listdata = mm("do_ListData");
//绑定listdata视图模板数据
listdata.addData(data1);
//给SlideView绑定一个listData；
VerticalSlideView.bindItems(listdata);
//刷新数据，此方法只有在listData数据发生变化时需要调用；
VerticalSlideView.refreshItems();