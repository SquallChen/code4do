var deviceone = require("deviceone");

var gridView = function(id) {
	
	var grid = deviceone.ui(id);
	var store = deviceone.mm('do_ListData');
	grid.bindItems(store);

	store.getAt = function(index) {
		return store.getOne(index);
	}
	
	store.getAll = function() {
		return store.getRange(0);
	}
	
	store.map = function(callback) {
		
		var items = store.getRange(0);
		var ret = [];
		
		for (var i = 0; i < items.length; i++) {
			item = callback(items[i], i);
			ret.push(item);
		};
		grid.loadData(ret);
	};
	
	store.add = function(items) {
		store.addData(items);
	}
	
	store.update = function(index, row) {
		return store.updateOne(index, row);
	}

	store.loadData = function(items) {
		store.removeAll();
		store.addData(items);
		grid.refreshItems();
	}
	
	grid.loadData = function(items) {
		store.removeAll();
		store.addData(items);
		grid.refreshItems();
	}
	
	grid.store = store;
	
	return grid;
}

module.exports = gridView;