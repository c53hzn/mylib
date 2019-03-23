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
    }
    var script2 = document.createElement("script");
    script2.setAttribute("src","https://www.csvjson.com/js/csvjson.min.js?v=0.294");
    document.body.appendChild(script2);

    setTimeout(getTable, 2000);

    function getTable() {
        var page_count = JSON.parse(localStorage.getItem("page_count")) || 1;

        var curr_page = $(".active.btn_goto").eq(0).text();
        var table = $(".listingtable");

        var trs = $(table).children("tbody").children();
        var output_arr = [];
        for (let i = 1; i < trs.length; i++){
            let line_obj = {};
            line_obj["Page"] = "Page " + curr_page;
            line_obj["header_1"] = $(trs[i]).children().eq(0).text();
            line_obj["header_2"] = $(trs[i]).children().eq(1).text();
            line_obj["header_3"] = $(trs[i]).children().eq(2).text();
            line_obj["header_4"] = $(trs[i]).children().eq(3).text();
            line_obj["header_5"] = $(trs[i]).children().eq(4).text();
            output_arr.push(line_obj);
        }
        var lastResult_arr = JSON.parse(localStorage.getItem("Data_export")) || [];
        var newResult_arr = lastResult_arr.concat(output_arr);

        if (page_count % 2 == 0) {
            var output_str = CSVJSON.json2csv(newResult_arr);
            let filename = "p" + fourDigit_fy(curr_page);
            clickDownload(output_str, filename);
            localStorage.removeItem("Data_export");
        } else {
            localStorage.setItem("Data_export",JSON.stringify(newResult_arr));
        }
        goToNextPage();

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

function fourDigit_fy(a){
    if(a < 10){
        return "000" + a;
    } else if (a < 100) {
        return "00" + a;
    } else if (a < 1000) {
        return "0" + a;
    } else {
        return a;
    }
}
