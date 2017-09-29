var d1 = require("deviceone");
var initdata = d1.sm("do_InitData");

var ids;
var count;// 连通组个数
module.exports.run = function() {
	var s = initdata.readFileSync("initdata://tinyUF.txt");
	var ss = s.split("\n");
	var N = ss[0];
	var uf = [];
	for (var i = 1; i <= ss.length; i++) {
		var sss = ss[i].split(" ");
		if(sss.length<2)break;
		uf[i - 1] = [ sss[0].trim(), sss[1].trim() ];
	}
  run(N,uf);
  return "导入tinyUF.txt后，结果是:"+ids;
};

function run(N, a) {
	count=a.length;
	ids=[];
	for (var i = 0; i < N; i++) {
		ids[i] = i;// 初始化，起始每個id的值都是索引值
	}
	for (var j = 0; j < a.length; j++) {
		union(a[j][0],a[j][1]);// 添加数据
	}
}
function connected(p,q){
	return find(p)==find(q);
}
function union( p, q){   
  // 获得p和q的组号
  var pID = find(p);  
  var qID = find(q);  
  // 如果两个组号相等，直接返回
  if (pID == qID) return;  
  // 遍历一次，改变组号使他们属于一个组
  for (var i = 0; i < ids.length; i++)  
      if (ids[i] == pID) ids[i] = qID; 
  d1.print(ids);
  count--;
}  

function find(l)
{
	return ids[l];
}