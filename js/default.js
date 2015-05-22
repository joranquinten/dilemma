var settings = {
	dilemmaURL : "../server/dilemma.json",
	dilemmaTime : 60 * 1000
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
	
	startTimer();
	
	var request = new XMLHttpRequest();
	request.open('GET', settings.dilemmaURL, true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
		console.log('JSON loaded');
		var data = JSON.parse(request.responseText);
		console.log(data);
		
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
			var percentage = parseFloat(iCurrentTime/iMaxTime).toFixed(2)*100;
			console.log(percentage);
			gauge.style.width = percentage+'%';
			
			// Time up!
			if (iCurrentTime >= iMaxTime){
				gauge.style.width = '100%';
				stopTimer();
			}
			console.log(iCurrentTime);
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