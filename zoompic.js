var styleContent = `
.zoomable {
	cursor: zoom-in;
}
#mask_layer {
	position: fixed;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, .5);
	z-index: 999;
}
#mask_child {
	position: absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	margin: auto;
	max-width: 100%;
	max-height: 100%;
	min-width: 800px;
	border: 1px solid black;
	cursor: zoom-out;
}
.hidden {
	display: none;
}
.fade-in-anime {
	animation: fade-in 0.5s;
}
.fade-out-anime {
	animation: fade-out 0.5s;
	animation-fill-mode: forwards;
}
@keyframes fade-in {
  from {
  	opacity: 0;
  	display: block;
  }
  to {
  	opacity: 1;
  	display: block;
  }
}
@keyframes fade-out {
  0% {
  	opacity: 1;
  	display: block;
  }
  99% {
  	opacity: 0;
  	display: block;
  }
  100% {
  	z-index: -1;
  }
}
`;
var d = document;
var maskStyle = d.createElement("style");
var maskDom = d.createElement("div");
maskDom.id = "mask_layer";
maskDom.className = "hidden";
maskDom.innerHTML = `<img id="mask_child"/>`;
maskStyle.innerHTML = styleContent;
d.querySelector("head").appendChild(maskStyle);
d.querySelector("body").appendChild(maskDom);
var mask_layer = d.getElementById("mask_layer");
var imgArr = d.querySelectorAll(".markdown-body img");
for (let i = 0; i < imgArr.length; i++) {
	let parent = imgArr[i].parentNode;
	let grandParent = parent.parentNode;
	if (parent.nodeName != "A" && grandParent.nodeName != "A") {
		imgArr[i].className = "zoomable";
		imgArr[i].onclick = function() {
			d.querySelector("#mask_child").src = this.src;
			d.querySelector("#mask_layer").className = "fade-in-anime";
		}
	}
}
d.querySelector("#mask_layer").onclick = function() {
	this.className = "fade-out-anime";
}
