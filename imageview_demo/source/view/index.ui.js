/**********************************************
 * Author : @Author
 * Timestamp : @Timestamp
 **********************************************/
var nf = sm("do_Notification");
var btn_hello = ui("btn_hello");

btn_hello.on("touch",function(){
    nf.alert("Hello World !!!!!");
});