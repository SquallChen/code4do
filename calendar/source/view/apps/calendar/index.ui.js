var app, page, nf;
nf = sm("do_Notification");
app = sm("do_App");
page = sm("do_Page");
global = sm("do_Global");

var helper   = require("helper");
var http     = require("http");
var calendar = require("calendar");

helper.topBar('日程日历');

calendar.init();

// 设置json数据
// 演示数据生成

var data =[{
   title: "合并各方各",
   allday: false, 
   calendar: {
     color: "#ee8800", 
     name: "测试日程1_"
   }, 
   start: "01:30",
   end: "05:00",
   _start: "2016-3-24",
   _end: "2016-3-25"
 },
 {
	   title: "合并各方各111",
	   allday: true, 
	   calendar: {
	     color: "#ee8800", 
	     name: "测试日程1_"
	   }, 
	   start: "01:30",
	   end: "05:00",
	   _start: "2016-3-5",
	   _end: "2016-3-8"
	 }, 
 {
   title: "法第三方杀毒方式",
   allday: true, 
   calendar: {
     color: "#ee8800",
     name: "测试日程1_"
   }, 
   start: "00:00", 
   end: "00:00", 
   _start: "2016-3-21", 
   _end: "2016-3-21"
 }, 
 {
   title: "112233",
   allday: true,
   calendar: {
     color: "#ee8800", 
     name: "测试日程1_"
   }, 
   start: "00:00",
   end: "00:00",
   _start: "2016-3-22",
   _end: "2016-3-23"
 }, 
 {
   title: "gdfg", 
   allday: false, 
   calendar: {
     color: "#ee8800", 
     name: "测试日程1_"
   }, 
   start: "01:00", 
   end: "05:00", 
   _start: "2016-3-23", 
   _end: "2016-3-23"
 }, 
 {
   title: "更好的",
   allday: true,
   calendar: {
     color: "#994499",
     name: "abc123"
   }, 
   start: "00:00", 
   end: "00:00", 
   _start: "2016-3-24",
   _end: "2016-3-26"
 }, 
 {
   title: "发生大幅上的", 
   allday: false, 
   calendar: {
     color: "#994499", 
     name: "abc123"
   }, 
   start: "11:30", 
   end: "16:00", 
   _start: "2016-3-20",
   _end: "2016-3-20"
 }
];

calendar.getItems = function() {
	var params = calendar.getParams();
	calendar.setItems(data);
}
calendar.getItems();

/*
// 从服务器获取数据
var loading = http.loading();
calendar.getItems = function() {

	var params = calendar.getParams();
	http.get('calendarEvent', params, function(data) {
		calendar.setItems(data);
	}, null, loading);
}
calendar.getItems();
*/

