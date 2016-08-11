var do_Label_biaoti = ui("do_Label_biaoti");
var  do_External  = sm("do_External");
var do_App = sm("do_App");
var page = sm("do_Page");
var do_Notification = sm("do_Notification");
var do_InitData = sm("do_InitData");
var rootView = ui("$");
var do_ListView_2 = ui("do_ListView_2")
var do_ListData  = mm("do_ListData");
do_ListView_2.bindItems(do_ListData);
var do_Global = sm("do_Global");
var do_Storage =sm("do_Storage");
var all = page.getData();//从上一个目录传过来的所有目录,目录是一个一个过来的先是tupian
do_Label_biaoti.text = "data://big/"+all+"/";
rootView.add("tanchu","source://view/tanchu.ui", 0,120)

var do_Button_back = ui("do_Button_back")
do_Button_back.on("touch",function(){
	do_App.closePage();
})
page.on("back",function(){
	do_App.closePage();
})

var lv_data=[];
do_Storage.getDirs("data://big/"+all+"/",function(data1){
	if(data1.length>0){//获取所有下一级目录，并添加到数组里面
		data1.forEach(function(v,k){    //data1[k]为mulu文件夹，
			lv_data.push({"text":data1[k],"source":"source://image/mulutubiao.png","type":"目录"})
		});
	}
	//获取所有文件列表
	do_Storage.getFiles("data://big/"+all+"/",function(data){
		if(data.length>0){//获取所有文件，也添加到数组里面
			data.forEach(function(v,k){
				var a = data[k].split(".");
		      	if(a[1]=="txt"){
		      		lv_data.push({"text":data[k],"source":"source://image/wenjiantubiao.png","type":"文本"})
				}else if(a[1]=="jpg"){
					lv_data.push({"text":data[k],"source":"data://big/"+page.getData()+"/"+data[k],"type":"图片"})
				}else if(a[1]=="png"){
					lv_data.push({"text":data[k],"source":"data://big/"+page.getData()+"/"+data[k],"type":"图片"})
				}else{
					lv_data.push({"text":data[k],"source":"source://image/weizhi.png","type":"未知"})
				}
		    });
			do_ListData.removeAll();
			do_ListData.addData(lv_data);
			do_ListView_2.refreshItems;
		}
	});//获取文件夹下的所有文件
})

do_ListView_2.on("touch",function(index){
	var getall = do_ListData.getRange(0);
	if(getall.length>0){
		var getone = do_ListData.getOne(index);//通过index拿出一条数据包括k.v
		if(getone.type== "目录"){//传目录路径到下一个界面
			do_App.openPage({
				source:"source://view/index2.ui",
				data:page.getData()+"/"+getone.text,
				statusBarState:"transparent"
			})
		} else {
			do_External.openFile("data://big/"+page.getData()+"/"+getone.text)
		}
	}
})

do_ListView_2.on("longTouch",function(index){
	var get = do_ListData.getOne(index)
	page.fire("show",{k1:"data://big/"+page.getData()+"/"+get.text,k2:get.text,k3:get.type,k4:get,k5:index});
});
var newname="";
page.on("close",function(data){
	if(data.kk3=="目录"){
		newname = data.kk2+"_copy";
		do_Storage.copy([data.kk1], "data://big/"+page.getData()+"/"+newname, function(data, e) {})
	} else {
		var a = data.kk2.split(".");
		newname = a[0]+"_copy."+a[1];
		do_Storage.copyFile(data.kk1, "data://big/"+page.getData()+"/"+newname, function(data, e) {})
	}
	lv_data.push({"text":newname,"source":data.kk4,"type":data.kk3})
    do_ListData.removeAll();
	do_ListData.addData(lv_data);
	do_ListView_2.refreshItems();
});
page.on("delete",function(data){
	lv_data.splice(data.dk5,1);
	do_ListData.removeAll();
	do_ListData.addData(lv_data);
	do_ListView_2.refreshItems();
})
page.on("cut",function(data){
    if(data.cdk3=="目录"){
    	do_Storage.copy([data.cdk1],"data://cut/"+data.cdk2, function(data, e) {})
    } else{
	    do_Storage.copy([data.cdk1],"data://cut/", function(data, e) {})
	}
	lv_data.splice(data.cdk5,1)
	do_ListData.removeAll();
	do_ListData.addData(lv_data);
	do_ListView_2.refreshItems();
})

page.on("paste",function(data){
	lv_data.push({"text":data.pk2,"source":data.pk4.source,"type":data.pk3});
	do_ListData.removeAll();
	do_ListData.addData(lv_data);
	do_ListView_2.refreshItems();
	do_Storage.deleteDir("data://cut/", function(data, e) {
		//删除剪切时创建的目录，只要用户点击了paste按钮，剪切目录就没了
	})
})


