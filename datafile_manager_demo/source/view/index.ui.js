/**
 * @Author : zxhuizhi@126.com
 * @Timestamp : 2016-07-19
 */
var rootView = ui("$");
var page = sm("do_Page");
var do_Notification = sm("do_Notification");
var do_Storage = sm("do_Storage");
var  e = do_Storage.dirExist("data://");
var do_InitData = sm("do_InitData");
var  do_External  = sm("do_External");
var do_App  = sm("do_App");
var do_ListView_1 = ui("do_ListView_1");
var  do_ListData  = mm("do_ListData");
do_ListView_1.bindItems(do_ListData);
var do_Global = sm("do_Global");
var lv_data = [];
	    //获取当前大目录下的所有小目录列表(tupian,wenjian)
rootView.add("tanchu","source://view/tanchu.ui", 0, 80)
//var tanchu = ui("tanchu");
do_InitData.getDirs("initdata://",function(data){
	if(data.length>0){//获取所有目录，并添加到数组里面
		data.forEach(function(v,k){ 
		
			lv_data.push({"text":data[k],"source":"source://image/mulutubiao.png","type":"目录"})	
          
		});
}//获取所有目录，并添加到数组里面
			else
			{
			do_Notification.toast("没有目录了"); 
			}
		
		//获取所有文件列表,当前大目录下的小文件，除了目录就是小文件(2.txt home.jpg)
		do_InitData.getFiles("initdata://",function(data){
			//获取所有文件，也添加到数组里面
			data.forEach(function(v,k){
				var a = data[k].split(".");
				//do_Notification.alert(a);//["1","txt"]
	        	if(a[1]=="txt")
					{
	        		do_InitData.copyFile("initdata://"+data[k], "data://"+data[k], function(data, e) {
	        		})
	        		lv_data.push({"text":data[k],"source":"source://image/wenjiantubiao.png","type":"文本"})
					}
	        	else if(a[1]=="jpg")
				    {
	        		do_InitData.copyFile("initdata://"+data[k], "data://"+data[k], function(data, e) {
	        		})
					  lv_data.push({"text":data[k],"source":"initdata://"+data[k],"type":"图片"})
				    }
		        else if(a[1]=="png")
				    {
		        	do_InitData.copyFile("initdata://"+data[k], "data://"+data[k], function(data, e) {
	        		})
					  lv_data.push({"text":data[k],"source":"initdata://"+data[k],"type":"图片"})
				    }
				else
					{
					do_InitData.copyFile("initdata://"+data[k], "data://"+data[k], function(data, e) {
	        		})
					  lv_data.push({"text":data[k],"source":"source://image/weizhi.png","type":"未知"})
					}
					
				 });
				do_ListData.removeAll();
				do_ListData.addData(lv_data);
				do_ListView_1.refreshItems;
   });
do_ListView_1.on("touch",function(index){
	var getall = do_ListData.getRange(0);
	 if(getall.length>0){
	   var getone = do_ListData.getOne(index);//通过index拿出一条数据包括k.v
			//do_Notification.alert(getone);//弹出来是2.txt不太准确嘻嘻，我也不知道为什么
			if(getone.type =="文本"){//可以直接打开了
				do_External.openFile("data://"+getone.text)
			}
			if(getone.type =="图片"){//可以直接打开了
				do_External.openFile("data://"+getone.text)
			}
			if(getone.type =="目录"){//传目录路径到下一个界面
				do_App.openPage("source://view/index2.ui",getone.text,function(){
				});//getone.text+"/"实际是tupian/,wenjian/
			}
			if(getone.type =="未知"){
				do_Notification.toast("未知文件");
			}
	     }
     })		
});

do_ListView_1.on("longTouch",function(index){
	var get = do_ListData.getOne(index)
	page.fire("show",{k1:"data://"+get.text,k2:get.text,k3:get.type,k4:get});
	
});


page.on("close",function(data){
	do_Notification.alert(data);
 lv_data.push({"text":data.kk2,"source":data.kk4,"type":data.kk3})
 
    do_ListData.removeAll();
	do_ListData.addData(lv_data);
	do_ListView_1.refreshItems;
	 
	 
	 
	 
	 
})  
    

    