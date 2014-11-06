"use strict";

window.onload = function(){

	// I denna funktion ska du skriva koden för att hantera "spelet"
	var convertString = function(str){
		// Plats för förändring.		
		// Returnera den konverterade strängen.
		// Vid fel, kasta ett undantag med ett meddelande till användaren. 
		
		// Funktion som tar en regular expression, en sträng och en styling.
		// Styling kan vara 0, 1 eller ett regular expresseio
		var transform = function (regEx, str, styling) {
			return str.replace(regEx, function transformTo(findings, styling){
    			if (styling === 0) {
    				return findings.toUpperCase();
    			} else if (styling === 1) {
    				return findings.toLowerCase();
    			}else {return styling};
			});
		};

		str = transform(/[a-zåäö]+/g, str, 0);
		str = transform(/[A-ZÅÄÖ]+/g, str, "#");

		return str;





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