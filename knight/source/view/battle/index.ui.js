/**
 * related to index.ui
 * 
 * @Author : and
 * @Timestamp : 2017-01-25
 */
// require
var dojs = require("dojs");
var Creature = require("creature");
var util = require("util");
var Battle = require("battle/battle");
var Grid = require("battle/grid");
var AI = require("battle/ai");

// variable
var griddata, gridview, mystatus, enemystatus, spellLayout, getexp;

var actionLabel = ui("actionLabel");
var battles = Battle.init(sm("do_Page").getData());

// initialize
(function() {
	initStatusBar();
	initSpellLayout();
	dojs.style.css([ ui("autoOrManual") ], "dynamicButton");
})();
// event
sm("do_Page").on("webivew_loaded", function() {
	initGrid();
}).on("print", function(d) {
	print(d);
}).on("refreshStatus", function(d) {
	if (d.battle.team == "us") {
		mystatus.fire("refresh", d);
		spellLayout.fire("refresh", d);
	} else
		enemystatus.fire("refresh", d);
}).on("spellSelected", function(d) {
	Battle.changeActivied_Spell(d, battles);
}).on("gridSelected", function(index) {
	if (battles.control == "manual" && battles.current == "us") {
		Battle.selectGrid(index, battles, griddata, ui("endButton"));
	}
}).on("rebackGridData", function() {
	ui("endButton").visible = false;
	gridview.fire("rebackData", griddata);
}).on("refreshGridData", function() {
	gridview.fire("refreshData", griddata);
}).on("usOver", function() {
	toEnemyAuto();
});
ui("exitButton").on("touch", function() {
	if (battles.tag == "kill" && battles.status == "ing") {
		sm("do_Notification").alert("生死之战，不能退出战斗!");
		return;
	}
	if (battles.status == "ing")
		battles.status = "halt";
	sm("do_App").closePage({
		tag : battles.status,
		exp : getexp
	});
})
ui("endButton").on("touch", function() {
	Battle.selectGrid("end", battles, griddata, ui("endButton"));
})
ui("autoOrManual").on("touch", function() {
	if (battles.status != "ing")
		return;
	if (battles.control == "manual") {
		this.text = "自动控制中";
		battles.control = "auto";
		autoBattle();
	} else {
		this.text = "手动控制中";
		battles.control = "manual";
	}
})
// private function
function computeWinExp() {
	getexp = 0;
	for (var i = 0; i < battles.enemies.length; i++) {
		var enemy = battles.enemies[i];
		getexp = enemy.exp + getexp;
		if (enemy.id == "yangzhou.poshang.npc.and") {
			print("恭喜你打败了And:");
			if (sm("do_Storage").fileExist("data://isgift")) {
				print("你已经拿过红包了，不能再拿了");
			} else {
				dojs.http.ajax("http://175.102.18.107:8089/service/gift", {
					success : function(d) {
						if (d.key) {
							print("你摸到了and发的一个红包，金额是:" + d.key + "元" + ",密钥是:" + d.value);
							sm("do_Storage").writeFile("data://isgift", "true", function(data, e) {

							})
						} else {
							print(d);
						}
					}
				})
			}
		}
	}
	getexp = parseInt(getexp);
}
function finish() {
	if (battles.current == "enemies") {
		battles.status = "win";
		ui("autoOrManual").text = "我方胜利";
		print("战斗结束，我方胜利")
		computeWinExp();
	} else {
		battles.status = "lost";
		ui("autoOrManual").text = "我方战败";
		if (battles.tag == "fight")
			print("<d3>战斗结束,我方全部倒下</d3>");
		else
			print("<d5>战斗结束,我方全部阵亡</d5>");
	}
}
function autoBattle() {
	if (battles.control == "manual" && battles.current == "us") {
		return;
	}
	if (Battle.isAllDie(battles)) {
		finish();
		return;
	}
	AI.autoBattle(griddata, battles);
	gridview.fire("refreshData", griddata);
	if (Battle.isAllOver(battles)) {
		if (battles.current == "us") {
			toEnemyAuto();
		} else {
			toUsAuto();
		}

	} else {
		ui("actionSleepLabel").visible = true;
		ui("actionSleepLabel").hide("fadeout", 1000, function(data, e) {
			autoBattle();
		});
	}
}
function turnOver() {
	// 当前回合结束，处理condition 的turn-1
	for (var i = 0; i < griddata.length; i++) {
		if (Grid.getTeam(griddata[i]) == battles.current) {
			if (griddata[i].tag.battle.conditions) {
				for ( var cond in griddata[i].tag.battle.conditions) {
					griddata[i].tag.battle.conditions[cond].turn = griddata[i].tag.battle.conditions[cond].turn - 1;
				}
				sm("do_Page").fire("refreshStatus", griddata[i].tag);
			}
		}
	}
}
function toUsAuto() {
	turnOver();
	actionLabel.text = "我方开始行动";
	actionLabel.visible = true;
	actionLabel.fontColor = "00FF00FF";
	battles.current = "us";
	changeAttackerToReady();
	actionLabel.hide("collapse_b2t", 1000, function(data, e) {
		battles.round = battles.round + 1;
		ui("roundLabel").text = "回合" + battles.round;
		autoBattle();
	});
}
function toEnemyAuto() {
	turnOver();
	battles.current = "enemies";
	actionLabel.text = "敌方开始行动";
	actionLabel.visible = true;
	actionLabel.fontColor = "FF0000FF";
	changeAttackerToReady();
	actionLabel.hide("collapse_b2t", 1000, function(data, e) {
		autoBattle();
	});
}
function changeAttackerToReady(tag) {
	for (var i = 0; i < griddata.length; i++) {
		griddata[i].status = "blank";
		if (Grid.getTeam(griddata[i]) == battles.current) {
			// 把战斗状态切换回来
			if (griddata[i].tag.battle.status == "over") {
				griddata[i].tag.battle.status = "ready";
			}
		}
	}
	gridview.fire("refreshData", griddata);
}
function initStatusBar() {
	mystatus = ui(ui("$").add("myStatus", "source://view/battle/pc_status.ui", 0, 574));
	enemystatus = ui(ui("$").add("enemyStatus", "source://view/battle/enemy_status.ui", 0, 1275));
	mystatus.fire("refresh", battles.us[0]);
	enemystatus.fire("refresh", battles.enemies[0]);

}
function initGrid() {
	griddata = Grid.init(battles);
	gridview = ui(ui("gridviewLayout").add("gridview", "source://view/battle/gridView.ui", 0, 0));
	gridview.fire("initData", griddata);
	print(Creature.getColorName(battles.us[0]) + "和" + Creature.getColorName(battles.enemies[0]) + "开始战斗...");
}
function initSpellLayout() {
	spellLayout = ui(ui("do_ALayout_3").add("spellLayout", "source://view/battle/spellLayout.ui"), 0, 0);
	spellLayout.fire("refresh", battles.me);
}
// 输出文字描述到webview组件
function print(_info) {
	ui("webview").eval("append(\"" + _info + "\")");
}