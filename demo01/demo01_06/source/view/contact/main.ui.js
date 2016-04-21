//引入组件库
var do_Notification = sm("do_Notification");
var do_Contact = sm("do_Contact");
var do_App = sm("do_App");
var do_Page = sm("do_Page");
//引入自定义的js库
var chinesePinYin = require("chinesePinYin");
//声明UI变量
var do_IndexListView_contract=ui("do_IndexListView_contract")
var do_HashData = mm("do_HashData"); 
//读取本地通讯录的数据
do_Contact.getData({types:['name','phone']}, function(data){
	deviceone.print(JSON.stringify(data));
	var _allContracts={};
	var _allIndexes=[];	
	if (data!=null && data.length >0){		
		var _name;
		var _phone;
		var _indexChar;		
		for(var i=0; i<data.length; i++){			
			_name = data[i].name;
			_phone = data[i].phone;
			if (_name== null || _name.length <=0|| _phone==null || _phone.length <=0) continue;
			//获取首字符的拼音索引
			_indexChar = chinesePinYin.GetJP(_name[0]);
			if (_indexChar==null || _indexChar.length <=0) _indexChar="#";
			if (_allContracts[_indexChar] == null) {
				_allContracts[_indexChar]= [];
			}
			_allContracts[_indexChar].push({"template":0,"text":_name, "phone":_phone[0]});			
		}
		var _allChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ#";
		for (var i=0; i< _allChars.length; i++){
			var _char=_allChars[i];
			if (_allContracts[_char] == null) continue;
			_allIndexes.push(_char);
			var _rowData={};
			_rowData[_char] = _allContracts[_char];
			do_HashData.addData(_rowData);			
		}
	}
	//给do_IndexListView_contract绑定数据
	do_IndexListView_contract.bindItems(do_HashData,_allIndexes);
	do_IndexListView_contract.refreshItems();

});
