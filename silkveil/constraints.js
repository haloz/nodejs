var moment = require("moment");

var constraints = {
	"validBefore" : function (datetime) {
		var now = moment();
		return now.diff(datetime) <= 0;
	},
	"validFrom" : function (datetime) {
		var now = moment();
		return now.diff(datetime) >= 0;
	}
};

var verify = function (mapping) {
	if(!mapping.constraints) {
		return mapping;
	}
	console.log("mapping.constraints", mapping.constraints);
};

module.exports.verify = verify;