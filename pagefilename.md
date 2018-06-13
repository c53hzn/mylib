以下代码可输出当前页面的文件名

    /* get webpage file name start */
    ;(function(){
      var currPath = window.location.pathname;
      var pathReversed = currPath.split("").reverse().join("");
      var pathReversedCut = pathReversed.substring(0,pathReversed.indexOf("/"));
      var pathFileName = pathReversedCut.split("").reverse().join("");
      console.log(pathFileName);
    })();
    /* get webpage file name end */

2018-06-13
