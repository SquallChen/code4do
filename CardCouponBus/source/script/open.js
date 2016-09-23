var deviceone = require("deviceone");
var app = deviceone.sm("do_App");

var statBarS = "transparent";
var animType = "push_r2l_1";
//浅色背景使用(状态栏字颜色黑);
module.exports.startb = function(source,animType, data, id, kbMode,scriptType){
    var option = {source: source};
    if (data) option.data = data;
    option.statusBarFgColor = "black";
    option.statusBarState = statBarS;
    option.animationType = animType;
    option.keyboardMode = kbMode; //visible hidden;
    option.scriptType = scriptType;
    if(id) option.id = id;
    app.openPage(option);
};
//深色背景使用(状态栏字颜色白);
module.exports.startw = function(source, animType, data, id, kbMode,scriptType){
    var option = {source: source};
    if (data) option.data = data;
    option.statusBarFgColor = "white";
    option.statusBarState = statBarS;
    option.animationType = animType;
    option.keyboardMode = kbMode;
    option.scriptType = scriptType;
    if(id) option.id = id;
    app.openPage(option);
};
