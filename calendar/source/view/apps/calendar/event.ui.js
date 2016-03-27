/*******************************************************************************
 * @设置Mapping;
 * @ui("$") 可去的根节点的控件
 ******************************************************************************/
ui("$").setMapping({
	"title.text" : "title",
	"time.text" : "created_at",
	'category.bgColor':'calendar.color',
	'content.text':'calendar.name',
	'day.visible':'day',
	'start.text':'start',
	'end.text':'end',
	'allday.visible':'allday',
});
