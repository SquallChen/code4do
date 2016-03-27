//related to button.ui
var root = ui("$");
var page = sm("do_Page"); // 广播用

var info = {
	"isSpace" : false,
	"imageIndex" : 0,
	"posIndex" : 0,
	"size" : 200,
	"scale" : 3,
	"cavasX" : 0,
	"cavasY" : 0,
	"okCount" : 0,
	"isActive" : false,
	"okState" : false,
	"update" : function(isSpace, imageIndex, posIndex, size, scale, cavasX,
			cavasY) {
		this.okState = false;
		this.okCount = 0;
		this.isSpace = isSpace;
		this.imageIndex = imageIndex;
		this.posIndex = posIndex;
		this.size = size;
		this.scale = scale;
		this.cavasX = cavasX;
		this.cavasY = cavasY;
	},
	"checkOk" : function() {
		var newState = (this.posIndex == this.imageIndex);
		if (this.okState == newState) {
			return 0;
		} else {
			this.okState = newState;
			return this.okState ? 1 : -1;
		}
	},
	"rowPos" : function(info) {
		if (info == undefined) {
			return Math.floor(this.posIndex / this.scale);
		} else {
			return Math.floor(info.posIndex / info.scale);
		}
	},
	"columnPos" : function(info) {
		if (info == undefined) {
			return this.posIndex % this.scale;
		} else {
			return info.posIndex % info.scale;
		}
	},
	"rowImage" : function() {
		return Math.floor(this.imageIndex / this.scale);
	},
	"columnImage" : function() {
		return this.imageIndex % this.scale;
	},
	"x" : function() {
		if (this.isSpace) {
			return -this.size * (this.columnImage() + 1);
		} else {
			return -this.size * this.columnImage();
		}

	},
	"y" : function() {
		if (this.isSpace) {
			return -this.size * (this.rowImage() + 1);
		} else {
			return -this.size * this.rowImage();
		}
	},
}

root.on(
		"init",
		function(data) {
			var img = ui("do_ImageView_1");
			info.update(data.isSpace, data.imageIndex, data.posIndex,
					data.size, data.scale, data.cavasX, data.cavasY);

			img.width = info.scale * info.size;
			img.width = info.scale * info.size;
			img.source = data.source;
			img.x = info.x();
			img.y = info.y();
			refresh();
		}).on("touch", function() {

	if (!info.isSpace) {
		info.isActive = true;
		page.fire("control_QuerySpace", info);
	}
}).on("initCheckOk", function() {
	if (!info.isSpace) {
		page.fire("control_CheckOk", {
			"init" : true,
			"imageIndex" : info.imageIndex,
			"ok" : info.checkOk()
		})
	}
})

page
		.on("control_CheckOk", function(data) {
			if (info.isSpace) {
				if (data.ok > 0) {
					info.okCount++;
				} else if (data.ok < 0) {
					if (!data.init) {
						info.okCount--;
					}
				}
				if (info.okCount == info.scale * info.scale - 1) {
					if (!data.init) {
						root.fire("control_OK");
					}
				}
			}
		})
		.on(
				"control_QuerySpace",
				function(data) {
					if (info.isSpace) {
						if ((Math.abs(info.columnPos() - info.columnPos(data)) == 1 && info
								.rowPos() == info.rowPos(data))
								|| (Math.abs(info.rowPos() - info.rowPos(data)) == 1 && info
										.columnPos() == info.columnPos(data))) {
							// canMove
							var oldPosIndex = info.posIndex;
							info.posIndex = data.posIndex;
							refresh();
							page.fire("control_SwapTo", oldPosIndex);
						} else {
							page.fire("control_loseFocus");
						}
					}
				}).on("control_SwapTo", function(posIndex) {
			if (info.isActive) {

				info.isActive = false;
				info.posIndex = posIndex;
				refresh();
				page.fire("control_CheckOk", {
					"init" : false,
					"imageIndex" : info.imageIndex,
					"ok" : info.checkOk()
				});
			}

		}).on("control_loseFocus", function() {
			if (info.isActive) {
				info.isActive = false;
			}
		})

function refresh() {
	root.width = info.size;
	root.height = info.size;
	root.x = info.cavasX + info.size * info.columnPos() + info.columnPos() * 2;
	root.y = info.cavasY + info.size * info.rowPos() + info.rowPos() * 2;
	root.redraw();
}
