// ==UserScript==
// @name         weekly_test_result_export
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.wjx.cn/wjx/activitystat/viewstatsummary.aspx?activity=*
// @grant        none
// ==/UserScript==

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
	var txtArea = document.createElement("textarea");

	document.getElementsByTagName("body")[0].appendChild(txtArea);
    txtArea.style = "position: fixed; bottom: 0px; left: 0px; right: 0px; margin: 0px auto; width: 300px; height: 100px;";
	txtArea.value = str;
	txtArea.focus();
	txtArea.select();
	document.execCommand("copy");
	//document.getElementsByTagName("body")[0].removeChild(txtArea);
})();
