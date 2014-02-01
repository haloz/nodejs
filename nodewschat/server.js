var ws = require("nodejs-websocket"),
	wsOptions = {},
	connections = [],
	invalidConnections = {};

function isEmptyObject(obj) {
    var name;
    for (name in obj) {
        return false;
    }
    return true;
}

ws.createServer(wsOptions, function(conn) {
	connections.push(conn);
	console.log("num of connections:", connections.length);
	
	conn.on("text", function(msg) {
		for(var i = 0, iLength = connections.length; i < iLength; i++ ) {
			var thisConn = connections[i];	
			console.log("send msg '" + msg + "' to connection no. " + i);
			try {
				thisConn.sendText(msg.toUpperCase());
			} catch(ex) {
				console.log("connection", i, "invalid");
				invalidConnections[i] = true;
			}
		}

		// cleanup invalid connections
		console.log("invalidConnections", invalidConnections);
		console.log("active connections", connections.length);
		if(!isEmptyObject(invalidConnections)) {
			var newConnections = []
			for(var i = 0, iLength = connections.length; i < iLength; i++ ) {
				if(!invalidConnections[i]) {
					newConnections.push(connections[i]);
				}
			}
			connections = newConnections;
			console.log("updated active connections", connections.length);
		}
	});	
	conn.on("error", function(err) {
		console.log(err);
	});
	conn.on("close", function(msg) {
		//connections.remove(conn);
		// todo
	});
}).listen(8889);