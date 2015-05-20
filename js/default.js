var settings = {
	dilemmaURL : "../server/dilemma.json"
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

document.addEventListener("DOMContentLoaded", function() {
 console.log('DOMContentLoaded');
 loadDilemma();
});