var do_ImageView_copy = ui("do_ImageView_copy") 
var do_ImageView_delete = ui("do_ImageView_delete") 
var do_ImageView_cut = ui("do_ImageView_cut") 
var page = sm("do_Page");
var do_Notification = sm("do_Notification");
var do_Storage = sm("do_Storage");
var do_App  = sm("do_App");
var do_Global = sm("do_Global");
var do_ALayout_10 = ui("do_ALayout_10");
var do_ALayout_copy = ui("do_ALayout_copy");
var do_ALayout_cut = ui("do_ALayout_cut");
var do_ALayout_delete = ui("do_ALayout_delete");
var do_Label_1 = ui("do_Label_1");
var do_Label_2 = ui("do_Label_2");
var duixiang ={};

page.on("show",function(data){
	//do_Notification.alert(data);
	do_ALayout_10.visible = "true";//显示透明页面
	duixiang = data;
});

do_ALayout_copy.on("touch",function(){
	if(do_Label_1.text=="复制"){
		do_Label_1.text="粘贴"
	}else{
		do_Label_1.text="复制"
		page.fire("close",{"k1":duixiang.k1,"k2":duixiang.k2,"k3":duixiang.k3,"k4":duixiang.k4.source,})
		do_ALayout_10.visible ="false";//关闭透明页面
	}
})
do_ALayout_delete.on("touch",function(){//点击删除按钮
	 page.fire("delete",{"k1":duixiang.k1,"k3":duixiang.k3,"k5":duixiang.k5})
	 do_ALayout_10.visible ="false";
})
do_ALayout_cut.on("touch",function(){//点击剪切按钮
    if(do_Label_2.text=="剪切"){
		 do_Label_2.text="粘贴"
		 page.fire("cut",{"k1":duixiang.k1,"k5":duixiang.k5,"k2":duixiang.k2,"k3":duixiang.k3})
    } else{       
		 do_Label_2.text="剪切";
    	 page.fire("paste",{"k2":duixiang.k2,"k4":duixiang.k4,"k3":duixiang.k3})
    	 do_ALayout_10.visible ="false";
	}	  
})//剪切按钮
do_ALayout_10.on("touch",function(){//关闭页面
    do_ALayout_10.visible = "false";
    do_Label_1.text="复制";
    do_Label_2.text="剪切";
 })
	

