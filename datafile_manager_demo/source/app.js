/**
 * @Author : logo_qy@163.com
 * @Timestamp : 2016-08-16
 */
var d1 = require("deviceone");
var app = d1.sm("do_App");
var do_InitData =d1.sm("do_InitData");
app.on("loaded", function (){
	do_InitData.copyFile("initdata://big.zip","data://big.zip", function(){
		app.openPage({source:"source://view/index.ui",
	        data:"data://big",
			statusBarState:"transparent"
	        });         
	    })
  });
