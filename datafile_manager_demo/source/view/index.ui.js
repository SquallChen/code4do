/**
 * @Author : logo_qy@163.com
 * @Timestamp : 2016-08-16
 */
var page = sm("do_Page")
var rootView =ui("$");
var do_App = sm("do_App");
var do_Global = sm("do_Global")
var do_External = sm("do_External");
var do_Storage = sm("do_Storage");
var do_InitData = sm("do_InitData");
var do_Notification = sm("do_Notification");
var do_ListView_1 = ui("do_ListView_1");
var  do_ListData  = mm("do_ListData");
do_ListView_1.bindItems(do_ListData);
var do_SegmentView_1 = ui("do_SegmentView_1")
var  do_ListData2= mm("do_ListData");
do_SegmentView_1.bindItems(do_ListData2);
var GridView_1_data=[];
var lv_data=[];
var num = "";
var up = [];
page.on("back",function(){
		if (ssss == "data://big"){
			return do_App.closePage();
		}
		last_ssss = "data:";
		ssss.split("/").map(function(v, k){
			if(k!=0&&k!=(ssss.split("/").length-1) )  last_ssss += "/" + v;
		})
		ssss = last_ssss;
		hanshu(ssss);
})

	rootView.add("tanchu","source://view/tanchu.ui", 0,130);
	rootView.add("yindao","source://view/yindao.ui", 0,0);
	do_Storage.unzip("data://big.zip","data://", function(data){
			hanshu(page.getData())//放在回调函数里面，避免异步差
	 }) //解压到data目录下有big.zip和 big文件夹
var  ssss = "data://big";	
do_ListView_1.on("touch",function(index){
		var getall = do_ListData.getRange(0);
		if(getall.length>0){
				var getone = do_ListData.getOne(index);
				if(getone.type =="目录"){
						ssss += "/"+getone.text;//目录的真实地址
						hanshu(ssss);
		        } else {
		        		do_External.openFile(ssss+"/"+getone.text)//文件真实地址
				}
		}
}) 

function  hanshu (lujing){  
var a =ssss.split("/");//文件完整路径
    GridView_1_data=[ ];
	a.map(function(v, k){
		if(v!="data:"&&v!=""){
			GridView_1_data.push({"text":v});
		}
	})
	GridView_1_data.map(function(v,k){
		v.index=k;		
	})
	do_ListData2.removeAll();
    do_ListData2.addData(GridView_1_data);
    do_SegmentView_1.refreshItems();
     lv_data = [];
     do_Storage.getDirs(lujing, function(data1){
		if(data1.length>0){
				data1.forEach(function(v,k){
					if(v.indexOf("/")>-1)  v=v.substring(1,v.length);
					lv_data.push({"text":v,"source":"source://image/mulutubiao.png","type":"目录"} )
				})
		}
	do_Storage.getFiles(lujing, function(data2) {
			data2.forEach(function(v,k){
				if(v.indexOf("/")>-1)  v=v.substring(1,v.length);
					var a = v.split(".");
					if(a[1]=="zip"){
						lv_data.push({"text":v,"source":"source://image/zip.png","type":"压缩文件"})
					}else if(a[1]=="txt"){
						lv_data.push({"text":v,"source":"source://image/wenjiantubiao.png","type":"文本"})
					}else if(a[1]=="png"){
						lv_data.push({"text":v,"source":ssss+"/"+v,"type":"图片"})
					}else if(a[1]=="jpg"){
						lv_data.push({"text":v,"source":ssss+"/"+v,"type":"图片"})
					   }
			 })
	    do_ListData.removeAll();
		do_ListData.addData(lv_data);
		do_ListView_1.refreshItems();
				 })//获取文件列表
		 });//截取目录列表
 }//获取文件，目录函数

page.on("touch_mulu",function(index){
	var mmm="data:/"
	var all = do_ListData2.getRange(0);
	if(all.length>0){
		var get1 =do_ListData2.getOne(index)
		for(i=0;i<=index;i++){
			mmm+="/"+all[i].text
		}
        ssss = mmm;
		hanshu(mmm)
	  }
   })
do_ListView_1.on("longTouch",function(index){
	var get2 = do_ListData.getOne(index)
	page.fire("show",{"k1":ssss+"/"+get2.text,"k2":get2.text,"k3":get2.type,"k4":get2,"k5":index});
});//全路径，名字，类型，整条数据，该条索引。

var newname="";
page.on("close",function(data){
	if(data.k3=="目录"){
		newname = data.k2+"_copy";
		do_Storage.copy([data.k1], ssss+"/"+newname, function(data, e) {})
	} else {
		var a = data.k2.split(".");
		newname = a[0]+"_copy."+a[1];
		do_Storage.copyFile(data.k1, ssss+"/"+newname, function(data, e) {})
	}
	lv_data.push({"text":newname,"source":data.k4,"type":data.k3})
    do_ListData.removeAll();
	do_ListData.addData(lv_data);
	do_ListView_1.refreshItems();
})  

page.on("delete",function(data){
	if(data.k3=="目录"){
		do_Storage.deleteDir(data.k1, function(data, e) {});
	}else {
		do_Storage.deleteFile(data.k1, function(data, e){})
	}
	lv_data.splice(data.k5,1)
	do_ListData.removeAll();
	do_ListData.addData(lv_data);
	do_ListView_1.refreshItems();
})

page.on("cut",function(data){
    if(data.k3=="目录"){
    	do_Storage.copy([data.k1],"data://cut/", function(data, e) {})
    }else{
    	do_Storage.copy([data.k1],"data://cut/", function(data, e) {})
    }
	lv_data.splice(data.k5,1)
	do_ListData.removeAll();
	do_ListData.addData(lv_data);
	do_ListView_1.refreshItems();
})
page.on("paste",function(data){
	lv_data.push({"text":data.k2,"source":data.k4.source,"type":data.k3});
	do_ListData.removeAll();
	do_ListData.addData(lv_data);
	do_ListView_1.refreshItems();
	do_Storage.deleteDir("data://cut/", function(data, e) {
		//删除剪切时创建的目录，只要用户点击了paste按钮，剪切目录就没了
	})
})







