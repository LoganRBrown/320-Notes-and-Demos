
// sometimes 'this' is mapped onto other objects
//specifically, when using event-listeners

//'this' gets mapped as the event object (not global)
setTimeout(
	function(){ 
		console.log(this) 
	}
, 100);

//arrow functions (()=>) do NOT change the context of 'this':

setTimeout(()=>{ console.log(this) }, 100);


class server {
	constructor(){

		this.port = 1234;

		/*
		//this does not work.
		const sock = require('net').createServer({}, function(){
			console.log(this.port);
		});
		*/

		const sock = require('net').createServer({}, ()=>{
			console.log(this.port);
		});
	}
}