/**
 * @Author : logo_qy@163.com
 * @Timestamp : 2016-08-29
 */
var nf = sm("do_Notification");
var page =sm("do_Page");
var slide =ui("do_SlideView_1");
var do_ImageView_1 =ui("do_SlideView_1");
var listdata = mm("do_ListData");
var do_ImageView_1 = ui("do_ImageView_1")
var rootview = ui("$")

var slideView = ui("do_SlideView_1");
var listData = mm("do_ListData")
listData.addData([ {template : 0}, {template : 1} , {template : 2} ,{template : 3} ,{template : 4} ]);
slideView.bindItems(listData);
slideView.refreshItems();

rootview.add("add", "source://view/add.ui", 75, 250)
slideView.on("indexChanged", function(data, e) {
	var index = data;//当前显示视图的索引值
    //nf.toast("index:" + index);

	switch (index) {
	case 0:
		tab1();
		break;
	case 1:
		tab2();
		break;
	case 2:
		tab3();
		break;
	case 3:
		tab4();
		break;
	case 4:
		tab5();
		break;
	default:
		break;
	}

})

do_ImageView_1.source = "source://image/1.png";

function tab1(){

	do_ImageView_1.source = "source://image/1.png";

}

function tab2(){

	do_ImageView_1.source = "source://image/2.png";

}

function tab3(){

	do_ImageView_1.source = "source://image/3.png";

}
function tab4(){

	do_ImageView_1.source = "source://image/4.png";

}
function tab5(){

	do_ImageView_1.source = "source://image/5.png";

}
