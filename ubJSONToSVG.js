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


function json2xml(o) {
	console.log(o);
	if (typeof o == 'object' && o.constructor == Object && len(o) == 1) {
		for (var a in o) {
			console.log('a',a);
			return toXML(a, o[a]);
		}
	} else {
 
	}
	function len(o) {
		var n = 0;
		for (var a in o) {
			n++;
		}
		return n;
	}
	function toXML(tag, o) {
		var doc = '<' + tag;
		if (typeof o === 'undefined' || o === null) {
			doc += '/>';
			return doc;
		}
		if (typeof o !== 'object') {
			doc += '>' + safeXMLValue(o) + '</' + tag + '>';
			return doc;
		}
		if (o.constructor == Object) {
			for (var a in o) {
				if (a.charAt(0) == '@') {
					if (typeof o[a] !== 'object') {
						doc += ' ' + a.substring(1) + '="' + o[a] + '"';
						delete o[a];
					} else {
						throw new Error((typeof o[a])
								+ ' being attribute is not supported.');
					}
				}
			}
			if (len(o) === 0) {
				doc += '/>';
				return doc;
			} else {
				doc += '>';
			}
			if (typeof o['#text'] !== 'undefined') {
				if (typeof o['#text'] !== 'object') {
					doc += o['#text'] + '</' + tag + '>';
					return doc;
				} else {
					throw new Error((typeof o['#text'])
							+ ' being #text is not supported.');
				}
			} else {
				for (var b in o) {
					if (o[b].constructor == Array) {
						for (var i = 0; i < o[b].length; i++) {
							if (typeof o[b][i] !== 'object'
									|| o[b][i].constructor == Object) {
								doc += toXML(b, o[b][i]);
							} else {
								throw new Error((typeof o[b][i])
										+ ' is not supported.');
							}
						}
					} else if (o[b].constructor == Object
							|| typeof o[b] !== 'object') {
						doc += toXML(b, o[b]);
					} else {
						throw new Error((typeof o[b]) + ' is not supported.');
					}
				}
			}
			doc += '</' + tag + '>'
			return doc;
		}
	}
	function safeXMLValue(value) {
		var s = value.toString();
		s = s.replace('/\&/g', '&amp;');
		s = s.replace('/\"/g', '&quot;');
		s = s.replace('/</g', '&lt;');
		s = s.replace('/>/g', '&gt;');
		return s;
	}
};
var meta = getBornes(records);
console.log(meta);
console.log(records);
var PIXELPERHOUR = MAXWIDTH / meta.dureeMax;
var PIXELPERTASK = MAXHEIGHT / records.length;


for(k in records){
	var r = records[k];
	r.pxOffset = Math.floor(Math.abs( meta.dMin/MILLISECONDSPERHOURS - r.dDeb/MILLISECONDSPERHOURS) * PIXELPERHOUR);
	r.pxWidth = Math.floor(r.duration * PIXELPERHOUR);
}
console.log(records);
var xml =  json2xml(records[0]);
console.log(xml);