var lunarInfo= new Array(
0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0);
var solarMonth = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
var Gan = new Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸");
var Zhi = new Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥");
var Animals = new Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪");
var solarTerm = new Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至");
var sTermInfo = new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758);
var nStr1 = new Array('日','一','二','三','四','五','六','七','八','九','十');
var nStr2 = new Array('初','十','廿','卅','　');
var monthName = new Array("JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC");
var monthStr = new Array("一","二","三","四","五","六","七","八","九","十","十一","十二");

//国历节日
var sFtv = [
	["0101", "元旦", false],
	["0214", "情人节", false],
	["0308", "妇女节", true],
	["0312", "植树节", true],
	["0315", "消费者权益日", true],
	["0401", "愚人节", false],
	["0501", "劳动节", true],
	["0504", "青年节", true],
	["0601", "儿童节", true],
	["0701", "建党节", true],
	["0801", "建军节", true],
	["0910", "教师节", true],
	["1001", "国庆节", true],
	["1111", "光棍节", false],
	["1224", "平安夜", false],
	["1225", "圣诞节", false]
];

// 农历节日 *表示放假日
var lFtv = [
	["0101", "春节", true],
	["0115", "元宵节", true],
	["0505", "端午节", true],
	["0707", "七夕情人节", true],
	["0815", "中秋节", true],
	["0909", "重阳节", true],
	["1208", "腊八节", true],
	["1224", "小年", true],
	["0100", "除夕", true]
];

//某月的第几个星期几
var wFtv = [
	["0520", "母亲节", false],
	["0530", "父亲节", false],
	["1144", "感恩节", false]
];
//====================================== 传回农历 y年的总天数
function lYearDays(y) {
   var i, sum = 348;
   for(i=0x8000; i>0x8; i>>=1)
        sum += (lunarInfo[y-1900] & i) ? 1: 0;
   return(sum+leapDays(y));
}
//====================================== 传回农历 y年闰月的天数
function leapDays(y) {
    if(leapMonth(y))
        return((lunarInfo[y-1900] & 0x10000)? 30: 29);
    else 
        return(0);
}

//====================================== 传回农历 y年闰哪个月 1-12 , 没闰传回 0
function leapMonth(y) {
   return(lunarInfo[y-1900] & 0xf);
}

//====================================== 传回农历 y年m月的总天数
function monthDays(y, m) {
   return((lunarInfo[y-1900] & (0x10000>>m))? 30: 29);
}

//====================================== 算出农历, 传入日期物件, 传回农历日期物件
//                                       该物件属性有 .year .month .day .isLeap .yearCyl .dayCyl .monCyl
function Lunar(objDate) {

   var i, leap=0, temp=0;
   var baseDate = new Date(1900,0,31);
   var offset   = Math.floor((objDate - baseDate)/86400000);

   this.dayCyl = offset + 40;
   this.monCyl = 14;

   for(i=1900; i<2050 && offset>0; i++) {
      temp = lYearDays(i);
      offset -= temp;
      this.monCyl += 12;
   }

   if(offset<0) {
      offset += temp;
      i--;
      this.monCyl -= 12;
   }

   this.year = i;
   this.yearCyl = i-1864;

   // 闰哪个月
   leap = leapMonth(i); 
   this.isLeap = false;

   for(i=1; i<13 && offset>0; i++) {
      // 闰月
      if(leap>0 && i==(leap+1) && this.isLeap==false) { 
    	  --i; this.isLeap = true; temp = leapDays(this.year); 
      } else { 
    	  temp = monthDays(this.year, i);
      }

      // 解除闰月
      if(this.isLeap==true && i==(leap+1)) 
        this.isLeap = false;

      offset -= temp;

      if(this.isLeap == false)
        this.monCyl ++;
   }

   if(offset==0 && leap>0 && i==leap+1)
      if(this.isLeap) { 
        this.isLeap = false; 
    } else { 
        this.isLeap = true; --i; --this.monCyl;
    }

    if(offset<0) { 
        offset += temp; --i; 
        --this.monCyl; 
    }
    this.month = i;
    this.day = offset + 1;
}

//==============================传回国历 y年某m+1月的天数
function solarDays(y, m) {
   if(m == 1)
      return(((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29: 28);
   else
      return(solarMonth[m]);
}
module.exports.solarDays = function(y, m) {
	return solarDays(y, m);
};

//============================== 传入 offset 传回干支, 0=甲子
function cyclical(num) {
   return(Gan[num%10]+Zhi[num%12]);
}

//===== 某年的第n个节气为几日(从0小寒起算)
function sTerm(y,n) {
	var offDate;
	//1900年1月6日2点5分 是小寒
	//2015年1月6日0点20分32秒 是小寒
	//2020年1月6日5点29分59秒 是小寒
	if (y < 2015) {
		offDate = new Date( ( 31556925974.7*(y-1900) + sTermInfo[n]*60000  ) + Date.UTC(1900,0,6,2,5) );
	} else {
		if (y < 2020) {
			offDate = new Date( ( 31556925974.7*(y-2015) + sTermInfo[n]*60000  ) + Date.UTC(2015,0,6,0,20,32) );
		} else {
			offDate = new Date( ( 31556925974.7*(y-2020) + sTermInfo[n]*60000  ) + Date.UTC(2020,0,6,5,29,59) );
		}
	}
	return(offDate.getUTCDate());
}
//============================== 传回月历物件 (y年,m+1月)
function calendar(sDObj) {

	/*
    sDObj.setYear(2016);
    sDObj.setMonth(4);
    sDObj.setDate(8);
    */

	 var _firstDate = new Date(sDObj);
	 _firstDate.setDate(1);
	 var _weeks = Math.ceil((sDObj.getTime() - _firstDate.getTime())/(1000*3600*24*7)) + 1;
	 var lDObj = new Lunar(sDObj)     //农历
	 var lY    = lDObj.year           //农历年
	 var lM    = lDObj.month          //农历月
	 var lD    = Math.floor(lDObj.day); //农历日
	 var lL    = lDObj.isLeap         //农历是否闰月
	 var lX    = lL? leapDays(lY): monthDays(lY, lM) //农历当月最後一天
	 var _tY = sDObj.getFullYear();
	 var _tM = sDObj.getMonth() +1;
	 var _tD = sDObj.getDate();
	 var _tW = sDObj.getDay();
	 var _sMonthDate = (_tM < 10 ? "0" + _tM:_tM) +"" +(_tD < 10 ? "0" + _tD:_tD); 
	 var _lMonthDate = (lM < 10 ? "0" + lM:lM) +"" +(lD < 10 ? "0" + lD: lD); 
	 var _wMonthDate = (_tM < 10 ? "0" + _tM:_tM) +"" + _weeks+"" +_tW; 	 
	 var _festival = "";
	 var _isChineseFestival = false;

	 //某月的第几个星期几
	 for(var i in wFtv)
		if (_wMonthDate==wFtv[i][0]) {
			if (_festival.length > 0) _festival +=", ";
			_festival+=wFtv[i][1];
			if (wFtv[i][2]) _isChineseFestival=true;	
			break;
		}
	 // 国历节日
	 for(var i in sFtv)
		if (_sMonthDate == sFtv[i][0]){
			if (_festival.length > 0) _festival +=", ";
			_festival+=sFtv[i][1];
			if (sFtv[i][2]) _isChineseFestival=true;
			break;
		}		
	 // 农历节日
	 for(i in lFtv)
		if (_lMonthDate==lFtv[i][0]) {
			if (_festival.length > 0) _festival +=", ";
			_festival+=lFtv[i][1];
			if (lFtv[i][2]) _isChineseFestival=true;
			break;
		}

	// 节气
	var _m = _tM -1;
	var _d = _tD -1;
	var tmp1=sTerm(_tY,_m*2) -1;
	if (tmp1 == _d){
		 if (_festival.length > 0) _festival +=", ";
			_festival+=solarTerm[_m*2];
	} else {
		 tmp1=sTerm(_tY,_m*2+1) -1;
		 if (tmp1 == _d){
			if (_festival.length > 0) _festival +=", ";
			_festival+=solarTerm[_m*2+1];
		 }
	}

    var lDD;
    if(lD == 1) {
        lDD = (lL ? '闰' : '') + monthStr[lM - 1] + '月' + (monthDays(lY, lM) == 29 ? '小' : '大');
    } else {
        lDD = cDay(lD);
    }

	return {
        lYear: lY, 
        lMonth:lM,
        lDay: lD,
        //time:sDObj.getTime(),
        isLeap: lL,
        festival: _festival,
        isCFestival: _isChineseFestival,
        cYear: cyclical(lDObj.yearCyl),
        lDayDesc: lDD
    };
	 
	/*
	return {
		lYear:lY, 
		lMonth:lM, 
		lDay:lD, 
		lDayDesc:cDay(lD),
		isLeap:lL,
		sYear:cyclical(lDObj.yearCyl),
		cMonth:cyclical(lDObj.monCyl), 
		cDay: cyclical(lDObj.dayCyl), 
		//wFestival:_wFestival, 
		//solarTerm:_solarTerm, 
		//cFestival:_cFestival, 
		//lFestival:_lFestival
	};*/
}

//====================== 中文日期
function cDay(d) {
    var s;
    switch (d) {
      case 10:
        s = '初十'; break;
      case 20:
        s = '二十'; break;
        break;
      case 30:
        s = '三十'; break;
        break;
      default:
        s = nStr2[Math.floor(d/10)];
        s += nStr1[d%10];
    }
    return(s);
}

module.exports.getDateInfo = function(_date) {
	return calendar(_date);
};
module.exports.getDateDesc = function(sDObj) {
	 var _tY = sDObj.getFullYear();
	 var _tM = sDObj.getMonth() +1;
	 var _tD = sDObj.getDate();
	return _tY + "年" + _tM + "月" + _tD + "日";
};
module.exports.getWeekDesc = function(sDObj) {
	var _tW = sDObj.getDay();
	return nStr1[_tW];
};