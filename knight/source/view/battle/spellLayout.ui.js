/**
 * related to spellLayout.ui
 * 
 * @Author : and
 * @Timestamp : 2017-01-28
 */
var dojs = require("dojs")
var spell = require("spell")

var listdata = mm("do_ListData");
ui("$").bindItems(listdata);

ui("$").on("refresh", function(data) {
	var spells = data.spells;
	var activied_spell = data.battle.selected_spell;
	var current = data.id;
	var list = [];
	for(var i = 0;i<spells.length;i++){
		var s = spell.init(spells[i]);
		var d = {};
		d.name = s.name;
		d.id = s.id;
		d.isSelected = false;
		d.current = current;
		list.push(d);
	}
	refresh(list, activied_spell);
})

sm("do_Page").on("spellSelected", function(d) {
	var list = listdata.getRange(0);
	refresh(list, d.id);
});

function refresh(list, id) {
	for (var i = 0; i < list.length; i++) {
		if (list[i].id == id)
			list[i].isSelected = true;
		else
			list[i].isSelected = false;
	}
	listdata.removeAll();
	listdata.addData(list);
	
	ui("$").refreshItems();
}