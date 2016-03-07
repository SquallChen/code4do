//引入组件库
var do_App = sm("do_App");
var do_Page = sm("do_Page");
//声明UI变量
var root=ui("$");  //$表示当前视图的根UI
var do_ALayout_root=ui("do_ALayout_root");
var do_ImageView_icon=ui("do_ImageView_icon");
var do_Label_title=ui("do_Label_title");
var do_Label_desc=ui("do_Label_desc");

//设置数据绑定的映射关系
root.setMapping({
	"do_ALayout_root.tag":"url",
	"do_Label_title.text":"title",
	"do_Label_desc.text":"desc",
	"do_ImageView_icon.source":"image"
});

//点击查看当前新闻的详细内容
do_ALayout_root.on("touch", function(){
	do_ALayout_root.bgColor = "FFFFFFFF";
	var _newsID = do_ALayout_root.tag;
	do_App.openPage({
		source:"source://view/news/newsDetail.ui", 
		animationType:"push_r2l", //动画效果：从右向左推出
		statusBarState:"transparent",
		data:JSON.stringify({title:do_Label_title.text, url:_newsID}) //传递页面之间的参数
	});
});

//实现选中和离开当前记录的前后效果
do_ALayout_root.on("touchDown", function(){
	do_ALayout_root.bgColor = "E0E0E0FF";
});
do_ALayout_root.on("touchUp", function(){
	do_ALayout_root.bgColor = "FFFFFFFF";
});