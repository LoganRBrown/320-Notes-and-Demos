const sock = require("dgram").createSocket("udp4");

sock.on("listening", ()=>{
	console.log("Packet recieved!");
});
sock.on("message", ()=>{
	console.log("Packet recieved!");
});

sock.bind(320);