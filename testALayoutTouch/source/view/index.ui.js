/**********************************************
 * Author : @Author
 * Timestamp : @Timestamp
 **********************************************/
var nf = sm("do_Notification");
var imageview1 = ui("do_ImageView_1");

imageview1.on("touch",function(){
    nf.alert("我被点中了");
});

var alayout = ui("do_ALayout_3");

alayout.on("touch",function(){
    nf.alert("我被点中了");
});
