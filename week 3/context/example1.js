
// how does the 'this' keyword work?

// in object oriented programming 'this' refers to the object contiaing the code being run.

const cat = "meow"; //global variable

function doSomething(){
	console.log(cat);
}

doSomething();

function example1(){
	console.log(this);
}

new example1();