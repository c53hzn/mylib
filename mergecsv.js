var path = require('path');
var fs = require("fs");
const csv2json = require('csvjson-csv2json');
const json2csv = require('csvjson-json2csv');
var rootPath = __filename;
var current_dir = path.dirname(rootPath);

mergeFileInDir(current_dir);

function fileContent(filepath, data_csv) {
	if (data_csv == "merged.csv") {
		var data = fs.readFileSync(filepath + "\\" + data_csv,'utf-8');
		//json array [{a: 1, b: 2}, {a: 3, b: 4}]
		var rawData = csv2json(String(data), {
			parseNumbers: true
		});
		console.log("File " + data_csv + " is done");
		return rawData;
	} else {
		return [];
	}
}

function mergeFileInDir(dir){
    fs.readdir(dir, function(error,files){
        if (error){
          console.log(error.stack);
          return;
        }
        var output_arr = [];
        for(let i=0 ; i < files.length ;i++ ){
        	var filename_arr = files[i].split(".");
        	if (filename_arr[filename_arr.length - 1].match(/(CSV|csv)/)) {
        		let tempData = fileContent(dir, files[i]);
        		output_arr = output_arr.concat(tempData);
        	}
            
        }

        var output = json2csv(output_arr);
		fs.writeFileSync(__dirname + "\\" + "merged.csv", output, {
			'flag': 'w'
		});

    });
}
