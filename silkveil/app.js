var http = require("http");

var mappings = require("./mappings");
var actions = require("./actions");

var server = http.createServer(function(req, res) {
	console.log("requested url:", req.url);
	var alias = req.url.substring(1);
	var mapValue = mappings[alias] || mappings["error"]; 
	actions[mapValue.action](res, mapValue); 
}).listen(8080);