# Get eBay store categories

## Purpose

To get eBay store categories in different levels

## HTML example

```html
<ul role="group">
	<li id="cat1-id">
		<a>cat1 name</a>
	</li>
	<li id="cat2-id">
		<a>cat2 name</a>
		<ul role="group">
			<li id="cat2-subcat1-id">
				<a>cat2-subcat1 name</a>
			</li>
			<li id="cat2-subcat2-id">
				<a>cat2-subcat2 name</a>
			</li>
			<li id="cat2-subcat3-id">
				<a>cat2-subcat3 name</a>
				<ul role="group">
					<li id="cat2-subcat3-subcat1-id">
						<a>cat2-subcat3-subcat1 name</a>
						<ul role="group">
							<li id="cat2-subcat3-subcat1-subcat1-id">
								<a>cat2-subcat3-subcat1-subcat1 name</a>
							</li>
							<li id="cat2-subcat3-subcat1-subcat2-id">
								<a>cat2-subcat3-subcat1-subcat2 name</a>
							</li>
						</ul>
					</li>
					<li id="cat2-subcat3-subcat2-id">
						<a>cat2-subcat3-subcat2 name</a>
					</li>
				</ul>
			</li>
		</ul>
	</li>
	<li id="cat3-id">
		<a>cat3 name</a>
	</li>
	<li id="cat4-id">
		<a>cat4 name</a>
	</li>
</ul>
```

## JavaScript code

```JavaScript
function getSubCat(ul) {
	var arr = $(ul).find("ul").eq(0).children();
	for (let j = 0; j < arr.length; j++) {
		str += tab_str+$(arr).eq(j).attr("id").substring(0,11)+"\t"+$(arr).eq(j).find("a").eq(0).text()+"\n";
		if ($(arr[j]).find("ul").length!=0) {
			tab_str+="\t";
			getSubCat(arr[j]);
		}
		if (j == arr.length-1) {
				tab_str = tab_str.substring(0,tab_str.length-1);
		}
	}
}
var li_arr = $("ul[role=group]").eq(0).children();
var str = "";
var tab_str = "";
for (let i = 0; i < li_arr.length; i++) {
	str += tab_str+$(li_arr[i]).attr("id").substring(0,11)+"\t"+$(li_arr[i]).find("a").eq(0).text()+"\n";
	if ($(li_arr[i]).find("ul").length!=0) {
		tab_str+="\t";
		getSubCat($(li_arr[i]));
	}
	if (i == li_arr.length-1) {
		tab_str = tab_str.substring(0,tab_str.length-1);
	}
}
console.log(str)
```
