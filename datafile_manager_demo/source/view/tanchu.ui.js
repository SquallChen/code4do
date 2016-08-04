/**
 * related to tanchu.ui
 * 
 * @Author : zxhuizhi@126.com
 * @Timestamp : 2016-08-02
 */
var rootView = ui("$");
var page = sm("do_Page");
var do_Notification = sm("do_Notification");
var do_Storage = sm("do_Storage");
var do_App  = sm("do_App");
var do_Global = sm("do_Global");
var do_ALayout_10 = ui("do_ALayout_10");
var do_ALayout_1 = ui("do_ALayout_1");
var do_ALayout_copy = ui("do_ALayout_copy");
var do_ALayout_paste = ui("do_ALayout_paste");
var do_ALayout_delete = ui("do_ALayout_delete");
var do_Label_1 = ui("do_Label_1");
var duixiang ={};
//var lv_data1=[];
page.on("show",function(data){
 do_ALayout_10.visible = "true";//显示透明页面
 duixiang = data;
 
});

do_ALayout_copy.on("touch",function(){//点击文件复制按钮
	if(do_Label_1.text=="copy"){
	do_Storage.copyFile(duixiang.k1,"data://copy/"+duixiang.k2, function(){
		do_Label_1.text="粘贴"
            	})
        }
	else 	
	{
		
		do_Label_1.text="copy"
		
		page.fire("close",{"kk2":duixiang.k2,"kk4":duixiang.k4.source,"kk3":duixiang.k3,})
		 do_ALayout_10.visible ="false";//关闭透明页面

	}
})


       
       
       
  do_ALayout_delete.on("touch",function(){//点击删除按钮
	  
	  
	  
  })
	 do_ALayout_paste.on("touch",function(){//点击粘贴按钮
			  
			  
			  
		  })




do_ALayout_1.on("touch",function(){//关闭页面
    do_ALayout_10.visible = "false";
 })
	

