// usage: node.js fun_with_json.js

const MAXWIDTH = 800;
const MAXHEIGHT =300;

var records = [];

// Prototype d'un record
// {'Ddeb':Date,'Dfin':date,'tId':String,'tLabel':String,'duration':integer}

records.push({  'Ddeb':new Date(2017,11, 24, 11, 0, 30, 0),
				'Dfin':new Date(2017,11, 25, 11, 0, 30, 0),
				'tId':'A',
				'tLabel':'LABEL A',
				'duration':0});

records.push({  'Ddeb':new Date(2017,11, 20, 11, 0, 30, 0),
				'Dfin':new Date(2017,11, 31, 11, 0, 30, 0),
				'tId':'B',
				'tLabel':'LABEL B',
				'duration':0});


function getBornes(tRecords){
	var dMin , dMax;
	for(k in tRecords){
		console.log(tRecords[k]);
		
	}
	
}

getBornes(records);