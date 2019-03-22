// ==UserScript==
// @name         Export que job result
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://auto.soldeazy.com/app/soldeazy/queue
// @grant        none
// ==/UserScript==

(function() {
	if(typeof(jQuery) != "undefined"){
        	console.log("no need to add jQuery again");
	}else{
		var script = document.createElement("script");
		script.setAttribute("src","https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js");
		document.body.appendChild(script);
		console.log("jQuery is added");
	}
	setTimeout(getTable, 100);

	function getTable() {
        var page_count = JSON.parse(localStorage.getItem("page_count")) || 501;
        var curr_page = $(".active.btn_goto").eq(0).text();
		var table = $(".listingtable");
		var trs = $(table).children("tbody").children();
		var output_html = "";
		for (let i = 1; i < trs.length; i++){
            output_html += "<tr><td>page " + curr_page + "</td>";
			output_html += "<td>" + trs[i].children[0].innerText + "</td>";
			output_html += "<td>" + trs[i].children[1].innerText + "</td>";
			output_html += "<td>" + trs[i].children[2].innerText + "</td>";
			output_html += "<td>" + trs[i].children[3].innerText + "</td>";
            output_html += "<td>" + trs[i].children[4].innerText + "</td>";
            output_html += "<td>" + trs[i].children[5].innerText + "</td>";
            output_html += "<td>" + trs[i].children[6].innerText + "</td>";
			output_html += "<td>" + trs[i].children[7].innerText + "</td></tr>";
		}
		var str = "<table><tbody>" + output_html + "</tbody></table>";
        var lastResult = JSON.parse(localStorage.getItem("que job result")) || "";
        var newResult = lastResult + str;
        localStorage.setItem("que job result",JSON.stringify(newResult));
        //$("body").append("<textarea id=\"txtArea\" style=\"position: fixed; bottom: 0px; left: 0px; right: 0px; margin: 0px auto; width: 300px; height: 100px;\"></textarea>");
        //$("#txtArea").val(JSON.parse(localStorage.getItem("que job result")));
        //$("#txtArea").focus();
        //$("#txtArea").select();
        //$("#txtArea").on("focus", function() {
        //	this.select();
        //});
        page_count++;
        console.log(curr_page + " is finished");
        localStorage.setItem("page_count",JSON.stringify(page_count));
        setTimeout(function(){
            if (page_count < 601) {
                $(".next.btn_goto").eq(0).click();
            }
        }, 500)
	}
})();
