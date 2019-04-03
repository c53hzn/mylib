// ==UserScript==
// @name         catnip
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://likexia.gitee.io/cat-zh/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var myTimer;
	function clickCatnip() {
		for (let i = 0; i < 100; i++) {
            if ($(".btn.nosel.modern").eq(0).children().children().html() === "采集猫薄荷") {
                $(".btn.nosel.modern").eq(0).click();
            } else {
                $("#auto_collect").html("开启自动采集猫薄荷");
                clearTimeout(myTimer);
                return;
            }
		}
		myTimer = setTimeout(clickCatnip,50);
	}
	$("body").append("<div id=\"auto_collect_div\" style=\"user-select: none; position: fixed; left: 10px; bottom: 40px; cursor: pointer;\"><span id=\"auto_a\" style=\"border: 1px solid green; color: green; background: white; border-radius: 4px; display: none;\">自动采集只在篝火选项卡有效，切换选项卡将导致自动采集无效，需回到篝火选项卡重新开启</span><br><span id=\"auto_collect\" style=\"border: 1px solid green; color: green; background: white; border-radius: 4px;\">开启自动采集猫薄荷</span>&nbsp;<span id=\"auto_q\" style=\"color: green; border: 1px solid green; border-radius: 50%; background: white;\">&nbsp;?&nbsp;</span></div>");

	window.isBtnDown = false;
	var time_holdStart;
	var time_holdEnd;
	var time_mouseHold;
	var mouse_X, mouse_Y;
	var mousemove_X, mousemove_Y;
	var left_val = Number($("#auto_collect_div").css("left").replace("px", ""));
	var bottom_val = Number($("#auto_collect_div").css("bottom").replace("px", ""));

	$("#auto_collect").mousedown(function(e) {
		window.isBtnDown = true;
		time_holdStart = new Date();
		mouse_X = e.clientX;
		mouse_Y = e.clientY;
		left_val = Number($("#auto_collect_div").css("left").replace("px", ""));
		bottom_val = Number($("#auto_collect_div").css("bottom").replace("px", ""));
		
	});
	$(window).mousemove(function(e) {
		if(window.isBtnDown) {
			mousemove_X = e.clientX;
			mousemove_Y = e.clientY;
			$("#auto_collect_div").css("left", (left_val + mousemove_X - mouse_X));
			$("#auto_collect_div").css("bottom", (bottom_val + mouse_Y - mousemove_Y));
			$("#auto_collect").css("border-width", 3);
		} else {
			return;
		}
	});
	$(window).mouseup(function() {
		if (window.isBtnDown) {
			window.isBtnDown = false;
			time_holdEnd = new Date();
			time_mouseHold = time_holdEnd - time_holdStart;
			if (time_mouseHold < 500) {
				if ($("#auto_collect").html() === "开启自动采集猫薄荷") {
		            $("#auto_collect").html("关闭自动采集猫薄荷");
					clickCatnip();
				} else {
		            $("#auto_collect").html("开启自动采集猫薄荷");
					clearTimeout(myTimer);
				}
			}
			$("#auto_collect").css("border-width", 1);
		} else {
			return;
		}
	});
	$("#auto_q").mouseenter(function() {
		$("#auto_a").css("display", "block");
	});
	$("#auto_q").mouseleave(function() {
		$("#auto_a").css("display", "none");
	});
})();
