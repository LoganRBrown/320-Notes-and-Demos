const NetworkObject = require("./class-networkobject.js").NetworkObject;

exports.Pawn = class Pawn extends NetworkObject {
	constructor(){
		super();
		this.classID = "PAWN";

		this.velocity = {x:0,y:0,z:0};

		this.input = {};
	}
	accelerate(vel, acc, dt){
		if(acc){
			vel += acc *dt;
		}
		else {
			//not pressing left or right
			// SLOW DOWN

			if(vel > 0){ //moving right
				acc = -1; //accelerate left
				vel += acc *dt;
				if(vel < 0) vel = 0;
			}
			if(vel < 0){ //moving left
				acc = 1; //accelerate right
				vel += acc *dt;
				if(vel > 0) vel = 0;
			}
		}
		return vel ? vel : 0;
	}
	update(game){

		//this.position.x = Math.sin(game.time);

		let moveX = this.input.axisH|0; // -1, 0, or 1

		this.velocity.x = this.accelerate(thi.velocity.x, movex, game.dt);

		

		this.position.x += this.velocity.x * game.dt;

	}
	serialize(){

		let b = super.serialize();

		return b;
	}
	deserialize(){

	}
}