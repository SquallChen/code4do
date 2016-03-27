var page = sm("do_Page");
var nf = sm("do_Notification");

var rootView = ui("$");
ui("$").on("touch", function(){
    return false;
});


rootView.setMapping({
    "title.text" : "title",
});