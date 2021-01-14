# Copy custom content

[Etsy sold record](https://www.etsy.com/hk-en/shop/ExcelToday/sold)

```JavaScript
  (function() {
    var alertDiv = function() {
      var el = document.createElement("div"); 
      var html = `
      <style>
      div.alert-success-asdf {
        position: fixed;
        top: 200px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        margin: 0px auto;
        width: 400px;
        height: 100px;
        text-align: center;
        color: #286636;
        font-size: 20px;
        font-weight: bold;
        line-height: 100px;
        background: #d4edda;
        border-radius: 15px;
        z-index: 999999;
        display: none;
      }
      </style>
      <div class="alert-success-asdf">
        Content Copied!
      </div>
      `;
      el.innerHTML = html;
      return el;
    }
    var txtArea = function() {  
      var el = document.createElement("textarea"); 
      el.id = "hidden_txtArea"; 
      el.style = "position:fixed;top:0px;left:0px;padding:0px;width:0px;height:0px;"; 
      return el; 
    } 
    function copyTxt(txt) {  
      $("#hidden_txtArea").html(txt); 
      $("#hidden_txtArea").select(); 
      document.execCommand("copy"); 
      $(".alert-success-asdf").slideDown(100); 
      setTimeout(function () { 
        $(".alert-success-asdf").slideUp(100);
      }, 600); 
    } 
    $("body").append(txtArea());  
    $("body").append(alertDiv()); 
    // custom content start
    var arr = $(".wt-display-inline-block.listing-link.wt-transparent-card"); //Etsy sales record
    var str = "";  
    $(arr).each(function() {  
      str += $(this).attr("href") + "\t";  
      str += $(this).attr("title") + "\t";  
      str += "\n";  
    });
    // custom content end
    copyTxt(str);  
  })();  
```
