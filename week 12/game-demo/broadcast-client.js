

const sock = require("dgram").createSocket("udp4");

const packet = Buffer.From("Hello World!");

sock.send(packet, 0, packet.length, 320, "127.0.0.1", ()=> {
	sock.close();
});