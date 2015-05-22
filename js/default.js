var settings = {
	dilemmaURL : "../server/dilemma.json",
	dilemmaTime : 10 * 1000
};

var options = {
	debugMode : true
};

var utils = {
	applyLoader: function(oTarget){
	},
	removeLoader: function(oTarget){
	}
};

function loadDilemma(){
	var timeout = setTimeout(function(){startTimer();}, 1000);
	var request = new XMLHttpRequest();
	request.open('GET', settings.dilemmaURL, true);
	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
		console.log('JSON loaded');
		var r = JSON.parse(request.responseText);
		var t = Handlebars.compile(document.getElementById('dilemma-cards').innerHTML);
		console.log(r);
		var collection = r.dilemma.items;
		var output = t({dilemma:collection});
		document.getElementById('dilemma__loader').innerHTML = output;
		
		
		// Add interaction
		var cards = document.querySelectorAll('.dilemma__card');
		for (var i=0; i < cards.length; i++){
			cards[i].addEventListener('click', function(e) {
				e.preventDefault();
				[].map.call(document.querySelectorAll('.dilemma__card--active'), function(el) {
                el.classList.remove('dilemma__card--active');
            });		
            this.classList.add('dilemma__card--active'); 
			});
		}
		
	  } else {
		console.log('Error loading '+ settings.dilemmaURL);
	  }
	};
	request.onerror = function() {
	  console.log('Connection error');
	};
	request.send();
}

// Make a class out of this!
var intervalTimer, iCurrentTime = 0, iMaxTime = settings.dilemmaTime, gauge = document.querySelector('.dilemma__gauge__fill');
function startTimer(){
	intervalTimer = setInterval(function(){
			iCurrentTime += 500;
			
			// Move indicator
			var percentage = (parseFloat(iCurrentTime/iMaxTime).toFixed(2)*100).toFixed(2);
			gauge.style.width = percentage+'%';
			
			// Time up!
			if (iCurrentTime >= iMaxTime){
				gauge.style.width = '100%';
				stopTimer();
				var timeout = setTimeout(function(){loadDilemma();},1000);
			}
		}, 500
	);
}
function stopTimer(){
	iCurrentTime = 0;
	clearInterval(intervalTimer);
}
function resetTimer(){
	iCurrentTime = 0;
	clearInterval(intervalTimer);
	gauge.style.width = '0%';
}


document.addEventListener("DOMContentLoaded", function() {
 console.log('DOMContentLoaded');
 
 var button__start = document.querySelector('#button__start');
 button__start.addEventListener('click', function(){

	// Remove info
	var info = document.querySelectorAll('.dilemma__info');
		Array.prototype.forEach.call(info, function(el, i){
		if (el.classList){ 
			el.classList.add('bounceOut');
		} else {
			el.className += ' ' + 'bounceOut';
		}
	});
	
	loadDilemma();
 }, false);
});