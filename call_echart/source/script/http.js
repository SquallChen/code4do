var deviceone = require("deviceone");
var do_Storage = deviceone.sm("do_Storage");
var do_Global = deviceone.sm("do_Global");
var do_InitData=deviceone.sm("do_InitData");


//定义测试数据
var mock_defines=[
        {url:"app/line.html",result:"initdata://mock/line.json", status:"0"},
        {url:"app/bar.html",result:"initdata://mock/bar.json", status:"0"},
        {url:"app/ring.html",result:"initdata://mock/ring.json", status:"0"},
        {url:"app/pie.html",result:"initdata://mock/pie.json", status:"0"}
        ];
//---------------------------------------------------------------
module.exports.get_MockData = function(_url, _succeed, _fail){
	for(var i =0;i< mock_defines.length; i++){
		var _mock = mock_defines[i];
		if (_url.indexOf(_mock.url) ==0 && _mock.result){
			if (!do_InitData.fileExist(_mock.result)){
				deviceone.print("未找到mock文件：" + _mock.result);
			}
			if (_mock.status == "0"){
				if (_succeed){
					do_InitData.readFile(_mock.result, function(data) {
						_succeed.call(this, data);
					});
				}				
			}
		}
	}
}
