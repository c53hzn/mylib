// ==UserScript==
// @name         weekly_test_result_export
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.wjx.cn/wjx/activitystat/viewstatsummary.aspx?activity=*
// @grant        none
// ==/UserScript==

/*
*使用前需在sessionStorage里设定idx_now为0
*设置data_saved为""
*设置excec_list为以\n分隔的字符串，直接从Excel复制即可
*/

(function() {
    'use strict';
	var test_id = document.getElementById("selectpick-span-ddlActivitynew").innerText;
	var table = document.getElementById("ctl02_ContentPlaceHolder1_ViewStatSummary1_noempty");
	var trs = table.children[0].children[0].children[1].children;
	var output_html = "";
	for (let i = 0; i < trs.length; i++){
		output_html += "<tr><td>" + test_id + "</td>";
		output_html += "<td>" + trs[i].children[3].innerText + "</td>";
		output_html += "<td>" + trs[i].children[4].innerText + "</td>";
		output_html += "<td>" + trs[i].children[5].innerText + "</td>";
		output_html += "<td>" + trs[i].children[9].innerText + "</td></tr>";
	}
	var str = "<table><tbody>" + output_html + "</tbody></table>";
	//从会话缓存获取事先输入的信息
	var data_saved = sessionStorage.getItem("data_saved");
	var idx_now = sessionStorage.getItem("idx_now");
	var excec_list = sessionStorage.getItem("excec_list");
	//给会话缓存添加信息
	data_saved += str;
	sessionStorage.setItem("data_saved", data_saved);
	//给执行清单增加进度
	idx_now++;
	sessionStorage.setItem("idx_now", idx_now);
	//清单没执行完的话500毫秒之后去下一个页面
	var excec_list_arr = excec_list.split("\n");
	if (idx_now != excec_list_arr.length) {
		setTimeout(function() {
			window.location.href = excec_list_arr[idx_now];
		},500);
	}

	/*以下是可以直接复制内容而不显示过程的代码*/
	/*但是如果用了sessionStorage + Tampermonkey就不需要物理复制了*/
	// document.getElementsByTagName("body")[0].appendChild(txtArea);
	// txtArea.style = "position: fixed; bottom: 0px; left: 0px; right: 0px; margin: 0px auto; width: 300px; height: 100px;";
	// txtArea.value = str;
	// txtArea.focus();
	// txtArea.select();
	// document.execCommand("copy");
	// document.getElementsByTagName("body")[0].removeChild(txtArea);
})();
