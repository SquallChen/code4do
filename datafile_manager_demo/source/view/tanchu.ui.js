/**
 * related to tanchu.ui
 * 
 * @Author : zxhuizhi@126.com
 * @Timestamp : 2016-08-02
 */
var do_ImageView_copy = ui("do_ImageView_copy") 
var do_ImageView_delete = ui("do_ImageView_delete") 
var do_ImageView_cut = ui("do_ImageView_cut") 
var rootView = ui("$");
var page = sm("do_Page");
var do_Notification = sm("do_Notification");
var do_Storage = sm("do_Storage");
var do_App  = sm("do_App");
var do_Global = sm("do_Global");
var do_ALayout_10 = ui("do_ALayout_10");
var do_ALayout_1 = ui("do_ALayout_1");
var do_ALayout_copy = ui("do_ALayout_copy");
var do_ALayout_cut = ui("do_ALayout_cut");
var do_ALayout_delete = ui("do_ALayout_delete");
var do_Label_1 = ui("do_Label_1");
var do_Label_2 = ui("do_Label_2");
var duixiang ={};
	page.on("show",function(data){
	 do_ALayout_10.visible = "true";//显示透明页面
	 duixiang = data;
	});
do_ALayout_copy.on("touch",function(){
	if(do_Label_1.text=="copy"){
		do_Storage.copy([duixiang.k1],"data://copy/"+duixiang.k2, function(){
			do_Label_1.text="paste"
	          })//duixiang.k1是原路径，
	     }//把文件复制到另一个文件夹下面，实质读取的时候还是读取的源文件
		else{
			do_Label_1.text="copy"
			page.fire("close",{"kk2":duixiang.k2,"kk4":duixiang.k4.source,"kk3":duixiang.k3,})
			do_ALayout_10.visible ="false";//关闭透明页面
		 }
      })//do_ALayout_copy 点击文件复制按钮
do_ALayout_delete.on("touch",function(){//点击删除按钮
	  page.fire("delete",{"dk1":duixiang.k1,"dk5":duixiang.k5})
	  do_ALayout_10.visible ="false";
})
do_ALayout_cut.on("touch",function(){//点击剪切按钮
 if(do_Label_2.text=="cut"){
	 do_Label_2.text="paste"
	 page.fire("cut",{cdk1:duixiang.k1,cdk5:duixiang.k5,cdk2:duixiang.k2,cdk3:duixiang.k3})
     }
	 else{       
		 do_Label_2.text="cut";
    	 page.fire("paste",{pk2:duixiang.k2,pk4:duixiang.k4,pk3:duixiang.k3})
    	 do_ALayout_10.visible ="false";
	    }	  
})//剪切按钮
do_ALayout_1.on("touch",function(){//关闭页面
    do_ALayout_10.visible = "false";
    do_Label_1.text="copy";
    do_Label_2.text="cut";
 })
	

