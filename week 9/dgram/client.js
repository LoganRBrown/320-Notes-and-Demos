
//require module:
const dgram = require("dgram");

//create UDP socket:
const sock = dgram.createSocket('udp4');

//create a packet:
const packet = Buffer.from("Hello World!");

//send packet:
sock.send(packet, 0, packet.length, 320, "127.0.0.1", ()=>{
	console.log("Packet sent :)");
	sock.close();
});