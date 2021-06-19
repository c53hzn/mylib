# Download Instagram Video

Go to the person's posts, click the post with video, click three dots on this post, get the share link, then open in another tab page, then press F12 to open console and paste the following codes

```js
var vid = document.querySelector("video");
var vid2 = document.createElement("video");
vid2.src = vid.src;
vid2.controls = true;
document.querySelector("body").innerHTML = "";
document.querySelector("body").appendChild(vid2);
```

The end.
