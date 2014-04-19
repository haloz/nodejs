var http = require("http");
var server = http.createServer(function(req, res) {
	res.writeHead(200, {
		"content-type" : "text/plain"
	});
	res.write("hallo");
	setTimeout(function() {
		res.end("welt");
	}, 5000);
}).listen(8080);