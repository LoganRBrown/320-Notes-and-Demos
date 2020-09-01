const net = require('net');

//atempts to connect to server:
const socket = net.connect({port:12345,host:"127.0.0.1"}, ()=>{
	console.log("You connected to the server!");
});

socket.on("error", errMsg=>{
	console.log("There was an error: " + errMsg);
});

socket.on("data", txt=>{
	console.log("message from server: "+txt);
	socket.write("thanks!");
});