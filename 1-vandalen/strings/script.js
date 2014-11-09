"use strict";

window.onload = function(){

	// I denna funktion ska du skriva koden för att hantera "spelet"
	var convertString = function(str){

		// Declaring variable for the converted string
		var newStr = "";

		//Checking if string is empty, throwing error if so
		if (str != "") {
			// Looping through each character and checking if it's upper/lower case
			// and changing it to the opposite case
			for (var i = 0 ; i < str.length; i++) {
				var loopChar = str[i];
				if (loopChar === loopChar.toLowerCase()) {
					newStr = newStr + loopChar.toUpperCase();
				} else if (loopChar === loopChar.toUpperCase()) {
					newStr = newStr + loopChar.toLowerCase();
				};
				newStr = newStr.replace( /[Aa]/g, "#" ); // Replacing all A's and a's with #
			};
			return newStr; // Returning the new converted string
		} else {
			throw new Error("Skriv in en giltig textsträng.");
		};

	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = convertString(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}

	});



};
