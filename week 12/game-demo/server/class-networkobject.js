exports.NetworkObject = class NetworkObject {

	static _idCount = 0;

	constructor(){

		thic.classID = "NWOB";
		this.networkID = ++NetworkObject._idCount;
	}

	serialize(){

	}
	deserialize(){
		
	}
}