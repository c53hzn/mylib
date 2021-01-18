# Traverse directory, add date and slug for MD files originally written for Jekyll

```JavaScript
var fs = require('fs');

var dirArr = fs.readdirSync(__dirname);

for (let i = 0; i < dirArr.length; i++) {
	if (dirArr[i].substring(dirArr[i].length-3, dirArr[i].length) == ".md") {
		addDateSlug(dirArr[i]);
	}
}

function addDateSlug(fileName) {
	var str = fs.readFileSync(fileName).toString();
	var arr = str.split("\n");
	arr[0] = "---\ndate: " + fileName.substring(0, 10) + "slug: " + fileName.substring(11, fileName.length - 3);
	str = arr.join("\n");
	fs.writeFileSync(fileName, str);
}
```
