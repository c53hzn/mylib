// ==UserScript==
// @name         ebay_fitment_download
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://frame.ebay.com/ebaymotors/ws/eBayISAPI.dll?GetFitmentData*
// @match        https://frame.ebay.com.au/ws/eBayISAPI.dll?GetFitmentData*
// @match        https://frame.ebay.de/ws/eBayISAPI.dll?GetFitmentData*

// @grant        none
// ==/UserScript==

;(function(){
	// fitment API https://frame.ebay.com/ebaymotors/ws/eBayISAPI.dll?GetFitmentData
	// must go to API page to use the following codes
	var script = document.createElement("script");
	script.setAttribute("src","https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js");
	document.body.appendChild(script);
	console.log("jQuery is added");
	setTimeout(addDOM, 300);
})();

function addDOM() {
	$("body").html("<div><textarea id=\"txtArea\" style=\"width: 500px; height: 300px;\" placeholder=\"one item ID per line\"></textarea><br><input id=\"getInputBtn\" type=\"button\" value=\"input item IDs\"></div><hr style=\"margin-top: 20px; margin-bottom: 10px;\"><p><input type=\"text\" placeholder=\"Item ID\"><input class=\"downloadBtn\" type=\"button\" value=\"download\">&nbsp;&nbsp;<span class=\"removeBtn\" style=\"user-select: none; border: 1px solid gray; cursor: pointer; display: none;\">－</span></p><p><span id=\"addItmID\" style=\"user-select: none; border: 1px solid gray; cursor: pointer;\">＋</span></p>");
	$("body").on("click","input.downloadBtn",function(){
        console.log($("p").index($(this).parent()));
		if (/^\d{12}$/.test($(this).prev().val())) {
			var itemID = $(this).prev().val();
            var reqURL = "";
            if (/ebay\.de/.test(window.location.href)) {
                reqURL = "eBayISAPI.dll?GetFitmentData&rand=1550745386800&site=77&vs=77&req=2&ct=20&item="
            } else if (/ebay\.com\//.test(window.location.href)){
                reqURL = "eBayISAPI.dll?GetFitmentData&rand=1550668471611&site=100&vs=0&req=2&ct=20&item=";
            } else if (/ebay\.com\.au/.test(window.location.href)){
                reqURL = "eBayISAPI.dll?GetFitmentData&rand=1550747855792&site=15&vs=15&req=2&ct=20&item=";
            }
			$.getJSON(reqURL + itemID, function(res){
				console.log(res);
				if (!res.status) {
					alert("no data");
				} else if (res.status.name == "SUCCESS") {
					var data = res.data;
					var displayName = res.displayNames;
					var propName = res.propertyNames;
					var output = "";
                    if (/ebay\.de/.test(window.location.href)) {
                        output += "\"Notes\",";
                        for (let i = 1; i < propName.length; i++) {
                            output += "\"" + propName[i] + "\",";
                        }
                    } else {
                        for (let i = 0; i < displayName.length; i++) {
                            output += "\"" + displayName[i] + "\",";
                        }
                    }
					output = output.replace(/,$/, "\r\n");
					for (let j = 0; j < data.length; j++) {
						for (let k = 0; k < propName.length; k++) {
							output += "\"" + data[j][propName[k]] + "\",";
						}
						output = output.replace(/,$/, "\r\n");
					}
					downloadData(output, itemID + "-fitment.csv");
				}
			});
		} else {
			alert("Please input a valid item ID!");
		}
	});
    $("body").on("click", "#addItmID", function() {
        $("p:last").before("<p><input type=\"text\" placeholder=\"Item ID\"><input class=\"downloadBtn\" type=\"button\" value=\"download\">&nbsp;&nbsp;<span class=\"removeBtn\" style=\"user-select: none; border: 1px solid gray; cursor: pointer; display: none;\">－</span></p>");
        if ($("p").length > 2) {
            $.map($("span.removeBtn"), function(el) {
                $(el).css("display", "inline-block");
            });
        }
    });
    $("body").on("click", "span.removeBtn", function() {
        console.log($(this).parent().index());
        $(this).parent().remove();
        if ($("p").length < 3) {
            $("span.removeBtn").css("display", "none");
        }
    });
    $("body").on("click", "#getInputBtn", function() {
        $("p").remove();
        var itmIDs = $("#txtArea").val().split("\n");
        if (itmIDs.length == 1) {
            $("body").append("<p><input type=\"text\" placeholder=\"Item ID\" value=\"" + itmIDs[0] + "\"><input class=\"downloadBtn\" type=\"button\" value=\"download\">&nbsp;&nbsp;<span class=\"removeBtn\" style=\"user-select: none; border: 1px solid gray; cursor: pointer; display: none;\">－</span></p><p><span id=\"addItmID\" style=\"user-select: none; border: 1px solid gray; cursor: pointer;\">＋</span></p>");
        } else {
            for (let i = 0; i < itmIDs.length; i++) {
                $("body").append("<p><input type=\"text\" placeholder=\"Item ID\" value=\"" + itmIDs[i] + "\"><input class=\"downloadBtn\" type=\"button\" value=\"download\">&nbsp;&nbsp;<span class=\"removeBtn\" style=\"user-select: none; border: 1px solid gray; cursor: pointer;\">－</span></p>");
            }
            $("body").append("<p><span id=\"addItmID\" style=\"user-select: none; border: 1px solid gray; cursor: pointer;\">＋</span></p>");
        }
    });
}

function downloadData(data, filename) {
	var encodedUri = "data:text/csv;charset=utf-8," + encodeURI(data);
	var link = document.createElement("a");
	link.href = encodedUri;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
