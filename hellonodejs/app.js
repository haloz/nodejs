var net = require("net");
var server = net.createServer(function(socket) {
	socket.write('hallo');
	socket.write('welt!');
	socket.write("\n");
	socket.end();
}).listen(3000);