var deviceone = require("deviceone");
nf = deviceone.sm("do_Notification");

var animate = require("animate");
var lunar   = require("lunar");
var grid    = require("grid");

var calendar = {
	items: []
};

var calendarHead  = grid('calendar_head');
var calendarBody  = grid('calendar_body');
var calendarEvent = grid('calendar_event');

calendarHead.loadData([
	{title: "日"},
	{title: "一"},
	{title: "二"},
	{title: "三"},
	{title: "四"},
	{title: "五"},
	{title: "六"}
]);

var date = new Date();
var year = date.getFullYear();
var month = date.getMonth()+1;
var day = date.getDate();
var monthDays = 0;
var cellIndex = -1;

// 设置数据
calendar.setItems = function(items) {
	
	calendar.items = items;
	
	var table = calendarBody.store.getAll();
	
	for(var i = 0; i < items.length; i++) {
		
		var item = items[i];
		
		for(var j = 0; j < table.length; j++) {
			
			var now = year + '-' + month + '-' + table[j].text;
			if(item._start == now || item._end == now) {
				table[j].badge = true;
			}
		}
	}
	calendarBody.loadData(table);
	getDayItems();
}

// 获取请求时的参数
calendar.getParams = function() {
	var params = {
		start: year + '-' + month + '-1',
		end: year + '-' + month + '-' + monthDays
	}
	return params;
}

// 点击某天显示数据列表
function getDayItems() {
	
	var data = [];
	var now = year + '-' + month + '-' + day;
	
	for(var i = 0; i < calendar.items.length; i++) {
		var item = calendar.items[i];
		if(item._start == now || item._end == now) {
			item.day = !item.allday;
			data.push(item);
		}
	}
	calendarEvent.loadData(data);
}

// 显示日历
calendar.init = function() {
	
	minMonth = month - 1;
	
	var dt = new Date();
	var y = dt.getFullYear();
	var m = dt.getMonth();
	var d = dt.getDate();
	
	dt.setYear(year);
	dt.setMonth(minMonth);
	dt.setDate(1);
	
	var week = dt.getDay();
	
	monthDays = lunar.solarDays(year, minMonth);
	var length = monthDays + week;
	
	cellIndex = week;
	
	var table = [];
	
	// 初始化天数据
	for(var i = 0; i < length; i++) {
		table.push({today: false, check: false, lunar:'', text:'', color:'333333ff', badge: false});
	}
	
	for(var i = week; i < length; i++) {
		
		var td = table[i];
		var j = i - week + 1;
		td.text = j;
		
		// 农历
		var lunarInfo = lunar.getDateInfo(new Date(year, minMonth, j));
		if(lunarInfo.festival) {
			td.lunar = lunarInfo.festival;
		} else {
			td.lunar = lunarInfo.lDayDesc;
		}
		
		// 今天
		if(y == year && m == minMonth && d == j) {
			td.today = true;
			cellIndex = i;
			day = i;
		}
		
		if(j >= monthDays) {
			break;
		}
	}
	
	table[cellIndex].check = true;
	table[cellIndex].color = 'ffffffff';
	
	calendarBody.loadData(table);
	
	setTitle();
}

// 设置日历头
function setTitle() {
	deviceone.ui('calendar_title').text = year + ' - ' + month + ' - ' + day;
}

// 切换月设置日历头
function setMonthTitle() {
	
    date.setDate(1);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    
    setTitle();
}

// 点击日历某天事件
calendarBody.on("touch", function(index) {
	
	var store = calendarBody.store;
	var row   = store.getAt(index);
	
	if(row.text) {
		
		var old = store.getAt(cellIndex);
		old.check = false;
		old.color = '666666ff';
		store.update(cellIndex, old);
		
		row.check = true;
		row.color = 'ffffffff';
		store.update(index, row);
		
		calendarBody.refreshItems();
		
		day = row.text;
		
		setTitle();
		
		getDayItems();
		
		cellIndex = index;
	}
});

// 切换月按钮
deviceone.ui('calendar_month_last').on("touch", function() {
	
	date.setMonth(date.getMonth() - 1);
	
	setMonthTitle();
	calendar.init();
	calendar.getItems();
	
}).on('touchDown', function() {
	this.animate(animate.button());
});

// 切换月按钮
deviceone.ui('calendar_month_next').on("touch", function() {
	
	date.setMonth(date.getMonth() + 1);
	
	setMonthTitle();
	calendar.init();
	calendar.getItems();
	
}).on('touchDown', function() {
	this.animate(animate.button());
});

module.exports = calendar;