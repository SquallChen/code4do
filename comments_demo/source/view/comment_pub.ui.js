var app = sm("do_App");
var page = sm("do_Page");
var nf = sm("do_Notification");
var global = sm("do_Global");
var rootview = ui("$");
var do_Storage =sm("do_Storage")

page.on("back", function(data){
    do_Storage.deleteFile("data://comment",function(data, e) {
    	
    })
    app.closePage();
});

ui("action_back").on("touch", function(){
    do_Storage.deleteFile("data://comment",function(data, e) {
    	
    })
    app.closePage();
});

var pagedata = page.getData();

var delay3 = mm("do_Timer");
delay3.delay = 0;
delay3.interval = 1000;
delay3.DURATION = 1;
delay3.on("tick", function(){
    if(this.DURATION <= 0){
        this.stop();
        app.closePage();
    }
    this.DURATION--;
});

var action_ok = ui("action_ok");
var tb_comment = ui("tb_comment");

action_ok.on("touch", function(){
	nf.confirm("确定是否发布评论?", function(state){
		if (state != 1) return;
	    page.hideKeyboard();
	    if (tb_comment.text.trim() == "") return nf.toast("请输入评论内容");
	    var body = {
	    		commentList: "宇文小白："+tb_comment.text.trim()+"\r\n",
		    	WorkCircleId: pagedata.id
	    }
	    
	    do_Storage.writeFile("data://comment", body, function(data, e) {
	    	
	    })
        nf.toast("评论成功");
        delay3.start();
	});
});
