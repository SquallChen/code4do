/**
 * @author louhyi
 * @explanation 工具箱
 * button_change--实现一列按钮，点击切换效果用与index_2页面的页底
 * app_back--点击返回和物理返回事件
 * http_get--包含票据的get请求
 * http_post--包含票据的post请求
 * http_download--下载
 * tab_view--制作tabview控件
 * msg_tips--获取未读消息条数，并展示
 * login_http_post--登录接口的http请求*
 * url_distribute--根据是否登录打开不同页面
 * format_time--将时间戳的字符串格式化出年、月、日、时、分、秒
 * test_phone_number--手机号码正则验证
 * test_idcard--身份证号码正则验证
 * test_username--用户名验证正则验证
 * get_verificationcode--获得验证码
 * http_get_usually--不包含票据的get请求
 *************************************************************************************/
var deviceone = require("deviceone");
var my_touch = require("my_touch");
var URL = require("url");
var app = deviceone.sm("do_App");
var nf = deviceone.sm("do_Notification");
var dataCache = deviceone.sm("do_DataCache");
var global = deviceone.sm("do_Global");
var algorithm = deviceone.sm("do_Algorithm");
var device = deviceone.sm("do_Device");
var network = deviceone.sm("do_Network");
var timer = deviceone.mm("do_Timer");
var appid_os = "ARD-0512-0001";
var des3_key = "d9893b98d5ae542ccd206d6b83cb456286044307681abf16";

var error = function (e) {
    nf.alert(e.message);
};

var http_post = function (arr, map, wat, f) {
    var id = Math.random() + "" + Math.random();
    var wait = "";
    if (wat == "true") {
        wait = deviceone.ui(deviceone.ui("$").add(id, "source://view/waiting.ui", 0, 0));
    }
    var _voucher = arr[0];
    var _url = arr[1];
    /*实现传参body加密*/
    var sign = algorithm.des3Sync(des3_key, "encrypt", algorithm.md5Sync(algorithm.base64Sync("encode", appid_os + JSON.stringify(map))));
    
    /*构建传参结构*/
    var parameter = {
        head: {
            appid: appid_os,
            sign: sign,
            siteid: dataCache.loadData("AREA_INFO_INIT") ? dataCache.loadData("AREA_INFO_INIT").AreaCode : "",
            version: "2.0"
        },
        body: map
    };
    if (_voucher) {
        parameter.head.accessTicket = dataCache.loadData("accessTicket");
    }
    var http = deviceone.mm("do_Http");
    http.method = "POST";
    http.timeout = 60000;
    http.contentType = "application/json";
    http.body = JSON.stringify(parameter);
    http.url = _url;
    http.on("fail", function (data) {
        wait == "" ? "" : wait.remove();
        error(data);
    }).on("success", function (data) {
        wait == "" ? "" : wait.remove();
        if (data.head.rtnCode == 000000) {
            data = JSON.stringify(data).replace(/null/g, "\"\"");
            data = JSON.parse(data);
            f.call(null, data);
        } else {
            nf.alert(data.head.rtnMsg)
        }
    });
    http.request();
};

module.exports.http_post = http_post;
