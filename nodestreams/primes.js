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
	//options.objectMode = true;
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
			/*
				Note: method 1: return floating point numbers, but then the app that uses the stream
				has to convert the data e.g. into a string.
				method 2: store stings of the numbers so we can directly use .pipe()
			*/
			this.push(this._index.toString());
		}
		this._index++;
	} while (!foundPrime);
};

// run
var server = http.createServer(function(req, res) {
	var primesStream = new Primes(1000);
	primesStream.pipe(res);
}).listen(8080);
