
// in JS, functions are "First-class citizens", Functions are objects

// we have anonymous functions:

var sayHello = function(){
	console.log("Hello");
};

//this function calls the function that is passed into it

function doFunction(f){
	f();
}

doFunction(function(){ console.log("WOW!"); } );

//es6 ADDED ARROW FUNCTION:

//original
const square = function(n){return n*n; };

//arrow
const square = n => n*n; 

const mult = (a, b) => { return a*b; };

//a real scenario for anonymous functions

var people = ["nick", "sarah", "billy", "sam"];

people.forEach( item=>{
	console.log(item);
} );

