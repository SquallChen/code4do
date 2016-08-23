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
