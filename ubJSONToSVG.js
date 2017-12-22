// usage: node.js fun_with_json.js

const MAXWIDTH = 800;
const MAXHEIGHT =300;
var  MILLISECONDSPERHOURS = 1000*60*60;
var records = [];

// Prototype d'un record
// {'dDeb':Date,'dFin':date,'tId':String,'tLabel':String,'duration':integer}

records.push({  'dDeb':new Date(2017,11, 24, 11, 0, 30, 0),
				'dFin':new Date(2017,11, 25, 11, 0, 30, 0),
				'tId':'A',
				'tLabel':'LABEL A',
				'duration':0,
				'testArray':[0,1],
				'testHash':{'a':1,'b':2},
				'testBool':false
				 });

records.push({  'dDeb':new Date(2017,11, 27, 11, 0, 30, 0),
				'dFin':new Date(2017,11, 30, 11, 0, 30, 0),
				'tId':'B',
				'tLabel':'LABEL B',
				'duration':0});
records.push({  'dDeb':new Date(2017,10, 27, 11, 0, 30, 0),
	'dFin':new Date(2017,11, 30, 9, 0, 30, 0),
	'tId':'B',
	'tLabel':'LABEL B',
	'duration':0});

function getBornes(tRecords){
	var dMin = new Date(2077,0,1);
	var dMax = new Date(1971,0,1);
	var resultat = {};
	for(k in tRecords){
		var r = tRecords[k];
		// console.log(r);
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
function parseJson(o){
	console.log('Objet',o);
	var resultat = []
	for( t in o){
/*		console.log('clef dans o',t);
		console.log('valeur clef dans o',o[t])
		console.log('type of valeur',typeof o[t]);
		console.log('longueur de valeur',o[t].length);
		console.log('constructeur de valeur', o[t].constructor);
		console.log('------------------------');
*/	
		var element = '';
		switch (o[t].constructor){
			case Boolean:
				element ="<"+t+">"+o[t]+"</"+t+">"
				console.log(element);
				
				break;
			case Number:
				element ="<"+t+">"+o[t]+"</"+t+">"
				console.log(element);
				break;
			case String:
				element ="<"+t+">"+o[t]+"</"+t+">"
				console.log(element);
				break;
			case Date:
				element ="<"+t+">"+o[t]+"</"+t+">"
				console.log(element);
				break;
			case Array:
				element ="<"+t+">"+parseJson(o[t])+"</"+t+">"
				console.log(element);
				break;
			case Object:
				element ="<"+t+">"+parseJson(o[t])+"</"+t+">"
				console.log(element);
				break;
		}
		resultat.push(element);
	}
	return resultat;
}

var meta = getBornes(records);
var PIXELPERHOUR = MAXWIDTH / meta.dureeMax;
var PIXELPERTASK = MAXHEIGHT / records.length;

for(k in records){
	var r = records[k];
	r.pxOffset = Math.floor(Math.abs( meta.dMin/MILLISECONDSPERHOURS - r.dDeb/MILLISECONDSPERHOURS) * PIXELPERHOUR);
	r.pxWidth = Math.floor(r.duration * PIXELPERHOUR);
}

parseJson(records[0]);
// parseJson(records[1]);