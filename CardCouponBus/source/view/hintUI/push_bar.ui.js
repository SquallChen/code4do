//related to pull_bar.ui
var page = sm("do_Page");
var label = ui("do_Label_1");
page.on("pushevent", function(data) {
	switch (data.state) {
	case 0:
		label.text = "加载更多";
		break;
	case 1:
		label.text = "松手加载";
		break;
	case 2:
		label.text = "正在加载数据";
		break;
	}
});