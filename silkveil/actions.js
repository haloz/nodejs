var url = require("url");
var http = require("http");
var fs = require("fs");

var deliverDownload = function(res, mapping, data) {
	var contentDisposition = mapping.forceDownload ? "attachment" : "inline";
	res.writeHead(data.statusCode, {
		"Content-Type" : mapping.contentType,
		"Content-Disposition" : contentDisposition + "; filename=" + mapping.fileName + ";"
	});
	data.pipe(res);
};

module.exports = {
	"download" : function(res, mapping) {
		var options = url.parse(mapping.url);
		console.log("download", "|", options.protocol, "|", options.host, "|", options.path);
		switch(options.protocol) {
			case "http:" :
				http.get(url.parse(mapping.url), function(data) {
					deliverDownload(res, mapping, data);
				});
				break;
			case "file:" :
				var data = fs.createReadStream(options.host + options.path);
				data.statusCode = 200;
				deliverDownload(res, mapping, data);
				break;
		}
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
