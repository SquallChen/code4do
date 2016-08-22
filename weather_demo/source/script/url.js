/**
 * @author louhyi
 * @explanation 请求路径
 *************************************************************************************/
var domain_1 = "http://app.scity.cn";
var domain_1_11 = domain_1 + "/center_weatherserver/service/";

var url = {
    Weather: [false, domain_1_11 + "CW0101"],                      //--获取天气~
    WeatherFive: [false, domain_1_11 + "CW0102"]                //--获取五天的天气~
};

module.exports.url = url;