const Pawn = require("./class-pawn.js").Pawn;
const Game = require("./class-game.js").Game


exports.Client = class Client {

	static TIMEOUT = 8;

	constructor(rinfo){
		this.rinfo = rinfo;
		this.input = {
			axisH:0,
			axisV:0,
		};

		this.pawn = null;
		this.timeSinceLastPacket = Game.Singleton.time; // measured in seconds

	}
	spawnPawn(game){

		if(this.pawn) return;

		this.pawn = new Pawn();
		game.spawnObject( this.pawn );

	}
	update(game){

		const game = Game.Singleton;

		if(game.time > this.timeSinceLastPacket + Client.TIMEOUT){
			this.server.disconnectClient(this);

		}
	}
	onPacket(packet, game){
		if(packet.length < 4) return;
		const packetID = packet.slice(0,4).toString();

		// no access to game?
		this.timeSinceLastPacket = game.time;

		switch(packetID){
			case("INPT"):
				if(packet.length < 5) return;
				this.input.axisH = packet.readInt8(4);

				//send input to Pawn object
				if(this.pawn) this.pawn.input = this.input;

				break;


			default:
				console.log("ERROR: Packet not recognized");
		}
	}

}