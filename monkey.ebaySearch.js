// ==UserScript==
// @name         eBay_search_and_output
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Jenny HOU
// @match        https://www.ebay.com/sch/*
// @grant        none
// ==/UserScript==

(function(){

var aptx_css_str =
	"#nav-icon{\r\n\tposition: fixed;\r\n\ttop: 4px;\r\n\tleft: 4px;\r\n\twidth: 30px;\r\n\theight: 30px;\r\n\tfont-size: 24px;\r\n\tline-height: 30px;\r\n\ttext-align: center;\r\n\tborder-radius: 5px;\r\n\tbackground: white;\r\n\tbox-shadow: 0px 1px 2px gray;\r\n\tcursor: pointer;\r\n\tz-index: 99999;\r\n}\r\n#nav-mask{\r\n\tposition: fixed;\r\n\ttop: 0px;\r\n\tleft: 0px;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tbackground: gray;\r\n\topacity: 0.5;\r\n\tz-index: 998;\r\n\tdisplay: none;\r\n}\r\n#navbar{\r\n\tposition: fixed;\r\n\ttop: 0px;\r\n\tleft: -240px;\r\n\twidth: 240px;\r\n\theight: 100%;\r\n\tborder-right: 2px solid silver;\r\n\tbackground: rgba(255,255,255,0.75);\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tz-index: 999;\r\n}\r\n#navbar header{\r\n\tmargin: 0px 10px;\r\n}\r\n#aptx_txtarea{\r\n\tmargin: 10px auto;\r\n\twidth: 215px;\r\n\theight: 400px;\r\n\tresize: none;\r\n}\r\n#aptx_read{\r\n\tmargin: 0px auto auto 10px;\r\n}\r\n#aptx_box{\r\n\tposition: fixed;\r\n\ttop: 0px;\r\n\tright: -300px;\r\n\tpadding-left: 10px;\r\n\twidth: 300px;\r\n\theight: 100%;\r\n\tbackground: rgba(255,255,255,0.75);\r\n\tz-index: 99999;\r\n\toverflow: hidden;\r\n}\r\n#aptx_box p{\r\n\tmargin: 4px auto;\r\n}\r\n#aptx_table_div{\r\n\tmargin-top: 10px;\r\n\twidth: 100%;\r\n\theight: 500px;\r\n\toverflow: scroll;\r\n}\r\n#aptx_table_div table{\r\n\tborder-collapse: collapse;\r\n}\r\n#aptx_table_div th, #aptx_table_div td{\r\n\tfont-size: 12px;\r\n\tborder: 1px solid black;\r\n}\r\n.aptx_searched{\r\n\tcolor: lightgreen;\r\n\tfont-weight: bold;\r\n\tbackground: rgba(0,0,0,0.5)\r\n}\r\n#navbar button, #aptx_box button{\r\n\tpadding: 1px 6px;\r\n\tborder: 2px outset buttonface;\r\n}\r\n#gh-bt{z-index: 99999;\r\n\tborder: 1px solid gray}";
var aptx_DOM_str =
	'<div id=\"nav-icon\">\u2630<\/div>\r\n<div id=\"nav-mask\"><\/div>\r\n<nav id=\"navbar\">\r\n\t<header> \r\n\t\t<p>&nbsp;<\/p>\r\n\t\t<h2>Search in bulk<\/h2>\r\n\t\t<p>One product per line<\/p>\r\n\t<\/header>\r\n\t<textarea id=\"aptx_txtarea\"><\/textarea>\r\n\t<button id=\"aptx_read\">Start searching<\/button>\r\n<\/nav>\r\n\r\n<div id=\"aptx_box\">\r\n\t<div id=\"aptx_table_div\">\r\n\t\t<table id=\"aptx_table\">\r\n\t\t\t<tbody>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<th>Index<\/th>\r\n\t\t\t\t\t<th>Product<\/th>\r\n\t\t\t\t\t<th>item_ID_01<\/th>\r\n\t\t\t\t\t<th>price_01<\/th>\r\n\t\t\t\t\t<th>item_ID_02<\/th>\r\n\t\t\t\t\t<th>price_02<\/th>\r\n\t\t\t\t\t<th>item_ID_03<\/th>\r\n\t\t\t\t\t<th>price_03<\/th>\r\n\t\t\t\t\t<th>item_ID_04<\/th>\r\n\t\t\t\t\t<th>price_04<\/th>\r\n\t\t\t\t<\/tr>\r\n\t\t\t<\/tbody>\r\n\t\t<\/table>\r\n\t<\/div>\r\n\t<p>\r\n\t\t<span style=\"font-size: 12px;\">Current index: <\/span>\r\n\t\t<input id=\"aptx_last_SKU_index\" disabled value=\"N\/A\" type=\"text\" style=\"width: 50px;\" \/>\r\n\t<\/p>\r\n\t<p>\r\n\t\t<span style=\"font-size: 12px;\">Index to be searched: <\/span>\r\n\t\t<input type=\"number\" id=\"aptx_SKU_index\" style=\"width: 50px;\" min=\"1\" value=\"1\"\/>\r\n\t<\/p>\r\n\t<p>\r\n\t\t<button id=\"aptx_search\">Search<\/button>\r\n\t\t<button id=\"aptx_fill\">Fill<\/button>\r\n\t\t<button id=\"aptx_copy\">copy table<\/button>\r\n\t<\/p>\r\n\t<\/p>\r\n\t<p>\r\n\t\t<button id=\"aptx_auto_search\">Auto search and fill<\/button>\r\n\t\t<button id=\"aptx_stop\">Stop<\/button>\r\n\t<\/p>\r\n<\/div>';
$(document).ready(function() {
	var newStyle = document.createElement("style");
	newStyle.innerHTML = aptx_css_str;
	var newDiv = document.createElement("div");
	newDiv.innerHTML = aptx_DOM_str;
	$("body").append(newStyle);
	$("body").append(newDiv);
	//刷新页面仍保持功能区打开
	if (sessionStorage.getItem("lastSearchExist")) {
		$("#navbar").css("left", "0");
		$("#aptx_box").css("right", "0");
		$("#nav-mask").css("display", "block");
	}
	//刷新页面仍然显示上次的SKU
	if (sessionStorage.getItem("SKUstr")) {
		$("#aptx_txtarea").val(sessionStorage.getItem("SKUstr"));
	}
	$("#aptx_txtarea").on("keyup", function() {
		var SKUstr = $(this).val();
		sessionStorage.setItem("SKUstr", SKUstr);
	});
	//刷新页面仍然显示上次的表格
	if (sessionStorage.getItem("table_content")) {
		$("#aptx_table tbody").html(sessionStorage.getItem("table_content"));
	}
	//刷新页面仍然显示上次的SKU序号
	if (sessionStorage.getItem("SKU_index")) {
		$("#aptx_SKU_index").val(sessionStorage.getItem("SKU_index"));
	}
	//刷新页面时刚才搜过的SKU所在行绿色加粗
	if (sessionStorage.getItem("last_SKU_index")) {
		let last_SKU_index = sessionStorage.getItem("last_SKU_index");
		$("#aptx_table tr").eq(last_SKU_index).addClass("aptx_searched");
		$("#aptx_table tr").eq(last_SKU_index).siblings().removeClass("aptx_searched");
		$("#aptx_last_SKU_index").val(sessionStorage.getItem("last_SKU_index"));
	}

	//给左上角按钮添加打开和关闭功能区事件
	$("#nav-icon").click(function() {
		if ($("#navbar").position().left == -240) {
			$("#navbar").animate({left: "0"},"slow");
			$("#aptx_box").animate({right: "0"},"slow");
			$("#nav-mask").css("display", "block");
			sessionStorage.setItem("lastSearchExist", "bbb");
		} else {
			$("#navbar").animate({left: "-240"},"slow");
			$("#aptx_box").animate({right: "-300"},"slow");
			$("#nav-mask").css("display", "none");
			sessionStorage.removeItem("lastSearchExist");
		}
	});

	//给遮罩层添加关闭功能区事件
	$("#nav-mask").click(function() {
		$("#navbar").animate({left: "-240"},"slow");
		$("#aptx_box").animate({right: "-300"},"slow"
		);
		$("#nav-mask").css("display", "none");
		sessionStorage.removeItem("lastSearchExist");
	});

	/*解析SKU到表格开始*/
	$("#aptx_read").click(function() {
		$("#aptx_last_SKU_index").val("N/A");
		var thead = $("#aptx_table tbody").children().eq(0);
		$("#aptx_table tbody").html("");
		$("#aptx_table tbody").append(thead);
		var SKUstr = $("#aptx_txtarea").val();
		var SKUstr2 = SKUstr.replace(/\n+$/, "");
		var SKUs = SKUstr2.split("\n");
		var k = 1;
		var SKUs2 = [];
		for (let i = 0; i < SKUs.length; i++) {
			if (SKUs[i]) {
				let tr = document.createElement("tr");
				let tempStr = "\t<td>" + k + "</td>\n\t<td>" + SKUs[i] + "</td>\n";
				for (let j = 0; j < $("#aptx_table th").length - 2; j++) {
					tempStr += "\t<td></td>\n";
				}
				tr.innerHTML = tempStr;
				$("#aptx_table tbody").append(tr);
				SKUs2.push(SKUs[i]);
				k++;
			}
		}
		$("#aptx_SKU_index").val(1);
		$("#aptx_last_SKU_index").val("N/A");
		sessionStorage.setItem("SKU_index", 1);
		sessionStorage.setItem("SKUs", SKUs);
		sessionStorage.removeItem("last_SKU_index");
		saveTable();
	});
	/*解析SKU到表格结束*/

	/*限制SKU_index数值开始*/
	function moderateSKUindex() {
		var SKUlen = $("#aptx_table tr").length - 1;
		if ($("#aptx_SKU_index").val() < 1) {
			$("#aptx_SKU_index").val(1);
		} else if ($("#aptx_SKU_index").val() > SKUlen) {
			$("#aptx_SKU_index").val(SKUlen);
		}
		sessionStorage.setItem("SKU_index", $("#aptx_SKU_index").val());
	}
	$("#aptx_SKU_index").on("keyup", function() {
		moderateSKUindex();
	});
	$("#aptx_SKU_index").on("mouseup", function() {
		moderateSKUindex();
	});
	$("#aptx_SKU_index").on("change", function() {
		moderateSKUindex();
	});
	/*限制SKU_index数值结束*/

	/*搜索SKU开始*/
	$("#aptx_search").click(function() {
		//last searched SKU index
		var last_SKU_index = Number($("#aptx_SKU_index").val());
		var SKU_index = last_SKU_index + 1;
		var SKUlen = $("#aptx_table tr").length - 1;
		/*
		*理论上说已经不可以输入SKU index范围外的数字
		*但还是可以用JavaScript强行更改SKU index
		*此时强制SKU index跳到最大值，不执行搜索
		*/
		if(last_SKU_index > 0 && last_SKU_index <= SKUlen){
			//搜索...
			var currURL = window.location.href;
			var currURLarr = currURL.split("&");
			var SKUs = sessionStorage.getItem("SKUs").split(",");
			var currIndex = $("#aptx_SKU_index").val();
			for(let i = 0; i < currURLarr.length; i++){
				if(/_nkw=/.test(currURLarr[i])){
					currURLarr[i] = "_nkw=" + SKUs[currIndex - 1];
					break;
				}
			}
			var newURL = currURLarr.join("&");
			
			sessionStorage.setItem("last_SKU_index", last_SKU_index);
			$("#aptx_last_SKU_index").val(last_SKU_index);
			$("#aptx_table tr").eq(last_SKU_index).addClass("aptx_searched");
			$("#aptx_table tr").eq(last_SKU_index).siblings().removeClass("aptx_searched");
			//index++
			
			if (SKU_index <= SKUlen) {
				$("#aptx_SKU_index").val(SKU_index);
				sessionStorage.setItem("SKU_index", SKU_index);
			} else {
				$("#aptx_SKU_index").val(SKUlen);
				sessionStorage.setItem("SKU_index", SKUlen);
			}
			//转到搜索结果页面
			window.location.href = newURL;
		}else{
			$("#aptx_SKU_index").val(SKUlen);
			sessionStorage.setItem("SKU_index", SKUlen);
		}	
	});
	/*搜索SKU结束*/

	/*填充表格开始*/
	$("#aptx_fill").click(function(){
		var last_SKU_index = $("#aptx_last_SKU_index").val();
		//当前有根据SKU搜索的结果才会执行填充
		if(last_SKU_index != "N/A"){
			var items = $("#ListViewInner").children("li");
			var itemsInfo = {};
			var tds = "";
			for(let i = 0; i < 4; i++){
				let itemId = $(items[i]).attr("listingid");
				let itemTitle = $(items[i]).children("h3.lvtitle").children("a").html();
				let itemPicURLtemp = $(items[i]).children("div.lvpic").children(".lvpicinner").children("a").children("img").attr("src");
				let itemPicURLarr = itemPicURLtemp.split("/");
				let itemPicURL = "https://i.ebayimg.com/images/g/" + itemPicURLarr[6] + "/s-l1600.jpg";
				let itemPriceTemp = $(items[i]).children("ul.lvprices").children("li.lvprice").children("span").text();
				let itemPrice = itemPriceTemp.replace(/(\$|\t|\n)/g,"");
				let tempObj = {"id":itemId, "title":itemTitle, "picture":itemPicURL, "price":itemPrice};
				itemsInfo[i] = tempObj;
				tds += "<td>" + itemId + "</td><td>" + itemPrice + "</td>";
			}
			var firstTwoTds = "<td>" + last_SKU_index + "</td><td>" + $("#aptx_table tr").eq(last_SKU_index).children().eq(1).html() + "</td>";
			var trContent = firstTwoTds + tds;
			$("#aptx_table tr").eq(last_SKU_index).html(trContent);
			sessionStorage.setItem("itemsInfo", JSON.stringify(itemsInfo));
			saveTable();
		}else{
			alert("Please search products first!");
		}
	});
	/*填充表格结束*/

	/*复制表格到剪贴板开始*/
	$("#aptx_copy").click(function() {
		var copyText = document.getElementById("aptx_table_div").innerHTML;
		var copyText2 = copyText.replace(/th>/g, "td>");
		var txtArea = document.createElement("textarea");
		document.getElementsByTagName("body")[0].appendChild(txtArea);
		txtArea.innerText = copyText2;
		txtArea.focus();
		txtArea.select();
		document.execCommand("copy");
		document.getElementsByTagName("body")[0].removeChild(txtArea);
	});
	/*复制表格到剪贴板结束*/

	/*保存表格内容到sessionStorage*/
	function saveTable(){
		var table_content1 = $("#aptx_table tbody").html();
		var table_content2 = table_content1.replace(/\t+/g, "\t");
		var table_content3 = table_content2.replace(/<\/tr><tr>/g, "</tr>\n<tr>\n");
		var table_content = table_content3.replace(/\t<\/tr>/g, "</tr>");
		sessionStorage.setItem("table_content", table_content);
	}

	/*自动搜索SKU并填充到表格，间隔5秒执行下一个SKU*/
	var search_timer;
	$("#aptx_auto_search").click(function(){
		//在sessionStorage储存一个识别自动搜索的变量
		sessionStorage.setItem("aptx_auto_search","true");
		//触发搜索即可
		$("#aptx_search").trigger("click");
	});
	var isAutoSearchPresent = sessionStorage.getItem("aptx_auto_search");
	var isSearchEnded = $("#aptx_last_SKU_index").val() == $("#aptx_table tr").length - 1;
	if(isAutoSearchPresent && !isSearchEnded){
		search_timer = setTimeout(function(){
			$("#aptx_fill").trigger("click");
			$("#aptx_search").trigger("click");
		},3000);
	}else if(isSearchEnded){
		setTimeout(function(){
			$("#aptx_fill").trigger("click");
		},3000);
	}
	/*自动搜索SKU并填充到表格，间隔5秒执行下一个SKU*/

	/*清除自动搜索的定时器开始*/
	$("#aptx_stop").click(function(){
		clearTimeout(search_timer);
		sessionStorage.removeItem("aptx_auto_search");
	});
	/*清除自动搜索的定时器结束*/
});
})();
