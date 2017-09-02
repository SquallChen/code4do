/**
 * @Author : and
 * @Timestamp : 2017-08-31
 */
// 生：与2或3个细胞相邻的细胞将活到下一轮；
// 死：与4个及以上细胞相邻，则因为过度拥挤而死；与1个或0个细胞相邻，则因为孤独而死；
// 繁衍：一个空格若与3个细胞相邻，则在下一轮时，这个空格内将产生一个新细胞。

// variable
var start = ui("btn_hello");
var canvas = ui("do_Canvas_1");
var timeLabel = ui("do_Label_1");
var time=0;
var c = 30;
var r = 50;
var griddatas=[];
var h = canvas.height / r;
var w = canvas.width / c;
// initialize
(function() {
	for(var i = 0;i<c;i++){
		griddatas[i]=[];
		for(var j =0;j<r;j++){
			griddatas[i][j]=0;
		}
	}
	initALife();
	
})();

start.on("touch",function(){
	initALife();
})
var timer = mm("do_Timer");
timer.interval = 1000;
timer.on("tick",function(){
	timeLabel.text=time++;
	tobeOrNottobe();
	repaint();
})
timer.start();
function tobeOrNottobe(){
	var temp = [];
	// 复制当前griddata到temp,计算规则必须基于上一轮的数据
	for(var i = 0;i<c;i++){
		temp[i]=[];
		for(var j =0;j<r;j++){
			temp[i][j]=griddatas[i][j];
		}
	}
	// 计算生死
	for(var l = 0;l<c;l++){
		for(var m =0;m<r;m++){
			var rangeLifeCount = computeRangeLifeCount(temp,l,m);
			if(temp[l][m]==1){
				//deviceone.print(l+","+m+":"+rangeLifeCount);
				// 生：与2或3个细胞相邻的细胞将活到下一轮；
				if(rangeLifeCount==2||rangeLifeCount==3){
					// do nothing
				}
				// 死：与4个及以上细胞相邻，则因为过度拥挤而死；与1个或0个细胞相邻，则因为孤独而死；
				else if(rangeLifeCount>=4||rangeLifeCount<=1){
					griddatas[l][m]=0;
				}
			}else{
				// 繁衍：一个空格若与3个细胞相邻，则在下一轮时，这个空格内将产生一个新细胞。
				if(rangeLifeCount==3){
					griddatas[l][m]=1;
				}
			}
		}
	}
}
function computeRangeLifeCount(datas,x,y){
	var _count = 0;
	var _array =[-1,0,1];
	for(var i =0;i<3;i++)
		for(var j=0;j<3;j++){
			if(_array[i]==0&&_array[j]==0)continue;
			var _x = x+_array[i];
			var _y = y+_array[j];
			if(_x<0||_x>=c)continue;
			if(_y<0||_y>=r)continue;
			if(datas[_x][_y]==1) 
				_count++;
		}
	return _count;
}
function initALife() {
	var minx = Math.floor(Math.random() * (c-3));
	var miny = Math.floor(Math.random() * (h-3));
	var maxx= minx+3;
	var maxy=miny+3;// 随机的范围不超过3*3
	var count = Math.floor(Math.random() * 6)+3;// 随机3-8
	
	for(var k=0;k<count;k++){
		var x = minx+Math.floor(Math.random() * 3);
		var y = miny+Math.floor(Math.random() * 3);
		griddatas[x][y]=1;
		deviceone.print(count+":"+x+","+y);
	}
	repaint();
}
function repaint(){
	canvas.clear();
	canvas.strokeColor = "000000CC";
	for (var i = 0; i <= r; i++) {
		canvas.defineLine({
			x : 0,
			y : i * h
		}, {
			x : canvas.width,
			y : i * h
		});
	}
	for (var j = 0; j <= c; j++) {
		canvas.defineLine({
			x : w * j,
			y : 0
		}, {
			x : w * j,
			y : canvas.height
		});
	}
	canvas.strokeColor = "D869D5FF";
	canvas.isFull=true;
	for(var l = 0;l<c;l++){
		for(var m =0;m<r;m++){
			if(griddatas[l][m]==1){
				canvas.defineCircle({
				      point : {
				          x : ((2*l+1)*w)/2,
				          y : ((2*m+1)*h)/2
				      },
				      radius : Math.min(w/2,h/2)
				});
			}
		}
	}
	canvas.paint();
}