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

/*实现一列按钮，点击切换效果*/
var old_button = -1;
var start;
var button_change = function (now) {
    old_button++;
    var fw_img = deviceone.ui("fw_img"),
        fw_lb = deviceone.ui("fw_lb"),
        mx_img = deviceone.ui("mx_img"),
        mx_lb = deviceone.ui("mx_lb"),
        city_img = deviceone.ui("city_img"),
        city_lb = deviceone.ui("city_lb");
    var img_arr = [fw_img, mx_img, city_img];
    var img_arr_str = ["fw_img", "mx_img", "city_img"];
    var label_arr = [fw_lb, mx_lb, city_lb];
    if (old_button) {
        img_arr[start].source = "source://image/index/" + img_arr_str[start] + "0.png";
        label_arr[start].fontColor = "B3B3B3FF";
        img_arr[now].source = "source://image/index/" + img_arr_str[now] + "1.png";
        label_arr[now].fontColor = "007AFFFF";
        start = now;
    } else {
        img_arr[0].source = "source://image/index/" + img_arr_str[0] + "0.png";
        label_arr[0].fontColor = "B3B3B3FF";
        img_arr[now].source = "source://image/index/" + img_arr_str[now] + "1.png";
        label_arr[now].fontColor = "007AFFFF";
        start = now;
    }
};

/*实现页面头部返回按钮点击事件与android设备的设备返回事件*/
var page = deviceone.sm("do_Page");
var app_back = function (parameter) {
    var back = deviceone.ui("back");
//    my_touch.mytouch(back);
    back.on("touch", function () {
        app.closePage(parameter);
    });
    page.on("back", function () {
        app.closePage(parameter);
    })

};


var error = function (e) {
    nf.alert(e.message);
};

/*实现http请求*/
var http_get = function (url, map, wat, f) {
    var id = Math.random() + "" + Math.random();
    var wait = "";
    if (wat == "true") {
        wait = deviceone.ui(deviceone.ui("$").add(id, "source://view/waiting.ui", 0, 0));
    }
    url = url + "?";
    for (var s in map) {
        url = url + s + "=" + map[s] + "&"
    }
    url = url.substring(0, url.length - 1);
    var http = deviceone.mm("do_Http");
    http.method = "GET";           //http的请求方式method为get
    http.timeout = 30000;			//请求服务器超时时间,单位是毫秒，默认值为5000
    http.contentType = "application/json";			//内容类型(只有在请求方式为post有效),默认值为"text/html"
    http.url = url;				//发送服务器请求地址
    http.on("fail", function (data) {
        wait == "" ? "" : wait.remove();
        error(data);
    }).on("success", function (data) {
        wait == "" ? "" : wait.remove();
        data = JSON.stringify(data).replace(/null/g, "\"\"");
        data = JSON.parse(data);
        f.call(null, data);
    });
    http.request();
};

var http_get_usually = function (url, map, wat, f) {
    var id = Math.random() + "" + Math.random();
    var wait = "";
    if (wat == "true") {
        wait = deviceone.ui(deviceone.ui("$").add(id, "source://view/waiting.ui", 0, 0));
    }
    url = url + "?";
    for (var s in map) {
        url = url + s + "=" + map[s] + "&"
    }
    url = url.substring(0, url.length - 1);
    var http = deviceone.mm("do_Http");
    http.method = "GET";           //http的请求方式method为get
    http.timeout = 30000;			//请求服务器超时时间,单位是毫秒，默认值为5000
    http.contentType = "application/json";			//内容类型(只有在请求方式为post有效),默认值为"text/html"
    http.url = url;				//发送服务器请求地址
    http.on("fail", function (data) {
        wait == "" ? "" : wait.remove();
        error(data);
    }).on("success", function (data) {
        wait == "" ? "" : wait.remove();
        f.call(null, data);
    });
    http.request();
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
    deviceone.print(JSON.stringify(parameter))
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


/**
 * 办事大厅请求
 */
var http_post_hall = function (arr, map, wat, f) {
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
            appid: "BAS-0512-0001",
            sign: sign,
            version: "1.0"
        },
        body: map
    };
    if (_voucher) {
        parameter.head.accessTicket = dataCache.loadData("accessTicket");
    }
    deviceone.print(JSON.stringify(parameter));
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

var http_download = function (url, ads, f, fun) {
    var http = deviceone.mm("do_Http");
    http.method = "POST";
    http.timeout = 60000;
    http.contentType = "application/json";
    http.url = url;
    http.on("fail", function (data) {
        f.call(null, data);
    }).on("success", function (data) {
        f.call(null, data);
    }).on("progress", function (data) {
        data = JSON.stringify(data);
        fun.call(null, data);
    });
    http.download(ads);
};

/*登录接口的http请求*/
var login_http_post = function (url, map, wait, f) {
    var device_info = device.getInfo();
    var parameter = {
        head: { appid: appid_os, sign: "1234567890" },
        body: {
            username: map.username,
            password: map.password,
            devicecode: device_info.deviceId,
            devicetype: device_info.OS,
            mac: network.getIP(),
            systemversion: device_info.OSVersion,
            siteid: dataCache.loadData("AREA_INFO_INIT").AreaCode,
            rejectpush: ""
        }
    };
    var http = deviceone.mm("do_Http");
    http.method = "POST";
    http.timeout = 60000;
    http.contentType = "application/json";
    http.body = parameter;
    http.url = url[1];
    http.on("fail", function (data) {
        wait == "" ? "" : wait.remove();
        error(data);
    }).on("success", function (data) {
        data = JSON.stringify(data).replace(/null/g, "\"\"");
        data = JSON.parse(data);
        if (data.head.rtnCode == "000000") {
            dataCache.saveData("accessTicket", data.body.accessTicket);
            f.call(null, data);
        } else {
            nf.alert(data.head.rtnMsg);
        }
    });
    http.request();
};

/**
 * @author louhyi
 * @explanation 制作tabview控件
 * @thinking 导航栏和主体有一个发生了切换，触发indexChanged（）事件，获得当前的index标志位，赋值给另一个index并通过
 * 遍历的方式把(i == index)的导航栏的样式设置为选中的样式其他全部置为未选中的样式。
 *
 * view_title--滑动控件的实例化（do_SegmentView）
 * view_tab---滑动控件的实例化（do_SlideView）
 * title_data--tabview的导航栏绑定的数据
 * tab_data--tabview主页面的绑定数据
 * font_color--导航栏中未选中项的字体颜色
 * bg_color--导航栏中未选中项的下划线的颜色
 * y_font_color--导航栏中选中项的字体颜色
 * y_bg_color--导航栏中选中项的下划线的颜色
 * $0--导航栏中的导航内容
 * $1--导航栏中字体的颜色
 * $2--导航栏中下划线的颜色
 * title_bind--导航栏的绑定数据源
 * tab_bind--主体的绑定数据源
 ***********************************************************************************/
var tab_view = function (view_title, view_tab, title_data, tab_data, font_color, bg_color, y_font_color, y_bg_color, init) {
    init ? init : 0;
    var title_bind = deviceone.mm("do_ListData");
    view_title.bindItems(title_bind);
    title_bind.addData(title_data);
    view_title.refreshItems();
    var tab_bind = deviceone.mm("do_ListData");
    view_tab.bindItems(tab_bind);
    tab_bind.addData(tab_data);
    view_tab.refreshItems();
    view_title.on("indexChanged", function (index, e) {
        for (var i = 0; i < title_data.length; i++) {
            if (i == index) {
                title_bind.updateOne(i, {
                    "$0": title_data[i].$0,
                    "$1": y_font_color,
                    "$2": y_bg_color
                });
            } else {
                title_bind.updateOne(i, {
                    "$0": title_data[i].$0,
                    "$1": font_color,
                    "$2": bg_color
                });
            }
        }
        view_title.refreshItems({});
        view_tab.index = index;
    });
    view_tab.on("indexChanged", function (index, e) {
        view_title.index = index;
    });
    view_tab.index = init;
};
/*获取未读消息条数，并展示*/
var msg_tips = function (view) {
    if (global.getMemory("ISLOGIN")) {
        var area_info = dataCache.loadData("AREA_INFO_INIT");
        var notify = area_info.DoMain + "/" + area_info.ContractAreaCode + "_notify/service/CW0101";
        http_post([true, notify], {userid: "userid"}, "true", function (d) {
            if (d.body != 0) {
                app.fire("tips_1",true);
                app.fire("tips_2",true);
                view.visible = true;
                view.text = d.body;
            } else {
                app.fire("tips_1");
                app.fire("tips_2");
                view.visible = false;
            }
        })
    }
};
/*根据是否登录打开不同页面*/
var url_distribute = function (url_1) {
    var islogin = global.getMemory("ISLOGIN");
    if (islogin == "true") {
        app.openPage(url_1, "", "push_r2l");
    } else {
        app.openPage("source://view/login/login.ui", "", "push_r2l");
    }
};
/*将时间戳的字符串格式化出年、月、日、时、分、秒*/
var format_time = function (time_string, format) {
    var time = new Date(parseInt(time_string));
    var year = time.getFullYear();
    var month = time.getMonth() + 1 > 9 ? time.getMonth() + 1 : "0" + (time.getMonth() + 1);
    var day = time.getDate() > 9 ? time.getDate() : "0" + time.getDate();
    var hours = time.getHours() > 9 ? time.getHours() : "0" + time.getHours();
    var minutes = time.getMinutes() > 9 ? time.getMinutes() : "0" + time.getMinutes();
    var seconds = time.getSeconds() > 9 ? time.getSeconds() : "0" + time.getSeconds();
    if (format == "yyyy-mm-dd") {
        return year + "-" + month + "-" + day;
    } else if (format == "hh:mm:ss") {
        return hours + ":" + minutes + ":" + seconds;
    } else if (format == "yyyy-mm-dd hh:mm:ss") {
        return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    } else if (format == "yyyy年mm月dd日") {
        return year + "年" + month + "月" + day + "日";
    } else {
        return {year: year, month: month, day: day, hours: hours, minutes: minutes, seconds: seconds};
    }
};
/*手机号码验证*/
var test_phone_number = function (phone_number) {
    return(!!phone_number.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/));
};
/*身份证号码验证*/
var test_idcard = function (idCard) {
    /*
     * 身份证15位编码规则：dddddd yymmdd xx p
     * dddddd：6位地区编码
     * yymmdd: 出生年(两位年)月日，如：910215
     * xx: 顺序编码，系统产生，无法确定
     * p: 性别，奇数为男，偶数为女
     *
     * 身份证18位编码规则：dddddd yyyymmdd xxx y
     * dddddd：6位地区编码
     * yyyymmdd: 出生年(四位年)月日，如：19910215
     * xxx：顺序编码，系统产生，无法确定，奇数为男，偶数为女
     * y: 校验码，该位数值可通过前17位计算获得
     *
     * 前17位号码加权因子为 Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
     * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
     * 如果验证码恰好是10，为了保证身份证是十八位，那么第十八位将用X来代替
     * 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )
     * i为身份证号码1...17 位; Y_P为校验码Y所在校验码数组位置
     */

    //15位和18位身份证号码的正则表达式
    var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(idCard)) {
        if (idCard.length == 18) {
            var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
            var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
            for (var i = 0; i < 17; i++) {
                idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
            }
            var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
            var idCardLast = idCard.substring(17);//得到最后一位身份证号码
            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod == 2) {
                if (idCardLast == "X" || idCardLast == "x") {
                    return true;
                } else {
                    nf.alert("身份证号码错误！");
                    return false;
                }
            } else {
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (idCardLast == idCardY[idCardMod]) {
                    return true;
                } else {
                    nf.alert("身份证号码错误！");
                    return false;
                }
            }
        }
    } else {
        nf.alert("身份证格式不正确!");
    }
};

/*用户名验证*/
function test_username(username) {
    if (username.length < 6) {
        return false;
    } else {
        var reg = /^[a-z][a-z0-9_]*$/i;
        return reg.test(username);
    }
}

/*获得验证码*/
var get_verificationcode = function (view, phone_number, area, BUSINESSTYPE, purpose) {
    timer.interval = "1000";
    timer.delay = "0";
    var seconds = 60;
    test_phone_number(phone_number);
    var body = {
        BUSINESSTYPE: BUSINESSTYPE,
        MOBILENUM: phone_number,
        VALID: "10",
        senderId: area.senderId,
        appId: area.ContractAreaCode + "portal"
    };
    if (phone_number == "") {
        nf.alert("请输入手机号码！")
    } else if (test_phone_number(phone_number)) {
        if (purpose == 1) {
            http_post(URL.url.TestPhoneNumber, {MOBILENUM: phone_number}, "true", function (d) {
                if (d.body) {
                    http_post(URL.url.SendCode, body, "true", function () {
                        nf.toast("验证码发送成功！请稍候...");
                        timer.start();
                        view.enabled = false;
                        view.fontColor = "888888FF";
                        timer.on("tick", function (d) {
                            seconds--;
                            if (seconds == 0) {
                                view.enabled = true;
                                view.fontColor = "4088D6FF";
                                view.text = "获取验证码";
                                timer.stop();
                            } else {
                                view.text = "(" + seconds + ")秒后重试";
                            }
                        });
                    });
                } else {
                    nf.alert("该手机账号已被注册！");
                }
            })
        } else {
            http_post(URL.url.SendCode, body, "true", function (d) {
                nf.toast("验证码发送成功！请稍候...");
                timer.start();
                view.enabled = false;
                view.fontColor = "888888FF";
                timer.on("tick", function () {
                    seconds--;
                    if (seconds == 0) {
                        view.enabled = true;
                        view.fontColor = "4088D6FF";
                        view.text = "获取验证码";
                        timer.stop();
                    } else {
                        view.text = "(" + seconds + ")秒后重试";
                    }
                });
            });
        }
    } else {
        nf.toast("请输入正确的手机号码！")
    }
};

module.exports.button_change = button_change;
module.exports.app_back = app_back;
module.exports.http_get = http_get;
module.exports.http_post = http_post;
module.exports.http_post_hall=http_post_hall;
module.exports.http_download = http_download;
module.exports.tab_view = tab_view;
module.exports.msg_tips = msg_tips;
module.exports.login_http_post = login_http_post;
module.exports.url_distribute = url_distribute;
module.exports.format_time = format_time;
module.exports.test_phone_number = test_phone_number;
module.exports.test_idcard = test_idcard;
module.exports.test_username = test_username;
module.exports.get_verificationcode = get_verificationcode;
module.exports.http_get_usually = http_get_usually;
