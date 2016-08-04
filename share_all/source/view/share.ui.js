var rootview = ui("$");
var app = sm("do_App");
var page = sm("do_Page");
var nf = sm("do_Notification");
var btn_cancel = ui("btn_cancel");

rootview.on("touch", function(){
    this.visible = false;
});

rootview.on("show",function(){
	rootview.visible = true;
});

var action_alys = [
    ui("action_wx"),
    ui("action_qq"),
    ui("action_wb")
];

for (var i = 0; i < action_alys.length; i++) {
    action_alys[i].on("touch", function(){
        rootview.visible = false;
        page.fire("share-listen", this.id.substr(7));
    })
}

ui("do_actions").on("touch", function(){
    
});
ui("btn_cancel").on("touch",function(){
	rootview.visible = false;
})

rootview.visible = false;