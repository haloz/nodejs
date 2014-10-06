var spdy = require("spdy"),
	fs = require("fs");

var options = {	
	"key" : fs.readFileSync(__dirname + "/keys/server-key.pem"),
	"cert" : fs.readFileSync(__dirname + "/keys/server-cert.pem"),
	"ca" : fs.readFileSync(__dirname + '/keys/server-ca.pem')

	// "rejectUnauthorized" : true,

	// requestCert: false,

 	// **optional** SPDY-specific options
  	// windowSize: 1024 * 1024, // Server's window size

  	// **optional** if true - server will send 3.1 frames on 3.0 *plain* spdy
  	// autoSpdy31: false
};

var server = spdy.createServer(options, function(req, res) {
	res.writeHead(200);
	res.end("hello world!");
}).listen(8443);