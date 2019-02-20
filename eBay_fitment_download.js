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
	$("body").html("<p style=\"position: fixed; top: 0px; left: 0px;\"><input type=\"text\" id=\"itmID\" placeholder=\"Item ID\"><br><input type=\"button\" id=\"btn1\" value=\"download\"></p>");
	$("#btn1").click(function(){
		if (/^\d{12}$/.test($("#itmID").val())) {
			var itemID = $("#itmID").val();
			$.getJSON("eBayISAPI.dll?GetFitmentData&rand=1550668471611&site=100&vs=0&req=2&cid=33654&ct=20&item=" + itemID, function(res){
				console.log(res);
				if (!res.status) {
					alert("no data");
				} else if (res.status.name == "SUCCESS") {
					var data = res.data;
					var displayName = res.displayNames;
					var propName = res.propertyNames;
					var output = "";
					for (let i = 0; i < displayName.length; i++) {
						output += "\"" + displayName[i] + "\",";
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
