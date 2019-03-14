var myName = "Daniel Nicolas";
var age = 24;
var ignasiAge = 32;
var ageDiff;

ageDiff = ignasiAge - age;

console.log("starting Javascript...");
console.log(myName, ", ", age); 
console.log("The difference between Ignasi's name and yours is:", ageDiff);

if (age<21) {
	console.log("You are not older than 21");
}
else {
	console.log("You are indeed older than 21");
}

if(age < ignasiAge){
	console.log("You are younger than Ignasi");
}
else if( age > ignasiAge){
	console.log("You are older than Ignasi");
}
else{
	console.log("You and Ignasi are the same age");
}

