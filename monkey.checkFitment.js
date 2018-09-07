// ==UserScript==
// @name         Check fitment
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Check if eBay has changed fitment compatibility lists
// @author       Jenny HOU
// @match        https://pages.ebay.com/motors/compatibility/download.html
// @grant        none
// ==/UserScript==



function checkFitment() {
    'use strict';
	function addZero(a){
		if(a < 10){
			return "0" + a;
		}else{
			return a;
		}
	}
    var content = {};
    var timeNew = new Date();
    var year = timeNew.getFullYear();
    var month = addZero(timeNew.getMonth() + 1);
    var date = addZero(timeNew.getDate());
    var hour = addZero(timeNew.getHours());
    var minute = addZero(timeNew.getMinutes());
    var second = addZero(timeNew.getSeconds());
    var fullDate = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    var rightSideText = document.getElementById("rightSideText");
    var twisty = document.getElementsByClassName("twisty");//获取5个汽配大类
    var alertStr = "";//初始化时alert的内容
    var mailStr = "";//发送给cs@soldeazy.com的内容
    for(let i = 0; i < twisty.length; i++){
    	//let catTitle = twisty[i].getElementsByClassName("twistyOpen")[0].innerText;
        //eBay抽风的时候这些div上会没有class="twistyOpen"
        //所以改用children[0]来获取
        let catTitle = twisty[i].children[0].innerText;//汽配大类名
        alertStr += "\nCategory Name: " + catTitle + "\n";
        mailStr += "\nCategory Name: " + catTitle + "\n";
        content[catTitle] = {};
    	let linkList = twisty[i].getElementsByTagName("a");
    	for(let j = 0; j < linkList.length; j++){
    		let tempName = linkList[j].innerHTML;//每个表的名字
    		let tempURL = linkList[j].href;//每个表的下载链接
            alertStr += tempName + ": \n";
            alertStr += tempURL + "\n";
            mailStr += tempName + "\n";
    		content[catTitle][tempName] = tempURL;
    	}
    }

    /*从localStorage解析成JSON start*/
    var lastContent = JSON.parse(localStorage.getItem('content'));
    /*从localStorage解析成JSON end*/
    //如果本地没有则lastContent为null
    if(!lastContent){//如果本地缓存没有内容则初始化
    	localStorage.setItem("content",JSON.stringify(content));//从JSON转成string再存到localStorage
    	localStorage.setItem("lastUpdateTime",fullDate);
        //弹出初始化的alert
    	alert("Fitment compatibility lists initiated\n" + alertStr);
        let mailBody = mailStr.replace(/&amp;/g,"%26").replace(/&/g,"%26").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\|/g,"%7C").replace(/\//g,"%2F").replace(/:/g,"%3A").replace(/,/g,"%2C").replace(/\n/g,"%0d%0a").replace(/_/g,"%5F");
        //在console打印出所有汽配表
        console.log(alertStr.replace(/&amp;/g,"&"));
        //发送邮件给cs@soldeazy.com
        if(confirm("send email to cs@soldeazy.com?")){
            window.open("mailto:cs@soldeazy.com?subject=" + fullDate +"_fitment-Initiated&body=" + mailBody);
        }else{//不发邮件就return
            return;
        }
    }else{
        /*检查有无增删start*/
    	let deleted = "Deleted:\n";
		for(let k in lastContent){
            if(!content[k]){//如果上次的大类名这次没有了
                deleted += "List Category: " + lastContent[k] + "\n";
            }else{
                for(let l in lastContent[k]){
                    if(!content[k][l]){//如果上次的汽配表这次没有了
                        // deleted += l + ": \n" + lastContent[k][l] + "\n";
                        deleted += l + "\n";
                    }
                }
            }
        }
        let added = "\nAdded:\n";
        let addedObj = {};
        for(let k in content){
            if(!lastContent[k]){//如果这次的大类上次没有出现
                added += "List Category: " + content[k] + "\n";
            }else{
                for(let l in content[k]){
                    if(!lastContent[k][l]){//如果这次的汽配表上次没有出现
                    	addedObj[l] = true;
                        // added += l + ": \n" + content[k][l] + "\n";
                        added += l + "\n";
                    }
                }
            }
        }
        /*检查有无增删end*/
        /*新增的加粗标红start*/
        for(let i = 0; i < twisty.length; i++){
	    	let linkList = twisty[i].getElementsByTagName("a");
	    	for(let j = 0; j < linkList.length; j++){
	    		let tempName = linkList[j].innerHTML;//每个表的名字
                if(addedObj[tempName]){
                    linkList[j].innerHTML = "<span style='color: red; font-weight: bold;'>" + linkList[j].innerHTML + "</span>";
                }
	    	}
	    }
        /*新增的加粗标红end*/
        var contentChanged = "";
        if(deleted != "Deleted:\n"){
            contentChanged += deleted;
        }
        if(added != "\nAdded:\n"){
            contentChanged += added;
        }
    	if(contentChanged == ""){//如果没有增删
    		alert("No change is observed\n\nLast updated at\n" + localStorage.getItem("lastUpdateTime"));
            console.log("No change is observed\n\nLast updated at\n" + localStorage.getItem("lastUpdateTime"));
            console.log(alertStr.replace(/&amp;/g,"&"));
    	}else{//如果有增删
            var messageChanged = contentChanged.replace(/&amp;/g,"&") + "\nLast updated at\n" + localStorage.getItem("lastUpdateTime") + "\nTime now: \n" + fullDate;
            alert("Some changes are observed\n\n" + messageChanged);
            /*发送邮件到cs@soldeazy.com start*/
            if(confirm("update record and send email to cs@soldeazy.com?")){
                localStorage.setItem("content",JSON.stringify(content));
                console.log("Some changes are observed\n\n" + contentChanged.replace(/&amp;/g,"&") + "\nLast updated at\n" + localStorage.getItem("lastUpdateTime") + "\nTime now: \n" + fullDate);
                mailStr += "\n" + messageChanged;
                let mailBody = mailStr.replace(/&amp;/g,"%26").replace(/&/g,"%26").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\|/g,"%7C").replace(/\//g,"%2F").replace(/:/g,"%3A").replace(/,/g,"%2C").replace(/\n/g,"%0d%0a").replace(/_/g,"%5F");
                window.open("mailto:cs@soldeazy.com?subject=" + fullDate +"_fitment-update_after_" + localStorage.getItem("lastUpdateTime") + "&body=" + mailBody);
                localStorage.setItem("lastUpdateTime",fullDate);
            }else{//不发送则只在console打印
            	console.log(alertStr.replace(/&amp;/g,"&"));
                console.log("Some changes are observed\n\n" + contentChanged.replace(/&amp;/g,"&") + "\nLast updated at\n" + localStorage.getItem("lastUpdateTime") + "\n\nTime now: \n" + fullDate);
                return;
            }
            /*发送邮件到cs@soldeazy.com end*/
    	}
    }
}

//将checkFitment存入localStorage，以便在console做测试
//存入时变成了string，取出时必须用eval解析才能变回function
localStorage.setItem("checkFitment",checkFitment);
checkFitment();
