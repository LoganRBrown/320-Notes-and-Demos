exports.Client = class Client {
	constructor(rinfo){
		this.rinfo = rinfo;
		this.input = {
			axisH:0,
			axisV:0,
		};

	}
	onPacket(packet){
		if(packet.length < 4) return;
		const packetID = packet.slice(0,4).toString();
		switch(packetID){


			default:
				console.log("ERROR: Packet not recognized");
		}
	}
	
}