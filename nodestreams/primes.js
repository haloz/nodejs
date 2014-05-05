var util = require("util"),
	stream = require("stream"),
	http = require("http");

var isPrime = function(n) {
	for(var i = 2; i <= Math.sqrt(n); i++) {
		if(n % i == 0) {
			return false;
		}
	}
	return true;
};

var Readable = stream.Readable;

var Primes = function(max, options) {
	options = options || {};
	options.objectMode = true;
	Readable.call(this, options); // basiskonstruktor 
	this._max = max;
	this._index = 2;
};

util.inherits(Primes, Readable);

Primes.prototype._read = function() {
	var foundPrime = false;
	do {		
		if(this._index > this._max) {
			this.push(null); // stream end = push null. So it's never possible to have a stream returning null's
			return;
		}
		if(isPrime(this._index)) {
			foundPrime = true;
			this.push(this._index);
		}
		this._index++;
	} while (!foundPrime);
};

// run
var server = http.createServer(function(req, res) {
	var primesStream = new Primes(100);
	primesStream.on('data', function(data) {
		//console.log(data);
		//primesStream.pipe(res);
		res.write(data.toString());
	});
	primesStream.on('end', function() {
		res.end();
	});
}).listen(8080);
