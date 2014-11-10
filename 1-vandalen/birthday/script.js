"use strict";

window.onload = function(){


	var birthday = function(date){

		// Check if date is in a valid format
		var dateFormat = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/; //Regex for date format YYYY-MM-DD
		if (!dateFormat.test(date)) {
			throw new Error("Fel! Ange ett datum i formatet ÅÅÅÅ-MM-DD.")
		};

		 var birthday = new Date(date);
		 console.log(birthday);

		 var today = new Date();
		 console.log(today)



		return 1; // Test



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
			var answer = birthday(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}

	});



};
