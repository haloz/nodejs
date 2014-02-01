var socket = new WebSocket("ws://192.168.2.202:8889");
socket.onopen = function() {
	console.log("open");
};
socket.onerror = function(err) {
	console.log("error", err);	
};
socket.onmessage = function(msg) {
	console.log("msg", msg.data);
 	$("#output").append("<p>" + (new Date().toLocaleString()) + " | " + msg.data);
};

// $("#inputform :input[name=inputtext]")[0]
$( document ).ready(function() {
	$("#inputform :button[name=send]").on("click", function(event) {
		event.stopPropagation();
		event.preventDefault();
		var formtext = $("#inputform :input[name=inputtext]").val(); 
		console.log("formtext", formtext);
		socket.send(formtext);
	});
});