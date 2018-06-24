# 添加jQuery

## F12打开控制台，先检查有没有jQuery，如果没有就添加

	;(function(){
		if(typeof(jQuery) != "undefined"){	
	        console.log("no need to add jQuery again");
		}else{
			var script = document.createElement("script");
			script.setAttribute("src","https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js");
			document.body.appendChild(script);
			console.log("jQuery is added");
		}
	})();

