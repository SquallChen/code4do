/*******************************************************************************
 * Author :
 * 
 * @Author Timestamp :
 * @Timestamp
 ******************************************************************************/
var page = sm("do_Page");
var close = ui("close");
var app = sm("do_App");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})

var btn1 = ui("do_Button_1");
var btn2 = ui("do_Button_2");
var btn3 = ui("do_Button_3");
var btn4 = ui("do_Button_4");
var btn5 = ui("do_Button_5");

function test1() {
	// 创建一个HashData对象
	var data = mm("do_HashData");
	// 给Button创建一个属性到数据的映射,其中text和bgColor是Button的2个属性
	btn1.setMapping({
		"text" : "text_key",
		"bgColor" : "color_key"
	});
	// 建立Button和HashData的绑定
	btn1.bindData(data);
	// 数据变化驱动UI属性变化
	// 1. 修改数据
	data.addData({
		"text_key" : "映射到HashData",
		"color_key" : "FF0022AA"
	});
	// 2. 刷新UI,这个按钮的文本变成“映射到HashData”，背景颜色变为“FF0022AA"
	btn1.refreshData();
}
test1();

function test2() {
	// 创建一个HashData对象
	var data = mm("do_HashData");
	// 建立Button和HashData的绑定,同时设置映射关系
	btn2.bindData(data, {
		"text" : "text_key",
		"bgColor" : "color_key"
	});
	// 数据变化驱动UI属性变化
	// 1. 修改数据
	data.addData({
		"text_key" : "映射到HashData-直接设置映射",
		"color_key" : "FFCC00AA"
	});
	// 2. 刷新UI,这个按钮的文本变成“映射到HashData-直接设置映射”，背景颜色变为“FFCC00AA"
	btn2.refreshData();
}
test2();

function test3() {
	// 创建一个HashData对象
	var data = mm("do_HashData");
	// 给Button创建一个属性到数据的映射,其中text和bgColor是Button的2个属性
	// HashData对象支持path，中间用.号来隔开
	btn3.setMapping({
		"text" : "node1.text_key",
		"bgColor" : "node1.color_key"
	});
	// 建立Button和HashData的绑定
	btn3.bindData(data);
	// 数据变化驱动UI属性变化
	// 1. 修改数据
	data.addData({
		"node1" : {
			"text_key" : "映射到HashData-支持path",
			"color_key" : "F00FEEAA"
		},
		"node2" : "xxxx"
	});
	// 2. 刷新UI,这个按钮的文本变成“映射到HashData-支持path”，背景颜色变为“F00FEEAA"
	btn3.refreshData();
}
test3();

function test4() {
	// 创建一个HashData对象
	var data = mm("do_HashData");
	// 给Button创建一个属性到数据的映射,其中text和bgColor是Button的2个属性
	// HashData对象支持json array,中间用:加数字索引来表明是一个array的一个元素
	btn4.setMapping({
		"text" : "node1:2.text_key",
		"bgColor" : "node1:2.color_key"
	});
	// 建立Button和HashData的绑定
	btn4.bindData(data);
	// 数据变化驱动UI属性变化
	// 1. 修改数据
	data.addData({
		"node1" : [ {
			"text_key" : "我是Button1",
			"color_key" : "FFFFEEAA"
		}, {
			"text_key" : "我是Button2",
			"color_key" : "FFFFEEBB"
		}, {
			"text_key" : "映射到HashData-支持JSONArray",
			"color_key" : "00FFEECC"
		} ],
		"node2" : "xxxx"
	});
	// 2. 刷新UI,这个按钮的文本变成“映射到HashData-支持JSONArray”，背景颜色变为“00FFEECC"
	btn4.refreshData();
}
test4();

function test5() {
	// 创建一个ListData对象
	var data = mm("do_ListData");
	// 给Button创建一个属性到数据的映射,其中text和bgColor是Button的2个属性
	// do_ListData对象支持:加数字索引来表明是一个array的一个元素
	btn5.setMapping({
		"text" : ":2.text_key",
		"bgColor" : ":2.color_key"
	});
	// 建立Button和HashData的绑定
	btn5.bindData(data);
	// 数据变化驱动UI属性变化
	// 1. 修改数据
	data.addData([ {
		"text_key" : "我是Button1",
		"color_key" : "FFFFEEAA"
	}, {
		"text_key" : "我是Button2",
		"color_key" : "FFFFEEBB"
	}, {
		"text_key" : "映射到ListData",
		"color_key" : "0FF11ECC"
	} ]);
	// 2. 刷新UI,这个按钮的文本变成“映射到HashData-支持JSONArray”，背景颜色变为“00F11ECC"
	btn5.refreshData();
}
test5();

function test6() {
	// 根据统配符$来获取ui文件的根节点，也可以根据它的ID获取对象
	var rootview = ui("$");
	// 创建一个HashData对象
	var data = mm("do_HashData");
	// 给rootview创建多个子UI的属性到数据的映射,其中button_id1.text和label_id1.text
	// 分别表示这个ui文件里一个id为button_id1的Button组件和id为label_id1的Label组件
	rootview.setMapping({
		"do_Button_6.text" : "node1.text_key",
		"do_Button_7.text" : "node2",
		"do_Button_6.bgColor" : "node1.color_key",
		"do_Button_7.bgColor" : "node3"
	});
	// 建立Button和HashData的绑定
	rootview.bindData(data);
	// 数据变化驱动UI属性变化
	// 1. 修改数据
	data.addData({
		"node1" : {
			"text_key" : "多个子UI绑定1",
			"color_key" : "1FFFE1BB"
		},
		"node2" : "多个子UI绑定2",
		"node3" : "1111FFBB"
	});
	// 2. 刷新UI,二个按钮的文本变成“多个子UI绑定1，2”，背景颜色变为“1F1F1EBB，11111EBB"
	rootview.refreshData();
}
test6();