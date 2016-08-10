/**
 * @Author : zxhuizhi@126.com
 * @Timestamp : 2016-08-04
 */
var page = sm("do_Page")
var rootView =ui("$");
var do_App = sm("do_App");
var do_Global = sm("do_Global")
var do_External = sm("do_External");
var do_Storage = sm("do_Storage");
var do_InitData = sm("do_InitData");
var do_Notification = sm("do_Notification");
var do_ListView_1 = ui("do_ListView_1");//定义listview控件
var  do_ListData  = mm("do_ListData");//定义小型数据库do_ListData
do_ListView_1.bindItems(do_ListData);//bindItems确保listview链接do_ListData
var lv_data=[];
var num = "";
rootView.add("tanchu","source://view/tanchu.ui", 0,80)
do_Storage.unzip("data://big/big.zip","data://big", function(data){
 do_Storage.getDirs("data://big/", function(data1){
	if(data1.length>0){
		data1.forEach(function(v,k){
			lv_data.push({"text":data1[k],"source":"source://image/mulutubiao.png","type":"目录"} )
		})//data1.forEach

}//if
	else{"没有目录咯"}
 do_Storage.getFiles("data://big/", function(data2, e) {
		data2.forEach(function(v,k){
			var a = data2[k].split(".");
			if(a[1]=="zip"){
			lv_data.push({"text":data2[k],"source":"source://image/zip.png","type":"压缩文件"})
			}//zip
			else if(a[1]=="txt"){
			lv_data.push({"text":data2[k],"source":"source://image/wenjiantubiao.png","type":"文本"})
			}//txt
			else if(a[1]=="png"){
			lv_data.push({"text":data2[k],"source":"data://big/"+data2[k],"type":"图片"})
			}//png
			else if(a[1]=="jpg"){
			lv_data.push({"text":data2[k],"source":"data://big/"+data2[k],"type":"图片"})
			}//jpg
		})//forEach
		  do_ListData.removeAll();
		  do_ListData.addData(lv_data);
		  do_ListView_1.refreshItems();//对控件ListView操作都是Item,refreshitems最好后面加括号（）；
})//获取文件列表的括弧	             
do_ListView_1.on("touch",function(index){
	var getall = do_ListData.getRange(0);//包含data文件夹下的所有目录，或者文件
	 if(getall.length>0){
	   var getone = do_ListData.getOne(index);//通过index拿出一条数据包括k.v
	       if(getone.type =="文本"){//可以直接打开了
				do_External.openFile("data://big/"+getone.text)
			}
			else if(getone.type =="图片"){//可以直接打开了
				do_External.openFile("data://big/"+getone.text)
			}
			else if(getone.type =="压缩文件"){//传目录路径到下一个界面
				do_Notification.toast("这是压缩文件，暂时打不开哦")
			}
			else if(getone.type =="目录"){//传目录路径到下一个界面
				do_App.openPage("source://view/index2.ui",getone.text,function(){
				});//getone.text+"/"实际是tupian/,wenjian/
			}
			else if(getone.type =="未知"){
				do_Notification.toast("未知文件");
			}
	    }//if
      })//touch	        
		                         
 })//获取所有目录的括号，倒数第二个
}) //最后的大括号，保障，所有操作都在他的范围内,为了能拿到所有解压后的文件，都在data里面哈哈，倒数第一个
do_ListView_1.on("longTouch",function(index){
	var get = do_ListData.getOne(index)
	page.fire("show",{k1:"data://big/"+get.text,k2:get.text,k3:get.type,k4:get,k5:index});
	
});
page.on("close",function(data){
 lv_data.push({"text":data.kk2,"source":data.kk4,"type":data.kk3})//实质读取的时候还是读取的源文件
    do_ListData.removeAll();
	do_ListData.addData(lv_data);
	do_ListView_1.refreshItems();
})  
page.on("delete",function(data){
	lv_data.splice(data.dk5,1)
	do_ListData.removeAll();
	do_ListData.addData(lv_data);
	do_ListView_1.refreshItems();
    do_Storage.deleteFile(data.dk1, function(data, e) {
	})//删除目录文件了
})
page.on("cut",function(data){
	//do_Notification.alert(data.cdk3);
    if(data.cdk3=="目录"){
	do_Storage.copy([data.cdk1],"data://cut/"+data.cdk2, function(data, e) {
		})//do_Storage.copy
     }//if
	    else{
	    do_Storage.copy([data.cdk1],"data://cut/", function(data, e) {
			})//do_Storage.copy
	      }//else
	lv_data.splice(data.cdk5,1)
	do_ListData.removeAll();
	do_ListData.addData(lv_data);
	do_ListView_1.refreshItems();
})//cut
page.on("paste",function(data){
	lv_data.push({"text":data.pk2,"source":data.pk4.source,"type":data.pk3});
	do_ListData.removeAll();
	do_ListData.addData(lv_data);
	do_ListView_1.refreshItems();
	do_Storage.deleteDir("data://cut/", function(data, e) {
		//删除剪切时创建的目录，只要用户点击了paste按钮，剪切目录就没了
	})
})//paste






