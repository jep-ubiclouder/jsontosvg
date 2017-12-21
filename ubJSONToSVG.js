// usage: node.js fun_with_json.js

const MAXWIDTH = 800;
const MAXHEIGHT =300;
var  MILLISECONDSPERHOURS = 1000*60*60;
var records = [];

// Prototype d'un record
// {'Ddeb':Date,'Dfin':date,'tId':String,'tLabel':String,'duration':integer}

records.push({  'dDeb':new Date(2017,11, 24, 11, 0, 30, 0),
				'dFin':new Date(2017,11, 25, 11, 0, 30, 0),
				'tId':'A',
				'tLabel':'LABEL A',
				'duration':0});

records.push({  'dDeb':new Date(2017,11, 27, 11, 0, 30, 0),
				'dFin':new Date(2017,11, 30, 11, 0, 30, 0),
				'tId':'B',
				'tLabel':'LABEL B',
				'duration':0});


function getBornes(tRecords){
	var dMin = new Date(2077,0,1);
	var dMax = new Date(1971,0,1);
	
	var resultat = {};
	for(k in tRecords){
		var r = tRecords[k];
		console.log(r);
		if(r.dDeb > r.dFin){ // sanity check
			var tmp = new Date();
			tmp = r.dDeb;
			r.dDeb = r.dFin;
			r.dFin = tmp;
		}
		
		if(r.dDeb < dMin){ 
			dMin=r.dDeb ;
			}
		if(dMax < r.dFin){ 
			dMax=r.dFin ;
			}
		r.duration = (r.dFin/MILLISECONDSPERHOURS - r.dDeb/MILLISECONDSPERHOURS);
	}
	resultat.dMax = dMax;
	resultat.dMin = dMin;
	resultat.dureeMax=(dMax/MILLISECONDSPERHOURS - dMin/MILLISECONDSPERHOURS);
	return resultat;
}

var r = getBornes(records);
console.log(r);
