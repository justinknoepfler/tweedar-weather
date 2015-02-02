// initalizations

var jsondbdata = null;

var http = require('http'),
	 url = require('url'),
	 querystring = require('querystring');
	 path = require('path'),
	 fs = require('fs'),
	 extTranslator = require('./extTranslator.jsm'),
	 webroot = 'C:/Users/holland/Desktop/tweedar/tweedar',
	 options = {
	 	host: 'http://104.236.183.103:4567',
	 	path: '/api/gridmap'
	 };

callback = function (response) {
	console.log('entering GET callback function');
	var str = '';
	response.on('data',function (chunk) {
		console.log('received data');
		str += chunk;	
	});
	response.on('end',function () {
		console.log(str);	
		jsondbdata = str;
	});
};

function handleHTTPRequest(req,res) {
	try {
		console.log('HTTP_REQUEST: ' + req.connection.remoteAddress + 'to URL ' + req.url);
		console.log(url.parse(req.url).pathname);
		
		//redirect access to dir to default file
		if(url.parse(req.url).pathname == '/'){
			req.url += 'main.html';
		}
				
		
		/*
		var query= url.parse(req.url).query;
		if (query != null) {
			//var path = 'http://104.236.183.103:4567/api/gridmap';
			console.log('received GET query');
			//var timestamp = querystring.parse(query)["timestamp"];
			//timestamp = timestamp.slice(0,13);
			//path = path +"/"+ timestamp;
			//console.log('sending http GET request to: '+path);
			http.get('http://104.236.183.103:4567/api/gridmap/1415812111619',function (response) {
				console.log('entering GET callback function');
				var str = '';
				response.on('data',function (chunk) {
					console.log('received data');
					str += chunk;	
				});
				response.on('end',function () {
					console.log(str);	
					jsondbdata = str;
				});
			});
		}
	*/
		var targetPath = path.normalize(webroot + req.url),
			 extension = path.extname(targetPath).substr(1);
			 
		fs.exists(targetPath, function(exists) {
			if(exists){
//console.log("fs.exsists");
				res.statusCode = 200;
				res.setHeader('Content-type',extTranslator(extension));
				fs.createReadStream(targetPath).pipe(res);
			}
			else if (url.parse(req.url).pathname == '/gettimestamps') {
				try {
					http.get('http://104.236.183.103:4567/api/gridmap',function (response) {
							console.log('entering GET callback function for /api/gridmap');
							var str = '';
							response.on('data',function (chunk) {
								console.log('received data');
								str += chunk;	
							});
							response.on('end',function () {
								console.log("received all json data");	
								res.statusCode = 200;
								res.setHeader("Content-Type","application/json");
								res.write(str);
								res.end();
							});
						});
					}
				catch (e) {	
					res.statusCode = 404;
					res.end('404 Not Found');
				}
			}
			else {	
				try {
					http.get('http://104.236.183.103:4567/api/gridmap'+url.parse(req.url).pathname,function (response) {
						console.log('entering GET callback function');
						var str = '';
						response.on('data',function (chunk) {
							console.log('received data');
							str += chunk;	
						});
						response.on('end',function () {
							console.log("received all json data");	
							res.statusCode = 200;
							res.setHeader("Content-Type","application/json");
							res.write(str);
							res.end();
						});
					});
				}	
				catch (e) {	
					res.statusCode = 404;
					res.end('404 Not Found');
				}
			}	
		});
		
		
	
	} catch(e){
		console.log('ERROR: '+e.message);
		res.statusCode = 500;
		res.end('500 Server error occured');
	}
}

http.createServer(handleHTTPRequest).listen(8080);

/*
var http = require('http'),
	 url = require('url'),
	 path = require('path'),
	 fs = require('fs'),
	 extTranslator = require('./extTranslator.jsm'),

function handleHTTPRequest(request,result) {
	try {
		
		//Deal with html files 
		//var pathname = url.parse(request.url).pathname;
		//console.log("Request for " + pathname + " received.");
		
		//if(pathname == '/'){
		//	request.url += 'main.html';
		//}
		if(request.url.charAt(request.url.length - 1) == '/'){
			request.url += 'main.html';
		}
		var targetPath = path.normalize(webroot + request.url),
			 extension = path.extname(targetPath).substr(1);
			 
		fs.exists(targetPath, function(exists) {
			if(exists){
				result.statusCode = 200;
				result.setHeader('Content-type',extTranslator(extension));
				fs.createReadStream(targetPath).pipe(res);			
			}
			else {
				result.statusCode = 404;
				result.end('404 Not Found');
			}	
		});
		
		//Deal with GET queries 
		 
		var querystring = url.parse(string).query;
		console.log("query: "+querystring);
		
	} catch(e){
		console.log('ERROR: '+e.message);
		result.statusCode = 500;
		result.end('500 Server error occured');
	}
}

http.createServer(handleHTTPRequest).listen(8080);*/

