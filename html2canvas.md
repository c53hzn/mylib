## 如果该页面已经有jQuery

    ;(function(){
    var script1 = document.createElement("script");
    script1.setAttribute("src","https://cdn.bootcss.com/html2canvas/0.5.0-beta4/html2canvas.js");
    document.body.appendChild(script1);
    })();
    
## 如果该页面没有jQuery

    ;(function(){
    var script1 = document.createElement("script");
    script1.setAttribute("src","https://cdn.bootcss.com/html2canvas/0.5.0-beta4/html2canvas.js");
    document.body.appendChild(script1);
    var script2 = document.createElement("script");
    script2.setAttribute("src","https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js");
    document.body.appendChild(script2);
    })();

**一定要先引入上面的部分，分两步走！！！**    
**一定要先引入上面的部分，分两步走！！！**


## html2canvas插件本身有截图不清晰的问题，如果不需要放大，就用以下的格式

    ;(function(){
        var canvas = document.createElement("canvas");  
        canvas.width = $("body").width();  
        canvas.height = $("body").height();

        html2canvas($("body"),{ // $()括号里是你要复制生成canvas的区域，可以自己选
            canvas: canvas,
            onrendered:function(canvas){
                dataURL =canvas.toDataURL("image/png");
                var pic = dataURL;
                //使新生成的图片自带下载链接
                var link = document.createElement("a");
                link.setAttribute("href",pic);
                link.setAttribute("download","capture");
                var img = document.createElement("img");
                img.setAttribute("src",pic);
                link.appendChild(img);
                $("body").append(link);
            },
            width:1600,
            height:1200
        });
    })();


## 如果需要放大，则用下面的格式

    ;(function(){
    var w = $("body").width();  
    var h = $("body").height();
    /*要将canvas的宽高设置成容器宽高的2倍start*/
    var canvas = document.createElement("canvas");  
        canvas.width = w * 2;  
        canvas.height = h * 2;  
        canvas.style.width = w + "px";  
        canvas.style.height = h + "px";  
    /*要将canvas的宽高设置成容器宽高的2倍end*/
    var context = canvas.getContext("2d");//然后将画布缩放，将图像放大两倍画到画布上  
        context.scale(2,2);  

        html2canvas($("body"),{ // $()括号里是你要复制生成canvas的区域，可以自己选
            canvas: canvas,
            onrendered:function(canvas){
                dataURL =canvas.toDataURL("image/png");
                var pic = dataURL;
                //使新生成的图片自带下载链接
                var link = document.createElement("a");
                link.setAttribute("href",pic);
                link.setAttribute("download","capture");
                var img = document.createElement("img");
                img.setAttribute("src",pic);
                link.appendChild(img);
                $("body").append(link);
            },
            width:1600,
            height:1200
        });
    })();

下载链接的思路来自<a href="http://www.w3school.com.cn/tags/att_a_download.asp" target="_blank">这里</a>

截图放大思路来自<a href="https://blog.csdn.net/z69183787/article/details/76589471" target="_blank">这里</a>

总是截出来300x150尺寸的解决办法看<a href="https://blog.csdn.net/playboyanta123/article/details/79301050" target="_blank">这里</a>