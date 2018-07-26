'use strict'
//FROM https://www.npmjs.com/package/images-scraper
var Scraper = require ('images-scraper')
  , google = new Scraper.Google()
  , bing = new Scraper.Bing()
  , pics = new Scraper.Picsearch()
  , yahoo = new Scraper.Yahoo();

var kw = process.argv[2];//'putty'
var folder = "images/"+kw.replace(/\s+/g, '');

var mkdirp = require('mkdirp');
mkdirp(folder, function(err) { 
    // path exists unless there was an error
});
 
// will take ALOT of time if num=undefined
google.list({
	keyword: kw,
	num: 50,
	detail: true,
	nightmare: {
		show: true
	},
  advanced: {
    imgType: 'photo', // options: clipart, face, lineart, news, photo
    resolution: undefined  // options: l(arge), m(edium), i(cons), etc.
  }
})
.then(function (res) {
	console.log('first 10 results from google');
}).catch(function(err) {
	console.log('err',err);
});
// listening on events is also possible
google.on('result', function(item) {
	console.log('result', item);
});

bing.list({
	keyword: kw,
	num: 50
})
.then(function (res) {
	digest(res, 'bing');
}).catch(function(err) {
	console.log('err',err);
});

pics.list({
	keyword: kw,
	num: 50,
}).then(function (res) {
	digest(res, 'pics');
}).catch(function (err) {
	console.log('err',err);
});

yahoo.list({
	keyword: kw,
	num: 50,
}).then(function (res) {
	digest(res, 'yahoo');
}).catch(function (err) {
	console.log('err',err);
});


function digest(res, engine) {
console.log('result count from '+engine, res.length);
for (var prop in res) {
	try {
		if(res[prop].url.indexOf('https')== -1 //&& res[prop].width>=1024
		&& res[prop].url.indexOf('?')== -1 && res[prop].url.indexOf(' ')== -1 && res[prop].url.indexOf('.jpg')> -1
		&& res[prop].url.indexOf('/')> -1
		)
		{
			console.log(engine+' ', res[prop].url);
			Download(res[prop].url, engine);
		}
	}
	catch(err) 
	{
		console.log('ERROR');
	}

}
};

function Download(url, engine) {
var http = require('http');
var fs = require('fs');
var filename = folder+'/'+engine+Date.now()+'.jpg'+url.substring(url.lastIndexOf('/')+1);
var file = fs.createWriteStream(filename);
//console.log(url);
//console.log(filename);
var request = http.get(url, function(response) {
  response.connection.setTimeout(2000);
  response.pipe(file);
});
request.on('error', function(err) {
    // Handle error
});
request.setTimeout( 2000, function( ) {
	request.end();    // handle timeout here
});

request.end();

};
