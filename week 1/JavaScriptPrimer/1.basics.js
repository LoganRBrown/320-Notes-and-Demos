
// there are several ways to declare variables in JS:

var example = "macaroni";
let age = 82;
const doILikePizza = true;

//Can't change value of a const

//JS is untyped. variable do NOT have datatypes and can switch what datatype they are storing. 

macaroni = 16.8;

console.log(macaroni);

//declraing functions: 

function doSomething(n){

	if(n == 1){
		return true;
	}
	else{
		return "banana";
	}
}

// arrays

var myArray = []; //empty array
var students = ["Vince", "Dominic", "Keegan", "Logan", "Andrew"];

students.push("Billy");

var stuff = [1, "cow", [], false, null];

// objects can be literal as well:

var myObj = {};

//literal objects use JSON: Javascript Object Notation

myObj = {
	age: 17,
	favoriteColor: "blue",
	isDead: false
	favoriteBooks: ["Dune","LOTR"],
};