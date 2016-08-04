/**
 * related to weather1.ui
 * 
 * @Author : zxhuizhi@126.com
 * @Timestamp : 2016-07-28
 */
/**
 * @author louhyi
 * 天气信息
 *************************************************************************************/

/*设定页面返回功能*/
var toolbar = require("toolbar"),
    URL = require("url"),
    page = sm("do_Page"),
    nf = sm("do_Notification"),
    iFlyVoice = sm("do_iFlyVoice"),
    baidulocation = sm("do_BaiduLocation"),
    rootview = ui("$"),
    storage = sm("do_Storage"),
    do_HashData = mm("do_HashData"),
    do_Alayout_Root = ui("do_Alayout_Root"),
    city_name = ui("city_name"),
    city_streetname = ui("city_streetname"),
	weather_status0 = ui("weather_status0"),
	weather_0 = ui("weather_0"),
	weather_1 = ui("weather_1"),
	action_iFlyVoice = ui("action_iFlyVoice"),
	weather_temperature = ui("weather_temperature");
	weather_temperature_0 = ui("weather_temperature_0");
	weather_temperature_1 = ui("weather_temperature_1");
	do_ALayout_could = ui("do_ALayout_could");
	do_ImageView_icoin_0 = ui("do_ImageView_icoin_0")
	do_ImageView_icoin_1 = ui("do_ImageView_icoin_1")

//定义一个2秒的动画过程：缩放比例1-》1.2，图片位置：(0,0)-》(-75, -133)
var img_anima = mm("do_Animation");
img_anima.fillAfter = true;
img_anima.scale({
    delay: 0,
    duration: 5000,
    curve: "Linear",
    autoReverse: false,
    scaleFromX: 1,
    scaleFromY: 1,
    scaleToX: 1.2,
    scaleToY: 1.2
}, "start1");
img_anima.transfer({
    delay: 1000,
    duration: 10000,
    curve: "Linear",
    autoReverse: false,
    repeatCount:-1,
    fromX: 0,
    fromY: 0,
    toX: 750,
    toY: 0
}, "start2");
var temperature1 = "";
var temperature2 = "";
var status1 = "";

var latitude = "";
var longitude = "";
var new_city = ""
page.on("loaded",function(){
	storage.readFile("data://city.json",function(data,e){
		if(data.indexOf("省")!=-1){
			city_name.text = data.substring(data.indexOf("省")+1, data.indexOf("市"))
			toolbar.http_post(URL.url.WeatherFive, {CITYNAME: data.substring(data.indexOf("省")+1, data.indexOf("市")), TODAY: "0", DAYS: "2"}, "true", function (d) {
				 for (var key in d.body) {
						if (key == "0") {
							weather_0.text = d.body[key].status1;
							temperature1 = d.body[key].temperature1;
							temperature2 = d.body[key].temperature2;
							status1 = d.body[key].status1;
							weather_status0.text = d.body[key].status1;
							weather_temperature.text = d.body[key].temperature1+"℃";
							if(d.body[key].status1 == "多云"){
								do_ImageView_icoin_0.source = "source://image/weather_bg/blur_bg_na.jpg"
								do_Alayout_Root.bgImage = "source://image/weather_bg/bg_sunny_day.jpg"
								do_ALayout_could.bgImage = "source://image/weather_bg/fog_day_fog_bottom.png"
								do_ALayout_could.animate(img_anima)
							}else if(d.body[key].status1 == "晴"){
								do_ImageView_icoin_0.source = "source://image/weather_icoin/w0.png"
								do_Alayout_Root.bgImage = "source://image/weather_bg/bg_sunny_day.jpg"
								do_ALayout_could.bgImage = "source://image/weather_bg/fog_day_fog_bottom.png"
								do_ALayout_could.animate(img_anima)
							}else if(d.body[key].status1.indexOf("雨")!=-1){
								do_ImageView_icoin_0.source = "source://image/weather_icoin/w7.png"
								do_Alayout_Root.bgImage = "source://image/weather_bg/blur_bg_fog_and_haze.jpg"
								do_ALayout_could.bgImage = "source://image/weather_bg/moderate_rain_cloud1.png"
								do_ALayout_could.animate(img_anima)
							}else{
								do_ImageView_icoin_0.source = "source://image/weather_icoin/w0.png"
								do_Alayout_Root.bgImage = "source://image/weather_bg/blur_bg_fog_and_haze.jpg"
								do_ALayout_could.bgImage = "source://image/weather_bg/moderate_rain_cloud1.png"
								do_ALayout_could.animate(img_anima)
							}
							weather_temperature_0.text = d.body[key].temperature1+"/"+d.body[key].temperature2+"℃";
						}
						if (key == "1"){
							weather_1.text = d.body[key].status1;
							if(d.body[key].status1 == "多云"){
								do_ImageView_icoin_1.source = "source://image/weather_icoin/w13.png"
							}else if(d.body[key].status1 == "晴"){
								do_ImageView_icoin_1.source = "source://image/weather_icoin/w0.png"
							}else{
								do_ImageView_icoin_1.source = "source://image/weather_icoin/w7.png"
							}
							weather_temperature_1.text = d.body[key].temperature1+"/"+d.body[key].temperature2+"℃";
						}
					}
				});
		}
	})
////	baidulocation.start("high", "true");
////	baidulocation.locate("high", function(data, e) {
////		latitude = data.latitude;
////		longitude = data.longitude;
////		baidulocation.reverseGeoCode(latitude,longitude, function(data1, e) {
////			 city_name.text = data1.district;
//			 city_name.text = data.substring(data.indexOf("省")+1, data.indexOf("市"))
////			 city_streetname.text = data1.streetName;
////			 new_city = data1.city;
//			 nf.alert(data1)
//			 
////		})
//		
//		
////	})
})


action_iFlyVoice.on("touch",function(){
	var text1 = "现在为您播报，今天白天到夜间," + status1 +",温度"+ temperature2+"到"+temperature1+"摄氏度";
	iFlyVoice.speak({text:text1})
})






