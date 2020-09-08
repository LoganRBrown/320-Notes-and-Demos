const net = require("net"); //import nodejs module

const socketToServer = net.connect({port:320, ip:"127.0.0.1"}, ()=>{

	console.log("We are now connected to the server");
	socketToServer.write("hello! I am a client...");
});

socketToServer.on("error", errMsg=>{
	console.log("ERROR: " + errMsg);
});

//recieve info from our tcp socket
socketToServer.on("data", txt=>{
	console.log("Server says: " + txt);
});