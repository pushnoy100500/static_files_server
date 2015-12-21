'use strict'
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

//mime types
var mimeTypes = {
	'.html': 'text/html',
	'.jpeg': 'image/jpeg',
	'.jpg': 'image/jpg',
	'.png': 'image/png',
	'.javascript': 'text/javascript',
	'.css': 'text/css'
};

//Create server function
http.createServer(function(req, res) {
	var requestFile = req.url;
	var filePath = path.join(__dirname, requestFile);
	console.log(filePath);
	fs.stat(filePath, function(err, stats) {
		if(err) {
			if (err.code == "ENOENT") {
				res.writeHead(404, {'Content-Type': 'text/plain'});
				res.end('404 file not found');
				return;
			} else {
				res.writeHead(500, {'Content-Type': 'text/plain'});
				res.end('500 server error');
				return;
			}
		};

		if(!stats.isFile()) {
			res.writeHead(200, {'Content-Type': mimeTypes['.html']});
			fs.createReadStream('./index.html').pipe(res);
		} else {
			res.writeHead(200, {'Content-Type': mimeTypes[path.extname(filePath)]});
			fs.createReadStream(filePath).pipe(res);
		}
	});
	//res.end();
}).listen(3000, 'localhost');
