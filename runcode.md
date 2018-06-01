## Open a blank tab page and run code

    function runCode(){ 
       var styles=document.getElementsByTagName("style")[0].innerHTML;
       var style = "<style>" + styles + "</style>";
       var code=document.getElementsByTagName("body")[0].innerHTML;
       var newWin=window.open('','',''); 
       newWin.opener = null;
       newWin.document.write(style); 
       newWin.document.write(code); 
       newWin.document.close();
    }

