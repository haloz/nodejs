function isEmptyObject(obj) {
    var name;
    for (name in obj) {
        return false;
    }
    return true;
}

// Websockets

var ws = require("nodejs-websocket"),
	wsOptions = {},
	connections = [],
	invalidConnections = {};


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

// HTTP/HTTPS Webserver

var http = require("http"),
	fs = require("fs"),
	mime = require("mime"),
	url = require("url");

http.createServer(function httpServer(req, res) {
	var pathName = url.parse(req.url).pathname;
	if(pathName === '/') {
		pathName = "index.html";
	} else {
		pathName = __dirname + pathName;
	}
	console.log("pathname", pathName);
	fs.exists(pathName, function(exists) {
		if(exists) {
			res.writeHead(200, {
				'Content-Type' : mime.lookup(pathName)
			});
			res.write(fs.readFileSync(pathName));
			res.end();
		}
		else {
			res.writeHead(404);
			res.end();
		}
	});
}).listen(8888);