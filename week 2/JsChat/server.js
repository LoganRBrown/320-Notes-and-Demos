const net = require("net"); // import nodejs TCP socket Module

const clients = []; // an array of all currently connected clients

const listeningSocket = net.createserver({}, (socketToClient)=>{

	console.log(socketToClient.localAddress + " has connected!");

	clients.push(socketToClient); //add new client to list of clients

	socketToClient.on("error", errMsg=>{ //errMsg is a parameter that we are passing into a function.
		console.log("ERROR: " + errMsg);
	});

	socketToClient.on("close", ()=>{
		console.log("A client has disconnected...");
		clients.splice(clients.indexOf(socketToClient), 1); //fetching the index of the client and using the splice to remove a specific item from the array.
	});

	socketToClient.on("data", txt=>{
		console.log("client says: " + txt);
		// TODO: send message to all connected clients
		BroadcastToAll(txt);
	});
	socketToClient.write("Welcome to my Server. Be nice of GTFO");

});

listeningSocket.listen({port:320}, ()=>{ 
	
	console.log("The Server is now listening for incoming connections..."); 

	// listeningSocket.close();

});

function BroadcastToAll(txt, clientToSkip){
	clients.forEach(client=>{
		if (client != clientToSkip) client.write(txt);
	});
}