var moment = require("moment");

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
		"forceDownload" : false,
		"constraints" : {
			"validFrom" : [ moment(Date.UTC.apply({}, [2014, 0, 1])) ],
			"validBefore" : [ moment(Date.UTC.apply({}, [2014, 11, 31, 23, 59, 59])) ]
		}
	},
	"sagradafamilia" : {
		"action" : "download",
		"url" : "file://./img/sagradafamilia.jpg",
		"fileName" : "sagradafamilia.jpg",
		"contentType" : "image/jpeg",
		"forceDownload" : false 
	},
	"error" : {
		"action" : "error",
		"statusCode" : 404,
		"data" : "File not found"
	}
};
module.exports = mappings;