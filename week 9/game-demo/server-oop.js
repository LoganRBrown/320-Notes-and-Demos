class Game {
	constructor(server){

		this.time = 0;
		this.dt = 16/1000;

		this.ballPos = {
			x: 0,
			y: 0,
			z: 0
		};

		this.server = server;
		this.update();

	}
	update(){

		this.time += this.dt;

		this.ballPos.x = Math.sin(this.time) * 2;

		this.sendBallPos();

		setTimeout(()=>this.update(), 16);
	}
	sendBallPos(){
		const packet = Buffer.alloc(16);
		packet.write("BALL", 0);
		packet.writeFloatBE(this.ballPos.x, 4);
		packet.writeFloatBE(this.ballPos.y, 8);
		packet.writeFloatBE(this.ballPos.z, 12);

		this.server.broadcast(packet);
	}
}

class Server{
	constructor(){

		this.clients = [];

		//create socket:
		this.sock = require("dgram").createSocket("udp4");

		//setup event listener
		this.sock.on("error", (e)=>this.onError(e));
		this.sock.on("listening", ()=>this.onStartListen());
		this.sock.on("message", (msg,rinfo)=>this.onPacket(msg,rinfo));

		this.game = new Game(this);

		// bind socket to port: (Start Listening)
		this.port = 320;
		this.sock.bind(this.port);
	}
	onError(e){
		console.log("ERROR: "+e);
	}
	onStartListen(){
		console.log("Server is listening on port "+this.port);
	}
	onPacket(msg, rinfo){

		if (msg.length < 4) return;

		const packetID = msg.slice(0,4).toString();
		switch(packetID){
			case "JOIN":
				if(!this.doesClientExist(rifno)) this.clients.push(rinfo);
				break;
		}

		console.log("message received from "+rinfo.address+" : "+rinfo.port);
	}
	doesClientExist(rinfo){
		let vlaue = false;

		this.clients.forEach(c=> {
			if(c.address == rinfo.address && c.port == rinfo.port) value = true;
		});

		return value;
	}
	broadcast(packet){
		this.clients.forEach(c=>{

			this.sock.send(packet,0,packet.length,c.port, c.address, ()=>{

			});

		});
	}
}



new Server();