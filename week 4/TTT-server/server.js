const Client = require("./client.js").Client;


exports.Server = {

	port:320,
	clients: [],
	start(){
		this.socket = require("net").createServer({}, c=>this.onClientConnect(c));
		this.socket.on("error", e=>this.onError(e));
		this.socket.listen({port:this.port},()=>this.onStartListen());
	},
	onClientConnect(socket){
		console.log("new connection from "+socket.localAddress);

		const client = new Client(socket, this);
		this.clients.push(client);
	},
	onClinetDisconect(client){
		const index = this.client.indexOf(client); //find object in array
		if(index >= 0) this.clients.splice(index, 1); // remove the object from the array
	},
	onError(e){
		console.log("ERROR with listener: "+e);
	},
	onStartListen(){
		console.log("Server is now listening on port "+this.port);
	},

};
