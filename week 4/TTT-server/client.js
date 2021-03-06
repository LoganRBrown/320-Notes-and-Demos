
const PacketBuilder = require("./packet-builder.js").PacketBuilder;


exports.Client = class Client {
		constructor(sock, server){

				this.socket = sock;
				this.server = server;
				this.username = "";

				this.buffer = Buffer.alloc(0);

				this.socket.on("error",(e)=>this.onError(e));
				this.socket.on("close",()=>this.onClose());
				this.socket.on("data",(d)=>this.onData(d));

		}
		onError(errMsg){
			console.log("ERROR with Client: "+errMsg);
		}
		onClose(){
			this.server.onClientDisconnect(this);
		}
		onData(data){

			// add new data to buffer:
			this.buffer += data;

			//parse buffer for packets (process the packets)

			if(this.buffer.length < 4) return;

			const packetIndetifier = this.buffer.slice(0, 4).toString();

			switch(packetIndetifier){
				case "JOIN": 
					if(this.buffer.length < 5) return; // not enough data
					const lengthOfUsername = this.buffer.readUInt8(4);

					if(this.buffer.length < 5 + lengthOfUsername) return;
					const desiredUsername = this.buffer.slice(5, 5+lengthOfUsername).toString();

					// TODO: Check username...

					let responseType = this.server.generateResponseID(desiredUsername, this);
					
					//buld and send packet
					const packet = PacketBuilder.join(responseType);
					this.sendPacket(packet);

					// consume data out of the buffer
					this.buffer = this.buffer.slice(5 + lengthOfUsername);

					const packet2 = PacketBuilder.update(this.server.game);
					this.sendPacket(packet2);

					break;
				case "CHAT": break;
				case "PLAY": break;
					if(this.buffer.length < 6) return; //not enough data

					const x = this.buffer.readUInt8(4);
					const y = this.buffer.readUInt8(5);

					console.log("user wants to play at: " +x+" "+y);

					this.buffer = this.buffer.slice(6);

					this.server.game.playMove(this, x, y);


				default:
					// don't recognize the packet....
					console.log("ERROR: Packet identifier not recognized ("+packetIndetifier+")");
					this.buffer = buffer.alloc(0);
					break;
			}

			// process packets (and consume data from buffer)

		}

		sendPacket(packet){
			this.socket.write(packet);
		}


};