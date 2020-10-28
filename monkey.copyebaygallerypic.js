// ==UserScript==
// @name         Copy Gallery Photo
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.ebay.com/itm/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
function gPicPaths() {
    var str = "";
    $("ul.lst.icon").eq(0).children().each(function() {
        str += $(this).find("img").attr("src").replace("s-l64","s-l1600") + ";" ;
    });
    str = str.substring(0,str.length-1);
    return str;
}
function actionBtn(id,text) {
    var el = document.createElement("button");
    el.id = id;
    el.setAttribute("type","button");
    el.innerHTML = text;
    el.style = "position:fixed;top:10px;left:10px;color:white;background:black;border:1px solid gray;box-shadow: 1px 1px 1px 1px silver;cursor:pointer;";
    return el;
}
function txtArea(id) {
    var el = document.createElement("textarea");
    el.id = id;
    el.style = "position:fixed;top:0px;left:0px;padding:0px;width:0px;height:0px;";
    return el;
}
var copyPicBtn = actionBtn("copy_g_pic","Copy Gallery Photo");
var picPathTxtArea = txtArea("pic_txtArea");
$("body").append(copyPicBtn);
$("body").append(picPathTxtArea);
$("#copy_g_pic").click(function() {
    var pics = gPicPaths();
    $("#pic_txtArea").html(pics);
    $("#pic_txtArea").select();
    document.execCommand("copy");
});
})();
