/**
 * related to index2.ui
 * 
 * @Author : zxhuizhi@126.com
 * @Timestamp : 2016-07-22
 */
var do_Label_biaoti = ui("do_Label_biaoti");
var  do_External  = sm("do_External");
var do_App  = sm("do_App");
var page = sm("do_Page");
var do_Notification = sm("do_Notification");
var do_InitData = sm("do_InitData");
var rootView = ui("$");
var do_ListView_2 = ui("do_ListView_2")
var  do_ListData  = mm("do_ListData");
do_ListView_2.bindItems(do_ListData);
var do_Global = sm("do_Global");

var all = page.getData();//从上一个目录传过来的所有目录,目录是一个一个过来的先是tupian
do_Label_biaoti.text = "initdata://"+all+"/";
//do_Notification.alert(all);//   wenjian——tupian
rootView.add("tanchu","source://view/tanchu.ui", 0,80)




rootView.setMapping({
   "do_ImageView_1.source":"source",
   "do_Label_1.text":"text"
});

//获取wenjian或者tupian目录下的所有下一级目录列表
var lv_data=[];
do_InitData.getDirs("initdata://"+all,function(data1){
    
    
	if(data1.length>0){//获取所有下一级目录，并添加到数组里面
		data1.forEach(function(v,k)
			{//data1[k]为mulu文件夹，
			lv_data.push({"text":data1[k],"source":"source://image/mulutubiao.png","type":"目录"})
			});
		    }
	    else
	        {
	    	do_Notification.toast("没有目录了"); 
		    }
	
	//获取所有文件列表
	do_InitData.getFiles("initdata://"+all,function(data){
		if(data.length>0){//获取所有文件，也添加到数组里面
		data.forEach(function(v,k){
			var a = data[k].split(".");
			//do_Notification.alert(a);//["1","txt"]
      	if(a[1]=="txt")
				{
      		do_InitData.copyFile("initdata://"+page.getData()+"/"+data[k], "data://"+page.getData()+"/"+data[k], function(data, e) {
      		})
      		lv_data.push({"text":data[k],"source":"source://image/wenjiantubiao.png","type":"文本"})
				}
      	else if(a[1]=="jpg")
			    {
      		do_InitData.copyFile("initdata://"+page.getData()+"/"+data[k], "data://"+page.getData()+"/"+data[k], function(data, e) {
      		})
				  lv_data.push({"text":data[k],"source":"initdata://"+page.getData()+"/"+data[k],"type":"图片"})
			    }
	        else if(a[1]=="png")
			    {
	        	do_InitData.copyFile("initdata://"+page.getData()+"/"+data[k], "data://"+page.getData()+"/"+data[k], function(data, e) {
      		})
				  lv_data.push({"text":data[k],"source":"initdata://"+page.getData()+"/"+data[k],"type":"图片"})
			    }
			else
				{
				do_InitData.copyFile("initdata://"+page.getData()+"/"+data[k], "data://"+page.getData()+"/"+data[k], function(data, e) {
      		})
				  lv_data.push({"text":data[k],"source":"source://image/weizhi.png","type":"未知"})
				}
				
			 });
		
			do_ListData.removeAll();
			do_ListData.addData(lv_data);
			do_ListView_2.refreshItems;
		}
	});
//})	
	
do_ListView_2.on("touch",function(index){
	var getall = do_ListData.getRange(0);
	//do_Notification.alert(getall.length);
	if(getall.length>0){
		var getone = do_ListData.getOne(index);//通过index拿出一条数据包括k.v
		//do_Notification.alert(getone);弹出来是一整条数据
		if(getone.type == "文本"){//可以直接打开了
			do_External.openFile("data://"+page.getData()+"/"+getone.text)
		}
		if(getone.type == "图片"){//可以直接打开了
			do_External.openFile("data://"+page.getData()+"/"+getone.text)
		}
		if(getone.type== "目录"){//传目录路径到下一个界面
			do_App.openPage("source://view/index2.ui",page.getData()+"/"+getone.text,function(){
			});
		}
		if(getone.type == "未知"){
			do_Notification.toast("未知文件");
		}
	}
  })		
})
var do_Button_back = ui("do_Button_back")
do_Button_back.on("touch",function(){
	do_App.closePage();
	
})
   

do_ListView_2.on("longTouch",function(index){
	var get = do_ListData.getOne(index)
	page.fire("show",{k1:"data://"+get.text,k2:get.text,k3:get.type,k4:get});
	
   });
page.on("close",function(data){
	do_Notification.alert(data);
 lv_data.push({"text":data.kk2,"source":data.kk4,"type":data.kk3})
 
    do_ListData.removeAll();
	do_ListData.addData(lv_data);
	do_ListView_2.refreshItems;


});



