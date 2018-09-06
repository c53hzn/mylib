// ==UserScript==
// @name         Print Middle
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Jenny HOU
// @match        https://soldeazy.com/support/print.php?id=*
// @grant        none
// ==/UserScript==

;(function(){
  //找到需要打印的KB文章，键盘上按End直接跳到最下方，点“打印文章”，然后在弹出的打印页面先取消，否则会打印出来不需要的页首和页脚
  var body = document.getElementsByTagName("body")[0];
  var firstDiv = body.children[0];
  //找到页首的两个部分
  var firstH2 = firstDiv.children[0];
  firstH2.style.display = "none";//隐藏这个部分
  var firstHr = firstDiv.children[1];
  firstHr.style.display = "none";//隐藏这个部分

  //找到页脚的三个部分
  var last1 = firstDiv.children[firstDiv.children.length - 1];
  last1.style.display = "none";//隐藏这个部分
  var last2 = firstDiv.children[firstDiv.children.length - 2];
  last2.style.display = "none";//隐藏这个部分
  var last3 = firstDiv.children[firstDiv.children.length - 3];
  last3.style.display = "none";//隐藏这个部分
  window.print();//直接打印修改后的版本
})();
