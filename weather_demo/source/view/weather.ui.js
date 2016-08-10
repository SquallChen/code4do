///**
// * @author louhyi
// * 天气信息
// *************************************************************************************/
//
///*设定页面返回功能*/
var toolbar = require("toolbar"),
    URL = require("url"),
    page = sm("do_Page"),
    nf = sm("do_Notification"),
    baidulocation = sm("do_BaiduLocation"),
    rootview = ui("$"),
    do_HashData = mm("do_HashData")
//    city_name = ui("city_name");
//toolbar.app_back();
//
var storage = sm("do_Storage");

//
/*生成最近5天的天气信息*/
function weather_five(data) {
    var date = new Date();
    var hours = date.getHours();
    var R = {};
    if (hours > 6 && hours < 18) {
        for (var i = 0; i < 5; i++) {
            var obj = data[i];
            for (var s in obj) {
                if (s == "status1") {
                    R["weather_status" + i] = obj.status1 == "" ? obj.status2 : obj.status1;
                } else if (s == "figure1") {
                    R["weather_img" + i] = "source://image/weather/" + (obj.figure1 == "" ? obj.figure2 : obj.figure1) + ".png";
                } else if (s == "temperature1") {
                    R["weather_temperature" + i] = obj.temperature1 + "~" + obj.temperature2 + "℃";
                } else if (s == "pollution_l") {
                    R["pollution_l" + i] = "空气质量：" + obj.pollution_l;
                } else if (s == "power1") {
                    R["weather_power" + i] = obj.power1 + "级";
                    R[s + i] = obj[s];
                } else if (s == "direction1") {
                    R["weather_direction" + i] = obj.direction1 == "" ? obj.direction2 : obj.direction1;
                    R[s + i] = obj[s];
                } else if (s == "savedate_weather") {
                    R["savedate_weather" + i] = (obj.savedate_weather).substring(5, 10);
                } else {
                    R[s + i] = obj[s];
                }
            }
        }
    } else {
        for (var i = 0; i < 5; i++) {
            var obj = data[i];
            for (var s in obj) {
                if (s == "status2") {
                    R["weather_status" + i] = obj.status2 == "" ? obj.status1 : obj.status2;
                } else if (s == "figure2") {
                    R["weather_img" + i] = "source://image/weather/" + (obj.figure2 == "" ? obj.figure1 : obj.figure2) + ".png";
                } else if (s == "temperature1") {
                    R["weather_temperature" + i] = obj.temperature1 + "~" + obj.temperature2 + "℃";
                } else if (s == "pollution_l") {
                    R["pollution_l" + i] = "空气质量：" + obj.pollution_l;
                } else if (s == "power1") {
                    R["weather_power" + i] = obj.power1 + "级";
                    R[s + i] = obj[s];
                } else if (s == "direction2") {
                    R["weather_direction" + i] = obj.direction2 == "" ? obj.direction1 : obj.direction2;
                    R[s + i] = obj[s];
                } else if (s == "savedate_weather") {
                    R["savedate_weather" + i] = (obj.savedate_weather).substring(5, 10);
                } else {
                    R[s + i] = obj[s];
                }
            }
        }
    }
    return R;
}

rootview.setMapping({
    "chy_l0.text": "chy_l0",
    "xcz_l0.text": "xcz_l0",
    "gm_l0.text": "gm_l0",
    "zwx_l0.text": "zwx_l0",
    "yd_l0.text": "yd_l0",
    "ssd_l0.text": "ssd_l0"
});


storage.readFile("data://city.json",function(data,e){
	toolbar.http_post(URL.url.WeatherFive, {CITYNAME:data.city.substring(0, data.city.length-1), TODAY: "0", DAYS: "5"}, "true", function (d) {
		do_HashData.addData(weather_five(d.body));
	    rootview.bindData(do_HashData);
	    rootview.refreshData();
	});
})
