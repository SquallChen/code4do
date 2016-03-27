var app = sm("do_App");
var page = sm("do_Page");
var nf = sm("do_Notification");
var global = sm("do_Global");
var root = ui("$");

var data = [];

page.on("back", function(data) {
    app.closePage(data);
});

ui("action_back").on("touch", function() {
    app.closePage();
}).on('touchDown', function() {
	this.bgColor = '02bcebff';
}).on('touchUp', function() {
	this.bgColor = '0099ccff';
});

var action_add = ui("action_add");
action_add.visible = false;

action_add.on("touch", function(res) {
	
	//nf.alert(data);

	if(data.tag == 'save') {
		page.fire('submit', {});
	}
	if(data.tag == 'add') {
		app.openPage(data.view);
	}
    
}).on('touchDown', function() {
	this.bgColor = '02bcebff';
}).on('touchUp', function() {
	this.bgColor = '0099ccff';
});

root.on("init", function(res) {
	
	ui('title').text = res.title;
	data = res;
	
	if(data.tag) {
		action_add.visible = true;
	}
	
	if(data.tag == 'save') {
		ui('do_ImageView_6').source = 'source://image/iconfont-yuanxingxuanzhong.png';
	}
	
	/*
	if(data.tag == 'add') {
		action_add.tag = data.view;
		action_add.visible = true;
	}
	if(data.tag == 'edit') {
		action_add.tag = 'edit';
		action_add.visible = true;
	}*/
});