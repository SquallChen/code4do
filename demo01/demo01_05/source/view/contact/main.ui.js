//引入组件库
var do_Notification = sm("do_Notification");
var do_Contact = sm("do_Contact");
var do_App = sm("do_App");
var do_Page = sm("do_Page");
//引入自定义的js库
var chinesePinYin = require("chinesePinYin");
//声明UI变量
var do_IndexListView_contract=ui("do_IndexListView_contract")

var hd = mm("do_HashData"); 
//为HashData数据源添加数据
//hashdata的每一项value中第一个元素为索引组的数据，这个索引组对应的模板不可点击
hd.addData({"A":[{"template":0,"text":"A"},{"template":0,"text":"阿里"},{"template":0,"text":"阿毛"},{"template":0,"text":"阿俊"}]});
hd.addData({"B":[{"template":0,"text":"B"},{"template":0,"text":"博古"},{"template":0,"text":"薄瓜瓜"},{"template":0,"text":"b-By2，旺收拢"}]});
hd.addData({"C":[{"template":0,"text":"C"},{"template":0,"text":"c-村官潘-太多的借口"},{"template":0,"text":"c-陈翔-烟火"},{"template":0,"text":"c-陈奕迅-好久不见"},{"template":0,"text":"c-陈奕迅-红玫瑰"}]});
hd.addData({"D":[{"template":0,"text":"D"},{"template":0,"text":"d-大冰-陪我到可可西里去看海"},{"template":0,"text":"d-大鹏-那丝也有春天"},{"template":0,"text":"d-大大大大"}]});
hd.addData({"E":[{"template":0,"text":"E"},{"template":0,"text":"f-芳芳-守着你到永久"},{"template":0,"text":"f-方大同-红豆"},{"template":0,"text":"f-光良-童话"},{"template":0,"text":"f-想你的夜"}]});
hd.addData({"F":[{"template":0,"text":"F"},{"template":0,"text":"F1"},{"template":0,"text":"F2"}]});
hd.addData({"G":[{"template":0,"text":"G"},{"template":0,"text":"G1"},{"template":0,"text":"G2"}]});
hd.addData({"H":[{"template":0,"text":"H"},{"template":0,"text":"H1"},{"template":0,"text":"H2"}]});
hd.addData({"I":[{"template":0,"text":"I"},{"template":0,"text":"I1"},{"template":0,"text":"I2"}]});
hd.addData({"J":[{"template":0,"text":"J"},{"template":0,"text":"J1"},{"template":0,"text":"J2"}]});
hd.addData({"K":[{"template":0,"text":"K"},{"template":0,"text":"K1"},{"template":0,"text":"K2"}]});
hd.addData({"L":[{"template":0,"text":"L"},{"template":0,"text":"L1"},{"template":0,"text":"L2"}]});
hd.addData({"M":[{"template":0,"text":"M"},{"template":0,"text":"M1"},{"template":0,"text":"M2"}]});
hd.addData({"N":[{"template":0,"text":"N"},{"template":0,"text":"N1"},{"template":0,"text":"N2"}]});
hd.addData({"O":[{"template":0,"text":"O"},{"template":0,"text":"O1"},{"template":0,"text":"O2"}]});
hd.addData({"P":[{"template":0,"text":"P"},{"template":0,"text":"P1"},{"template":0,"text":"P2"}]});
hd.addData({"Q":[{"template":0,"text":"Q"},{"template":0,"text":"Q1"},{"template":0,"text":"Q2"}]});
hd.addData({"R":[{"template":0,"text":"R"},{"template":0,"text":"R1"},{"template":0,"text":"R2"}]});
hd.addData({"S":[{"template":0,"text":"S"},{"template":0,"text":"S1"},{"template":0,"text":"S2"}]});
hd.addData({"T":[{"template":0,"text":"T"},{"template":0,"text":"T1"},{"template":0,"text":"T2"}]});
hd.addData({"U":[{"template":0,"text":"U"},{"template":0,"text":"U1"},{"template":0,"text":"U2"}]});
hd.addData({"V":[{"template":0,"text":"V"},{"template":0,"text":"V1"},{"template":0,"text":"V2"}]});
hd.addData({"W":[{"template":0,"text":"W"},{"template":0,"text":"W1"},{"template":0,"text":"W2"}]});
hd.addData({"X":[{"template":0,"text":"X"},{"template":0,"text":"X1"},{"template":0,"text":"X2"}]});
hd.addData({"Y":[{"template":0,"text":"Y"},{"template":0,"text":"Y1"},{"template":0,"text":"Y2"}]});
hd.addData({"Z":[{"template":0,"text":"Z"},{"template":0,"text":"Z1"},{"template":0,"text":"Z2"},{"template":0,"text":"Z3"},{"template":0,"text":"Z4"}]});
hd.addData({"#":[{"template":0,"text":"#"},{"template":0,"text":"#1"},{"template":0,"text":"#2"},{"template":0,"text":"#3"},{"template":0,"text":"#4"},{"template":0,"text":"#5"},{"template":0,"text":"#6"},{"template":0,"text":"#7"},{"template":0,"text":"#8"},{"template":0,"text":"#9"}]});

//读取本地通讯录的数据
do_Contact.getData({types:['name','phone']}, function(data){
	if (data!=null && data.length >0){		
		var _name;
		var _phone;
		var _indexChar;
		for(var i=0; i<data.length; i++){			
			_name = data[i].name;
			_phone = data[i].phone;
			if (_name== null || _name.length <=0|| _phone==null || _phone.length <=0) continue;
			//获取首字符的拼音索引
			_indexChar = chinesePinYin.GetJP(_name[1]);
			//deviceone.print(_name + "：" + _indexChar);
		}
	}
	do_IndexListView_contract.bindItems(hd,["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","#"]);
	do_IndexListView_contract.refreshItems();

});
