var util = require("util"),
	stream = require("stream"),
	http = require("http");


/*
	Prime
	A simple read stream that generates prime numbers
	outputs the stream data as floating point data (not as string!)
*/
var isPrime = function(n) {
	for(var i = 2; i <= Math.sqrt(n); i++) {
		if(n % i == 0) {
			return false;
		}
	}
	return true;
};

var Readable = stream.Readable;
var Transform = stream.Transform;

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



/*
	Stringifier
	A basic transform stream. This simply takes the raw/object data and applies a toString
	outputs the stringified values as stream
*/
var stringify = function(n) {
	return n.toString();
};

var Stringifier = function(options) {
	options = options || {};	
	 /*
	 	this is important! Without this the stream would be in "string" mode,
	 	allowing only strings as input. For raw/object data this parameter has to be set.
	 */
	options.objectMode = true;
	Transform.call(this, options);
};

util.inherits(Stringifier, Transform);

Stringifier.prototype._transform = function(chunk, encoding, callback) {
	var stringified = stringify(chunk);
	this.push(stringified, encoding);	
	callback();
};






// run
var server = http.createServer(function(req, res) {
	var primesStream = new Primes(1000); 
	var stringifyStream = new Stringifier(); 
	primesStream					// data source
		.pipe(stringifyStream)		// float to string
		.pipe(res);					// target
}).listen(8080);
