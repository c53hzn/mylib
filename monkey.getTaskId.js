// ==UserScript==
// @name         Que job search
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.soldeazy.com/ssl/soldeazy/queue
// @match        https://auto.soldeazy.com/app/soldeazy/queue
// @grant        none
// ==/UserScript==

(function(w) {
	var isSearching = false;
	w.getTaskId = function(key_word) {
		if (typeof key_word != "string") {
			throw Error("key_word must be double quoted!!!");
			return;
		}
		var baseURL = window.location.href;
		var API = baseURL + "/result?job_id=";
		var taskIds = [];
		var taskResults = $(".listingtable tr");
		for (let i = 1; i < taskResults.length; i++) {
			let temp = taskResults[i].children[1].innerText;
			taskIds.push(temp);
		}
		var j = 1;
		isSearching = true;
		function iterateTasks(task_ID) {
			if (j > taskIds.length) {
				isSearching = false;
				return;
			} else if (j <= taskIds.length && isSearching) {
				$.ajax({
					type: "GET",
					url: API + task_ID,
					dataType: "html",
					success: function (data) {
						var isRIDfound = false;
						var div = document.createElement("div");
						div.innerHTML = data;
						var tds = div.getElementsByTagName("td");
						for (let k = 0; k < tds.length; k++) {
							let content = tds[k].innerText;
							if (content.indexOf(key_word) != -1) {
								isRIDfound = true;
							}
						}
						if (isRIDfound) {
							console.log(j + ": " + task_ID);
						} else {
							console.log(String(j));
						}
						j++;
						iterateTasks(taskIds[j - 1]);
					},
					error: function (xhr, status, err) {
						console.log(j + ": " + task_ID + "出错了，自己点开看吧");
						j++;
						iterateTasks(taskIds[j - 1]);
					}
				});
			} else {
				return;
			}
		}
		iterateTasks(taskIds[j - 1]);
	}
	w.getTaskId_stop = function() {
		isSearching = false;
	}
})(window);
