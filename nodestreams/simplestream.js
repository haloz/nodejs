var fs = require("fs"),
	http = require("http"),
	zlib = require("zlib"),
	path = require("path");

var server = http.createServer(function(req, res) {
	res.writeHead(200, {
		"Content-Encoding" : "gzip"
	});
	var readableStream = fs.createReadStream(path.join(__dirname, req.url))
		.pipe(zlib.createGzip())
		.pipe(res);
});
server.listen(8080);