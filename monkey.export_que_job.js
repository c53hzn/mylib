// ==UserScript==
// @name         Export que job result
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.somewebsite.com
// @grant        none
// ==/UserScript==

(function() {
    if(typeof(jQuery) == "undefined"){
        var script = document.createElement("script");
        script.setAttribute("src","https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js");
        document.body.appendChild(script);
        setTimeout(getTable, 300);
    } else {
        setTimeout(getTable, 0);
    }

    function getTable() {
        var page_count = JSON.parse(localStorage.getItem("page_count")) || 1;

        var curr_page = $(".active.btn_goto").eq(0).text();
        var table = $(".listingtable");

        var trs = $(table).children("tbody").children();
        var header_arr = [];
        for (let j = 0; j < trs[0].children.length; j++) {
            header_arr.push($(trs[0]).children().eq(j).text());
        }
        var output_arr = [];
        for (let i = 1; i < trs.length; i++){
            let row_obj = {};
            row_obj["Page"] = "Page " + curr_page;
            for (let k = 0; k < header_arr.length; k++) {
                row_obj[header_arr[k]] = $(trs[i]).children().eq(k).text();
            }
            // row_obj["failure detail"] = $(trs[i]).children().eq(2).children().attr("title") || "-";
            output_arr.push(row_obj);
        }
        var lastResult_arr = JSON.parse(localStorage.getItem("Data_export")) || [];
        var newResult_arr = lastResult_arr.concat(output_arr);

        if (page_count % 2 == 0) {
            var script2 = document.createElement("script");
            script2.setAttribute("src","https://www.csvjson.com/js/csvjson.min.js?v=0.294");
            document.body.appendChild(script2);

            setTimeout(function() {
                var output_str = CSVJSON.json2csv(newResult_arr);
                // output_str = output_str.replace(/^\".+\n/, "");//delete header row
                let filename = "p" + prependZero(curr_page, 4);
                clickDownload(output_str, filename);
                localStorage.removeItem("Data_export");
                goToNextPage();
            }, 1500);
            
        } else {
            localStorage.setItem("Data_export",JSON.stringify(newResult_arr));
            goToNextPage();
        }

        page_count++;
        console.log("curr_page is " + curr_page + "\npage_count is " + page_count);
        localStorage.setItem("page_count", JSON.stringify(page_count));
        localStorage.setItem("curr_page", JSON.stringify(curr_page));

        function goToNextPage() {
            setTimeout(function(){
                if (page_count < 6) {
                    $(".next.btn_goto").eq(0).click();
                }
            }, 500);
        }
    }
})();


function clickDownload(str, filename) {
    var encodedStr = encodeURIComponent(str + "\n");
    var aLink = document.createElement("a");
    //↓ \ufeff causes empty string in beginning
    //aLink.href = "data:text/csv;charset=utf-8,\ufeff" + encodedStr;
    aLink.href = "data:text/csv;charset=utf-8," + encodedStr;
    aLink.download = filename + ".csv";
    aLink.click();
}

function fullDate(){
    function addZero(a){
        if(a < 10){
            return "0" + a;
        }else{
            return a;
        }
    }
    var timeNew = new Date();
    var year = timeNew.getFullYear();
    var month = addZero(timeNew.getMonth() + 1);
    var date = addZero(timeNew.getDate());
    return year + "-" + month + "-" + date;
}

function prependZero(num, digit) {
    var num_str = String(num);
    var zero_len = digit - num_str.length;
    var zero_str = "";
    for (let i = 0; i < zero_len; i++) {
        zero_str += "0";
    }
    return zero_str + num_str;
}

// $("table").mouseenter(function() {
// 	$(this).find("td").css("background-color", "rgba(247,182,182,0.5)");
// });
// $("table").mouseleave(function() {
// 	$(this).find("td").removeAttr("style");
// });
