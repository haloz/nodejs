var fs = require("fs"),
	http = require("http"),
	zlib = require("zlib"),
	path = require("path");

var server = http.createServer(function(req, res) {
	var myfile = path.join(__dirname, req.url);
	fs.exists(myfile, function(exists) {
		if(exists) {
			res.writeHead(200, {
				"Content-Encoding" : "gzip"
			});
			var readableStream = fs.createReadStream(myfile)
				.pipe(zlib.createGzip())
				.pipe(res);
		} else {
			res.writeHead(404);
			res.end();
		}
	});
});
server.listen(8080);