// ==UserScript==
// @name         export
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://whatever/*
// @grant        none
// ==/UserScript==

(function () {
  var sessionStorageItem = sessionStorage.getItem("itemIDs");
  var str ="";
  if (sessionStorageItem) {
    str = sessionStorageItem;
  } else {
    var headers = $(".form-group .control-label");
    for (let j = 0; j < headers.length; j++) {
      str += $(headers[j]).text() + "\t";
    }
    str += "\n";
  }
  var trs = $(".form-group .col-md-6");

  for (let i = 0; i < trs.length; i++) {
    if ($(trs[i]).text()) {
      str += $(trs[i]).text() + "\t";
    }
  }
  str += "\n";
  sessionStorage.setItem("itemIDs", str);
})();
