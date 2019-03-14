//----------------------------------------------------------------------
//--------------------Declare your Variables----------------------------
//----------------------------------------------------------------------
var myName = "Daniel Nicolas";
var age = 24;
var ignasiAge = 32;
var ageDiff;
var lowerValue;
var higherValue;
var index = 3;

//classNames[20];
var classNames = ["Teresa","Alex","Arnau","Barbara","Cristine",
				"Daniel","David","Enrique","Fernando","Hamed",
				"Julia","Miguel","Mohamed","Nathe","Pedro",
				"Ram","Rosa","Santiago","Sergi","Aaron",
				"Victor"];
//ages[11];
var ages = [22, 27, 20, 25, 28, 23, 24, 18, 26, 19, 21, 27, 28, 18, 21];

var myColor = ["Red", "Green", "White", "Black"];

//----------------------------------------------------------------------
//--------------------Magic happens here... WHOOOSH---------------------
//----------------------------------------------------------------------

classNames.sort();
for( var i = 0; i < classNames.length; i++){ //---------------------Prints all names sorted. HIDDEN
	console.log(classNames[i]);
}

for(var i = 0; i<= ages.length; i++){ //----------------------------Prints all ages. HIDDEN
	if(ages[i]%2 != 0) console.log(ages[i]);
}

lowerValue=getLowest(ages);
console.log("This is the lowest value of the array: " + lowerValue);

higherValue=getHighest(ages);
console.log("This is the highest value of the array: " + higherValue);

console.log("This is the value on position nº " + index + ": " + getDesValue(ages, index));

console.log("Those are the repeated numbers of the array: " + getRepeated(ages));

console.log("Those colors were on the array. Now they are in a string! " + arrayToString(myColor));

//----------------------------------------------------------------------
//--------------------Functions-----------------------------------------
//----------------------------------------------------------------------

//Gets the lowest value of the given array
function getLowest(array){
	var currentLowest = array[0];

	for(var i = 1; i <= array.length; i++){
		if((array[i] - currentLowest) < 0) currentLowest=array[i];
	}

	return currentLowest;
}

//Gets the highest value of the given array
function getHighest(array){
	var currentHighest = array[0];

	for(var i = 1; i <= array.length; i++){
		if((currentHighest - array[i]) < 0) currentHighest=array[i];
	}

	return currentHighest;
}

//Gets the value by index of the given array
function getDesValue(array, desiredIndex){
	return array[desiredIndex];
}

//Get values that repeat
function getRepeated(array){
	var repeatedValues = [];
	for (var x = 0; x < array.length; x++) {
		for (var y = 0; y < array.length; y++) {
			if (  (x!=y) && (array[x]==array[y]) && (repeatedValues.indexOf(array[x])<0)  ){
				repeatedValues.push(array[x]);
			}
		}
	}
	return repeatedValues;
}

//Passes an array to a string
function arrayToString(array){
	var newString;
	newString = array.toString();
	return newString;
}