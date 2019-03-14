//----------------------------------------------------------------------
//-----------------------Declare your Variables-------------------------
//----------------------------------------------------------------------
var number = 32443;
var newNumber;
var string = "webmaster";
var string2 = "prince of persia";
var string3 = "Web Development Tutorial";
//----------------------------------------------------------------------
//----------Magic happens here... WHOOOSH now it's on google------------
//----------------------------------------------------------------------

console.log(reverseOrder(number));
console.log(orderLetters(string));
console.log(upperCaser(string2));
console.log(getLongest(string3));

//----------------------------------------------------------------------
//----------------------------Functions---------------------------------
//----------------------------------------------------------------------

	//Gets a number and it's reversed #1
function reverseOrder(variable)
{
	var newStr; //Value will be stored here as a String
	var reversedStr = ""; //The reversed String starts empty

	newStr = String(variable); //Turns value into String type
	for (var i = newStr.length - 1; i >= 0; i--) //We run the string from last to first index and store each value in the reversed string
	{
		reversedStr += newStr[i];
	}

	return reversedStr;
}

	//Gets a string en turns it back in alphabetical order #2
function orderLetters(strVariable)
{
	var array = []; //String will be converted and stored here

	for (var i = 0; i < strVariable.length; i++) //Each letter is passed as a variable to the array
	{
		array[i] = strVariable[i];
	}
	array.sort();

	return array.join("");
}

	//Makes the first letter of every word of a string to Uppercase #3
function upperCaser(strVariable)
{
	strVariable.trim(); //Possible blank spaces erased
	var wordsArray = strVariable.split(' '); //Every word sliced and stored as a variable in the array
	var newStr = ""; // The result will be here

	for (var i = 0; i < wordsArray.length; i++) //we run the array and turn the first letter of every
												//variable into uppercase, and put it together with the rest of the words
	{
		newStr += wordsArray[i][0].toUpperCase() + wordsArray[i].slice(1);
		if (i != wordsArray.length) newStr += " "; //Insert space after word if we are not on the last position
	}

	return newStr.trim();
}

	//Runs the string and returns de longest word #4
function getLongest(strVariable)
{
	strVariable.trim();
	var wordsArray = strVariable.split(' ');
	var longestIndex = 0; //longest word set to be the first

	for (var i = 1; i < wordsArray.length; i++) { //Compares every lenght of the variables against the
												  //current longest one
		if((wordsArray[i].length - wordsArray[longestIndex].length) > 0)
			{
				longestIndex=i;
			}
	}

	return wordsArray[longestIndex];
}