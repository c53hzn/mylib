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
var aptx_css_str = "#nav-icon{\r\n\tposition: fixed;\r\n\ttop: 4px;\r\n\tleft: 4px;\r\n\twidth: 30px;\r\n\theight: 30px;\r\n\tfont-size: 24px;\r\n\tline-height: 30px;\r\n\ttext-align: center;\r\n\tborder-radius: 5px;\r\n\tbackground: white;\r\n\tbox-shadow: 0px 1px 2px gray;\r\n\tcursor: pointer;\r\n\tz-index: 99999;\r\n}\r\n#nav-mask{\r\n\tposition: fixed;\r\n\ttop: 0px;\r\n\tleft: 0px;\r\n\twidth: 100%;\r\n\theight: 100%;\r\n\tbackground: gray;\r\n\topacity: 0.5;\r\n\tz-index: 998;\r\n\tdisplay: none;\r\n}\r\n#navbar{\r\n\tposition: fixed;\r\n\ttop: 0px;\r\n\tleft: -240px;\r\n\twidth: 240px;\r\n\theight: 100%;\r\n\tborder-right: 2px solid silver;\r\n\tbackground: rgba(255,255,255,0.75);\r\n\tdisplay: flex;\r\n\tflex-direction: column;\r\n\tz-index: 999;\r\n}\r\n#navbar h2{\r\n\tmargin: 20px auto 10px 10px;\r\n}\r\n#aptx_txtarea{\r\n\tmargin: 10px auto;\r\n\twidth: 215px;\r\n\theight: 300px;\r\n\tresize: none;\r\n}\r\n#aptx_read{\r\n\tmargin: 0px auto 2px 10px;\r\n}\r\n#aptx_box{\r\n\tposition: fixed;\r\n\ttop: 0px;\r\n\tright: -300px;\r\n\tpadding-left: 10px;\r\n\twidth: 300px;\r\n\theight: 100%;\r\n\tbackground: rgba(255,255,255,0.75);\r\n\tz-index: 99999;\r\n\toverflow: hidden;\r\n}\r\n#navbar p, #aptx_box p{\r\n\tfont-size: 12px;\r\n}\r\n#navbar p{\r\n\tmargin: 2px auto 2px 10px;\r\n}\r\n#aptx_box p{\r\n\tmargin: 4px auto 4px 0px;\r\n}\r\n#navbar input[type=\"checkbox\"], #aptx_box input[type=\"checkbox\"]{\r\n\tmargin-left: 0px;\r\n}\r\n#aptx_table_div{\r\n\tmargin-top: 10px;\r\n\twidth: 100%;\r\n\theight: 356px;\r\n\toverflow: auto;\r\n}\r\n#aptx_table_div table{\r\n\tborder-collapse: collapse;\r\n}\r\n#aptx_table_div th, #aptx_table_div td{\r\n\tfont-size: 12px;\r\n\tborder: 1px solid black;\r\n}\r\n.aptx_searched{\r\n\tcolor: lightgreen;\r\n\tfont-weight: bold;\r\n\tbackground: rgba(0,0,0,0.5)\r\n}\r\n#navbar button, #aptx_box button{\r\n\tpadding: 1px 6px;\r\n\tborder: 2px outset buttonface;\r\n}\r\n#gh-bt{\r\n\tz-index: 99999;\r\n\tborder: 1px solid gray\r\n}";
var aptx_DOM_str = "<div id=\"nav-icon\">\u2630<\/div>\r\n<div id=\"nav-mask\"><\/div>\r\n<nav id=\"navbar\">\r\n\t<header> \r\n\t\t<p>&nbsp;<\/p>\r\n\t\t<h2>Search in bulk<\/h2>\r\n\t\t<p>One product per line<\/p>\r\n\t<\/header>\r\n\t<textarea id=\"aptx_txtarea\"><\/textarea>\r\n\t<button id=\"aptx_read\">Start searching<\/button>\r\n\t<p>Data needed: <\/p>\r\n\t<p>\r\n\t\t<label for=\"aptx_sch_id\"><input type=\"checkbox\" id=\"aptx_sch_id\"\/>Item ID<\/label>\r\n\t\t<label for=\"aptx_sch_title\"><input type=\"checkbox\" id=\"aptx_sch_title\"\/>Title<\/label>\r\n\t\t<label for=\"aptx_sch_price\"><input type=\"checkbox\" id=\"aptx_sch_price\"\/>Price<\/label>\r\n\t\t<label for=\"aptx_sch_picURL\"><input type=\"checkbox\" id=\"aptx_sch_picURL\"\/>Pic URL<\/label>\r\n\t<\/p>\r\n\t<p>\r\n\t\t<label for=\"aptx_sch_picIMG\"><input type=\"checkbox\" id=\"aptx_sch_picIMG\"\/>Pic itself<\/label>\r\n\t<\/p>\r\n\t<p title=\"max 10 items\">\r\n\t\t<span style=\"cursor: default\">No. of items in result: <\/span>\r\n\t\t<input id=\"aptx_sch_num\" type=\"number\" min=\"1\" max=\"10\" value=\"1\"\/>\r\n\t<\/p>\r\n<\/nav>\r\n\r\n<div id=\"aptx_box\">\r\n\t<div id=\"aptx_table_div\">\r\n\t\t<table id=\"aptx_table\">\r\n\t\t\t<tbody>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<th width=\"280\" height=\"340\">Data area<\/th>\r\n\t\t\t\t<\/tr>\r\n\t\t\t<\/tbody>\r\n\t\t<\/table>\r\n\t<\/div>\r\n\t<p>\r\n\t\t<span style=\"font-size: 12px;\">Current index: <\/span>\r\n\t\t<input id=\"aptx_last_SKU_index\" disabled value=\"N\/A\" type=\"text\" style=\"width: 50px;\" \/>\r\n\t<\/p>\r\n\t<p>\r\n\t\t<label for=\"aptx_res_id\"><input disabled type=\"checkbox\" id=\"aptx_res_id\"\/>Item ID<\/label>\r\n\t\t<label for=\"aptx_res_title\"><input disabled type=\"checkbox\" id=\"aptx_res_title\"\/>Title<\/label>\r\n\t\t<label for=\"aptx_res_price\"><input disabled type=\"checkbox\" id=\"aptx_res_price\"\/>Price<\/label>\r\n\t\t<label for=\"aptx_res_picURL\"><input disabled type=\"checkbox\" id=\"aptx_res_picURL\"\/>Pic URL<\/label>\r\n\t\t<label for=\"aptx_res_picIMG\"><input disabled type=\"checkbox\" id=\"aptx_res_picIMG\"\/>Pic itself<\/label>\r\n\t<\/p>\r\n\t<p title=\"max 10 items\">\r\n\t\t<span style=\"cursor: default\">No. of items in result: <\/span>\r\n\t\t<input id=\"aptx_res_num\" style=\"width: 50px;\" disabled value=\"N\/A\"\/>\r\n\t<\/p>\r\n\t<p>\r\n\t\t<span style=\"font-size: 12px;\">Search index: <\/span>\r\n\t\t<input type=\"number\" id=\"aptx_SKU_index\" style=\"width: 50px;\" min=\"1\" value=\"1\"\/>\r\n\t<\/p>\r\n\t<p>\r\n\t\t<button id=\"aptx_search\">Search<\/button>\r\n\t\t<button id=\"aptx_fill\">Fill<\/button>\r\n\t\t<button id=\"aptx_copy\">copy table<\/button>\r\n\t<\/p>\r\n\t<\/p>\r\n\t<p>\r\n\t\t<button id=\"aptx_auto_search\">Auto search and fill<\/button>\r\n\t\t<button id=\"aptx_stop\">Stop<\/button>\r\n\t<\/p>\r\n<\/div>";
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
	$("#aptx_txtarea").on("input", function() {
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
	//刷新页面仍显示search_profile
	if (sessionStorage.getItem("search_profile")) {
		let search_profile = JSON.parse(sessionStorage.getItem("search_profile"));
		if (search_profile.item_ID) {
			$("#aptx_sch_id").prop("checked",true);
		}
		if (search_profile._title) {
			$("#aptx_sch_title").prop("checked",true);
		}
		if (search_profile.price) {
			$("#aptx_sch_price").prop("checked",true);
		}
		if (search_profile.picURL) {
			$("#aptx_sch_picURL").prop("checked",true);
		}
		if (search_profile.picIMG) {
			$("#aptx_sch_picIMG").prop("checked",true);
		}
		$("#aptx_sch_num").val(search_profile.num_of_item);
	}
	//刷新页面仍显示export_profile
	if (sessionStorage.getItem("export_profile")) {
		let export_profile = JSON.parse(sessionStorage.getItem("export_profile"));
		if (export_profile.item_ID) {
			$("#aptx_res_id").prop("checked",true);
		}
		if (export_profile._title) {
			$("#aptx_res_title").prop("checked",true);
		}
		if (export_profile.price) {
			$("#aptx_res_price").prop("checked",true);
		}
		if (export_profile.picURL) {
			$("#aptx_res_picURL").prop("checked",true);
		}
		if (export_profile.picIMG) {
			$("#aptx_res_picIMG").prop("checked",true);
		}
		$("#aptx_res_num").val(export_profile.num_of_item);
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

	/*处理search_profile开始*/
	var search_profile;
	if(!sessionStorage.getItem("search_profile")){
		search_profile = {"item_ID":false, "title":false, "price":false, "picURL":false, "picIMG":false, "num_of_item":1};
	} else {
		search_profile = JSON.parse(sessionStorage.getItem("search_profile"));
	}
	
	$("#aptx_sch_id").on("change",function(){
		if($("#aptx_sch_id").prop("checked") == true){
			search_profile.item_ID = true;
			sessionStorage.setItem("search_profile",JSON.stringify(search_profile));
		} else {
			search_profile.item_ID = false;
			sessionStorage.setItem("search_profile",JSON.stringify(search_profile));
		}
	});
	$("#aptx_sch_title").on("change",function(){
		if($("#aptx_sch_title").prop("checked") == true){
			search_profile._title = true;
			sessionStorage.setItem("search_profile",JSON.stringify(search_profile));
		} else {
			search_profile._title = false;
			sessionStorage.setItem("search_profile",JSON.stringify(search_profile));
		}
	});
	$("#aptx_sch_price").on("change",function(){
		if($("#aptx_sch_price").prop("checked") == true){
			search_profile.price = true;
			sessionStorage.setItem("search_profile",JSON.stringify(search_profile));
		} else {
			search_profile.price = false;
			sessionStorage.setItem("search_profile",JSON.stringify(search_profile));
		}
	});
	$("#aptx_sch_picURL").on("change",function(){
		if($("#aptx_sch_picURL").prop("checked") == true){
			search_profile.picURL = true;
			sessionStorage.setItem("search_profile",JSON.stringify(search_profile));
		} else {
			search_profile.picURL = false;
			sessionStorage.setItem("search_profile",JSON.stringify(search_profile));
		}
	});
	$("#aptx_sch_picIMG").on("change",function(){
		if($("#aptx_sch_picIMG").prop("checked") == true){
			search_profile.picIMG = true;
			sessionStorage.setItem("search_profile",JSON.stringify(search_profile));
		} else {
			search_profile.picIMG = false;
			sessionStorage.setItem("search_profile",JSON.stringify(search_profile));
		}
	});
	$("#aptx_sch_num").on("input",function(){
		search_profile.num_of_item = Number($("#aptx_sch_num").val());
		sessionStorage.setItem("search_profile",JSON.stringify(search_profile));
	});
	/*处理search_profile开始*/

	/*解析SKU到表格开始*/
	$("#aptx_read").click(function() {
		//textarea内检测到数字或字母内容才解析
		if(/(\d|\w)/.test($("#aptx_txtarea").val())){
			//处理export_profile
			var export_profile = search_profile;
			if (export_profile.item_ID) {
				$("#aptx_res_id").prop("checked",true);
			} else {
				$("#aptx_res_id").removeProp("checked");
			}
			if (export_profile._title) {
				$("#aptx_res_title").prop("checked",true);
			} else {
				$("#aptx_res_title").removeProp("checked");
			}
			if (export_profile.price) {
				$("#aptx_res_price").prop("checked",true);
			} else {
				$("#aptx_res_price").removeProp("checked");
			}
			if (export_profile.picURL) {
				$("#aptx_res_picURL").prop("checked",true);
			} else {
				$("#aptx_res_picURL").removeProp("checked");
			}
			if (export_profile.picIMG) {
				$("#aptx_res_picIMG").prop("checked",true);
			} else {
				$("#aptx_res_picIMG").removeProp("checked");
			}
			$("#aptx_res_num").val(export_profile.num_of_item);
			sessionStorage.setItem("export_profile",JSON.stringify(export_profile));
			var th = "<th>Index</th><th>Product</th>";
			for(let j = 1; j <= export_profile.num_of_item; j++){
				if(export_profile.item_ID){
					th = th + "<th>item_ID_" + j + "</th>";
				}
				if(export_profile._title){
					th = th + "<th>title_" + j + "</th>";
				}
				if(export_profile.price){
					th = th + "<th>price_" + j + "</th>";
				}
				if(export_profile.picURL){
					th = th + "<th>picURL_" + j + "</th>";
				}
				if(export_profile.picIMG){
					th = th + "<th>picIMG_" + j + "</th>";
				}
			}
			var thead = "<tr>" + th + "</tr>";
			$("#aptx_table tbody").html(thead);
			var SKUstr = $("#aptx_txtarea").val();
			var SKUstr2 = SKUstr.replace(/[^(\d|\w)]+$/, "");
			var SKUarr = SKUstr2.split("\n");
			var k = 1;
			var SKUs = [];
			for (let i = 0; i < SKUarr.length; i++) {
				if (/(\d|\w)/.test(SKUarr[i])) {
					let tr = document.createElement("tr");
					let tempStr = "\t<td>" + k + "</td>\n\t<td>" + SKUarr[i] + "</td>\n";
					for (let j = 0; j < $("#aptx_table th").length - 2; j++) {
						tempStr += "\t<td></td>\n";
					}
					tr.innerHTML = tempStr;
					$("#aptx_table tbody").append(tr);
					SKUs.push(SKUarr[i]);
					k++;
				}
			}
			$("#aptx_SKU_index").val(1);
			$("#aptx_last_SKU_index").val("N/A");
			sessionStorage.setItem("SKU_index", 1);
			var SKUsObj = {"SKUs":SKUs};
			sessionStorage.setItem("SKUs", JSON.stringify(SKUsObj));
			sessionStorage.removeItem("last_SKU_index");
			saveTable();
		} else {
			alert("Input some products first!");
		}
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
		if (last_SKU_index > 0 && last_SKU_index <= SKUlen) {
			//搜索...
			var currURL = window.location.href;
			var currURLarr = currURL.split("&");
			var SKUsObj = JSON.parse(sessionStorage.getItem("SKUs"));
			var SKUs = SKUsObj.SKUs;
			var currIndex = $("#aptx_SKU_index").val();
			for(let i = 0; i < currURLarr.length; i++){
				if(/_nkw=/.test(currURLarr[i])){
					currURLarr[i] = "_nkw=" + escape(SKUs[currIndex - 1]);
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
		}else if(SKUlen < 1){
			return;
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
			var export_profile = JSON.parse(sessionStorage.getItem("export_profile"));
			var SKUsObj = JSON.parse(sessionStorage.getItem("SKUs"));
			var SKUs = SKUsObj.SKUs;
			var items = $("#ListViewInner").children("li");
			var itemsInfo = {};
			var tds = "";
			for(let i = 0; i < export_profile.num_of_item; i++){
				let itemId = $(items[i]).attr("listingid");
				/*标题内容处理开始*/
				let itemTitleDOM = $(items[i]).children("h3.lvtitle").children("a").clone();
				itemTitleDOM.children("span").remove();
				let itemTitleTemp1 = itemTitleDOM.text();
				let itemTitleTemp2 = itemTitleTemp1.replace(/(\t|\n)/g,"");
				let itemTitle = itemTitleTemp2.replace(/(^\s+|\s$)/g,"");
				/*标题内容处理结束*/

				/*图片链接处理开始*/
				// let itemPicURLtemp = $(items[i]).children("div.lvpic").children(".lvpicinner").children("a").children("img").attr("src");
				// let itemPicURLarr = itemPicURLtemp.split("/");
				// let itemPicURL = "https://i.ebayimg.com/images/g/" + itemPicURLarr[6] + "/s-l1600.jpg";
				let itemPicURL = $(items[i]).children("div.lvpic").children(".lvpicinner").children("a").children("img").attr("src");
				/*图片链接处理结束*/

				/*价格span处理开始*/
				//2018-09-30
				let itemPriceDOM = $(items[i]).children("ul.lvprices").children("li.lvprice").children("span").eq(0).clone();
				itemPriceDOM.children("div").remove();
				let itemPriceTemp = itemPriceDOM.text();
				//2018-09-29
				// let itemPriceDOM = $(items[i]).children("ul.lvprices").children("li.lvprice").children("span")[0];
				// let itemPriceTemp = itemPriceDOM.childNodes[0].wholeText;			
				// if(!/\d+/.test(itemPriceTemp)){
				// 	itemPriceTemp = itemPriceDOM.innerText;
				// }
				let itemPrice = itemPriceTemp.replace(/(\$|\t|\n)/g,"");
				/*价格span处理结束*/
				
				let tempObj = {"id":itemId, "title":itemTitle, "picture":itemPicURL, "price":itemPrice};
				itemsInfo[i] = tempObj;

				//根据export_profile填充tds
				if(export_profile.item_ID){
					tds += "<td>" + itemId + "</td>";
				}
				if(export_profile._title){
					tds += "<td>" + itemTitle + "</td>";
				}
				if(export_profile.price){
					tds += "<td>" + itemPrice + "</td>";
				}
				if(export_profile.picURL){
					tds += "<td>" + itemPicURL + "</td>";
				}
				if(export_profile.picIMG){
					tds += "<td><img height='30' src='" + itemPicURL + "' /></td>";
				}
			}
			var firstTwoTds = "<td>" + last_SKU_index + "</td><td>" + SKUs[last_SKU_index - 1] + "</td>";
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
	/*解析SKU到表格、填充表格时需调用saveTable()*/

	/*自动搜索SKU并填充到表格，间隔1秒执行下一个SKU - 开始*/
	var search_timer;
	$("#aptx_auto_search").click(function(){
		//last searched SKU index
		var last_SKU_index = Number($("#aptx_SKU_index").val());
		var SKU_index = last_SKU_index + 1;
		var SKUlen = $("#aptx_table tr").length - 1;
		/*
		*有SKU的情况下才执行自动搜索
		*/
		if(last_SKU_index > 0 && last_SKU_index <= SKUlen){
			//在sessionStorage储存一个识别自动搜索的变量
			sessionStorage.setItem("aptx_auto_search","true");
			//触发搜索即可
			$("#aptx_search").trigger("click");
		}
	});
	var isAutoSearchPresent = sessionStorage.getItem("aptx_auto_search");
	var isSearchEnded = $("#aptx_last_SKU_index").val() == $("#aptx_table tr").length - 1;
	if(isAutoSearchPresent && !isSearchEnded){
		search_timer = setTimeout(function(){
			$("#aptx_fill").trigger("click");
			$("#aptx_search").trigger("click");
		},1000);
	}else if(isAutoSearchPresent && isSearchEnded){
		setTimeout(function(){
			$("#aptx_fill").trigger("click");
		},1000);
		clearTimeout(search_timer);
		sessionStorage.removeItem("aptx_auto_search");
	}else if (isSearchEnded) {
		clearTimeout(search_timer);
		sessionStorage.removeItem("aptx_auto_search");
	}
	/*自动搜索SKU并填充到表格，间隔1秒执行下一个SKU - 结束*/

	/*清除自动搜索的定时器开始*/
	$("#aptx_stop").click(function(){
		clearTimeout(search_timer);
		sessionStorage.removeItem("aptx_auto_search");
	});
	/*清除自动搜索的定时器结束*/
});
})();
