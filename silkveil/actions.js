var url = require("url");
var http = require("http");

module.exports = {
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
