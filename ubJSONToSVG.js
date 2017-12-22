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


function json2xml(json) {
    var a = JSON.parse(json)
    var c = document.createElement("root");
    var t = function (v) {
        return {}.toString.call(v).split(' ')[1].slice(0, -1).toLowerCase();
    };
    var f = function (f, c, a, s) {
        c.setAttribute("type", t(a));
        if (t(a) != "array" && t(a) != "object") {
            if (t(a) != "null") {
                c.appendChild(document.createTextNode(a));
            }
        } else {
            for (var k in a) {
                var v = a[k];
                if (k == "__type" && t(a) == "object") {
                    c.setAttribute("__type", v);
                } else {
                    if (t(v) == "object") {
                        var ch = c.appendChild(document.createElementNS(null, s ? "item" : k));
                        f(f, ch, v);
                    } else if (t(v) == "array") {
                        var ch = c.appendChild(document.createElementNS(null, s ? "item" : k));
                        f(f, ch, v, true);
                    } else {
                        var va = document.createElementNS(null, s ? "item" : k);
                        if (t(v) != "null") {
                            va.appendChild(document.createTextNode(v));
                        }
                        var ch = c.appendChild(va);
                        ch.setAttribute("type", t(v));
                    }
                }
            }
        }
    };
    f(f, c, a, t(a) == "array");
    return c.outerHTML;
}

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