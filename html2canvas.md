# HTML2CANVAS插件的使用方法


## 添加html2canvas插件

    ;(function(){
        var script1 = document.createElement("script");
        script1.setAttribute("src","https://c53hzn.github.io/mylib/html2canvas.min.js");
        document.body.appendChild(script1);
    })();


## html2canvas插件本身有截图不清晰的问题，如果不需要放大，就用以下的格式

    ;(function(){
        html2canvas(document.body).then(function(canvas) {
            var timeNow = new Date();
            dataURL = canvas.toDataURL("image/png");
            var pic = dataURL;
            canvas.style.display = "none";
            document.body.appendChild(canvas);
            
            //使新生成的图片自带下载链接
            var link = document.createElement("a");
            link.setAttribute("href",pic);
            //下载的文件名称
            var fileName = "capture" + timeNow.getFullYear() + "-" + (timeNow.getMonth() + 1) + "-" + timeNow.getDate();
            link.setAttribute("download",fileName);
            var img = document.createElement("img");
            img.setAttribute("src",pic);
            img.setAttribute("id","outputImg");
            link.appendChild(img);
            link.style.display = "none";
            document.body.appendChild(link);
            //模拟单击事件，触发下载行为
            document.getElementById("outputImg").click();
        });
    })();


## 如果需要放大，则用下面的格式（旧版不够清晰，现在已经好多了）

    ;(function(){
        var timeNow = new Date();
        var body = document.getElementsByTagName("body")[0];
        var bodyMarginLeft = body.style.marginLeft;
        var w = body.style.width + bodyMarginLeft;  
        var h = body.style.height;
        /*要将canvas的宽高设置成容器宽高的2倍start*/
        var canvas = document.createElement("canvas");  
        canvas.width = w * 2;  
        canvas.height = h * 2;  
        canvas.style.width = w + "px";  
        canvas.style.height = h + "px";  
        /*要将canvas的宽高设置成容器宽高的2倍end*/
        var context = canvas.getContext("2d");//然后将画布缩放，将图像放大两倍画到画布上  
        context.scale(2,2);  
        
        html2canvas(document.body,{ // $()括号里是你要复制生成canvas的区域，可以自己选
            canvas: canvas,
            onrendered:function(canvas){
                dataURL =canvas.toDataURL("image/png");
                var pic = dataURL;
                //使新生成的图片自带下载链接
                var link = document.createElement("a");
                link.setAttribute("href",pic);
                //下载的文件名称
                var fileName = "capture" + timeNow.getFullYear() + "-" + (timeNow.getMonth() + 1) + "-" + timeNow.getDate();
                link.setAttribute("download",fileName);
                var img = document.createElement("img");
                img.setAttribute("src",pic);
                img.setAttribute("id","outputImg");
                link.appendChild(img);
                document.body.appendChild(link);
                //模拟单击事件，触发下载行为
                document.getElementById("outputImg").click();
            }
        });
    })();

下载链接的思路来自<a href="http://www.w3school.com.cn/tags/att_a_download.asp" target="_blank">这里</a>

截图放大思路来自<a href="https://blog.csdn.net/z69183787/article/details/76589471" target="_blank">这里</a>

总是截出来300x150尺寸的解决办法看<a href="https://blog.csdn.net/playboyanta123/article/details/79301050" target="_blank">这里</a>

模拟单击事件参考了<a href="https://blog.csdn.net/zhyh1435589631/article/details/52999630" target="_blank">这里</a>

此插件对border-radius、transform rotate、transform skew都不友好，凡是有这些的都会变形，如果页面上有视频元素，则无法截出来
