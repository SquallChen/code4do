/**
 * @Author : raul
 * @Timestamp : 2016-08-22
 */
var nf = sm("do_Notification");
var ALayout_root=ui("ALayout_root");
var do_ListView_1 = ui("do_ListView_1");
var do_ListView_2 = ui("do_ListView_2");
var do_ALayout_content = ui("do_ALayout_content");
var do_ListData_1= mm("do_ListData");
var do_ListData_2= mm("do_ListData");

//添加固定列的列头
ALayout_root.add("header1Template", "source://view/header1Template.ui", 0, 88);
do_ALayout_content.add("header2Template", "source://view/header2Template.ui", 0, 0);

//设定显示模板
do_ListView_1.templates="source://view/row1Template.ui";
do_ListView_2.templates="source://view/row2Template.ui";
//初始化2000条数据
var json_data = [];
for(var i=0;i< 2000;i++){
	json_data.push(
			{
				number:i,
				name:"name:" + i,
				column1:"column1:" + i,
				column2:"column2:" + i,
				column3:"column3:" + i,
				column4:"column4:" + i,
				column5:"column5:" + i,
				column6:"column6:" + i,
				template:0
			}
			);
}
do_ListData_1.addData(json_data);
do_ListView_1.bindItems(do_ListData_1);
do_ListData_2.addData(json_data);
do_ListView_2.bindItems(do_ListData_2);

var currentRow1=0
var currentRow2=0
do_ListView_2.on("scroll", function(data){
	if (data==null) return;
	if (currentRow2==data.firstVisiblePosition) return;
	currentRow2=data.firstVisiblePosition;	
	do_ListView_1.scrollToPosition(data.firstVisiblePosition, true);
});
do_ListView_1.on("scroll", function(data){
	if (data==null) return;
	if (currentRow1==data.firstVisiblePosition) return;
	currentRow1=data.firstVisiblePosition;
	do_ListView_2.scrollToPosition(data.firstVisiblePosition, true);
});