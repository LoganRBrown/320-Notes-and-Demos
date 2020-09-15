const net = require("net");


//represents our protocol
const Packet = {
	charEndOfPacket:"\n",
	charDelimiter: "\t",
	buildChat:function(username,message){
		return this.buildFromParts(["CHAT",username,message]);
	},
	buildAnnouncement:function(message){
		return this.buildFromParts(["ANNC", message]);
	},
	buildNameOkay:function(){
		return this.buildFromParts(["NOKY"]);
	},
	buildNamebad:function(){
		return this.buildFromParts(["NBAD",error]);
	},
	buildDM:function(username,message){
		return this.buildFromParts(["DMSG",usernameFrom,message]);
	},
	buildList:function(arrOfClients){

		const arrayOfUsernames = [];

		arrOfClients.forEach(c=>{
			if (c.username) arrayOfUsernames.push(c.username);
			else arrayOfUsernames.push(c.socket.localAddress);
		});

		arrayOfUsernames.unshift("LIST");

		return this.buildFromParts(arrayOfUsernames);
	},
	buildFromParts:function(arr){
		return arr.join(this.charDelimiter)+this.charEndOfPacket;
	},
};

class Client {
	constructor(socket, server){

		this.buffer = "";
		this.username = "";
		this.socket = socket;
		this.server = server;
		this.socket.on("error", e=>this.onError(e));
		this.socket.on("close", ()=>this.onDisconnect());
		this.socket.on("data", d=>this.onData(d));
	}

	onError(errMsg){
		console.log("ERROR with "+this.socket.localAddress+" : "+errMsg)
	}
	onDisconnect(){
		server.onClientDisconnect(this);
	}
	onData(data){

		this.buffer += data;

		//split buffer apart into "packets":
		const packets = this.buffer.split("\n");

		// remove last item in array
		// and set buffer to it:
		this.buffer = packets.pop();

		//handle all complete packets:
		packets.forEach(p=>this.handlePacket(p));

	}

	handlePacket(packet){

		//split the packet into parts
		const parts = packet.split("\t");

		switch(parts[0]){
			case "CHAT":

				server.broadcast(packet.buildChat(this.username, parts[1]))

				break;
			case "DMSG":
				break;
			case "NAME":

				const newname = parts[1];

				this.username = newname;
				this.sendPacket( Packet.buildNameOkay() );

				// TODO: Send LIST packet to all users
				break;
			case "LIST":

				this.sendPacket( Packet.buildList( this.server.clients ) );

				break;
		}
	}
	sendPacket(packet){
		this.socket.write(packet);
	}

}

class server{
	constructor(){

		this.port = 320;

		this.clients = []; // currently connected clients

		this.socket = net.createServer({}, c=>this.onClientConnect(c));
		this.socket.on("error", e=>this.onError(e));
		this.socket.listen({port:this.port}, ()=>this.onStartListen());
	}
	onStartListen(){
		console.log("the server is now listening on port "+this.port);
	}
	onClientConnect(socketToClient){
		console.log("A new client connected from "+socketToClient.localAddress);

		cosnt client = new Client(socketToClient, this);
		this.clients.push(client);

		//TODO: Broadcast a LIST packet to everyone
	}
	onClientDisconnect(client){
		//remove this client object from the server list:
		this.clients.splice(server.clients.indexOf(client), 1);
		//TODO: Broadcast a LIST packet to everyone
	}
	onError(errMsg){
		console.log("ERROR: " + errMsg);
	}
	broadcast(packet){
		//send a packet to all
		this.clients.forEach(c=>{
			c.sendPacket(packet);
		});
	}


const server = new server();