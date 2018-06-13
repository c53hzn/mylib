## Open a blank tab page and run code

    function runCode(html, css){ 
       var newWin=window.open('','',''); 
       newWin.opener = null;
       newWin.document.write(css); 
       newWin.document.write(html); 
       newWin.document.close();
    }
    var styles = document.getElementsByTagName("style")[0].innerHTML;
    var someStyle = "<style>" + styles + "</style>";
    var someHTML = document.getElementsByTagName("body")[0].innerHTML;
    runCode(someHTML, someStyle);

[Original page](http://www.5imoban.net)
