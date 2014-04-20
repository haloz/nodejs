var http = require("http");
var url = require("url");

var mappings = {
	"sebastian" : {
		"action" : "redirect",
		"url" : "http://www.justpowered.de",
		"permanent" : false
	},
	"winterlinge" : {
		"action" : "download",
		"url" : "http://farm8.staticflickr.com/7377/12860226615_c7b3c89940_m.jpg",
		"fileName" : "winterlinge.jpg",
		"contentType" : "image/jpeg",
		"forceDownload" : false
	}
};

var actions = {
	"download" : function(res, mapping) {
		console.log("download", res.toString(), mapping.toString());
		http.get(url.parse(mapping.url), function(data) {
			var contentDisposition = mapping.forceDownload ? "attachment" : "inline";
			res.writeHead(data.statusCode, {
				"Content-Type" : mapping.contentType,
				"Content-Disposition" : contentDisposition + "; filename=" + mapping.fileName + ";"
			});
			data.pipe(res);
		});
	},
	"error" : function(res, mapping) {
		console.log("error", res.toString(), mapping.toString());
		res.writeHead(mapping.statusCode, {
			"Content-Type" : "text/html"
		});
		res.end(mapping.statusCode + " " + mapping.data);
	},
	"redirect" : function(res, mapping) {
		console.log("redirect", res.toString(), mapping.toString());
		res.writeHead(mapping.permanent ? 301 : 307, {
			"Location" : mapping.url
		});
		res.end();
	}
};

var server = http.createServer(function(req, res) {
	console.log("requested url:", req.url);
	var alias = req.url.substring(1);
	var mapValue = mappings[alias] || {
		"action" : "error",
		"statusCode" : 404,
		"data" : "File not found"
	};
	actions[mapValue.action](res, mapValue); 
}).listen(8080);