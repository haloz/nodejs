var net = require("net");

var sockets = [];
var server = net.createServer(function(socket) {
	sockets.push(socket);
	socket.write('hallo');
	socket.write('welt!');
	socket.write("\n");

	socket.on('data', function(data) {
		console.log("sending data to "+sockets.length+" sockets...");
		for(var i = 0, iLength = sockets.length; i < iLength; i++) {
			if(sockets[i] !== socket) {
				sockets[i].write(data);
			}
		}
	});

	socket.on('end', function(data) {
		sockets.splice(sockets.indexOf(socket));
	});

	//socket.end();
}).listen(3000);