//Call API from omdbapi.com

'use strict';
  
// Function that handles API call to omdb
var callAPI = function(url){
	 	
	// instansiate httprequest object
	var httpRequest = new XMLHttpRequest();

	// define event handler for state changes 
	httpRequest.onreadystatechange = function(){
		
		// check to see if readystate is done
		if ( httpRequest.readyState === XMLHttpRequest.DONE) {
			// check to see if status is okay
			if ( httpRequest.status === 200 ) {
				
				// declare and define movieObject to hold omdb object
				var movieObject = JSON.parse(httpRequest.responseText);

					//reference source
					var source = $('#movie-spot').html(); 
					
					//complile the source markup
					var template = Handlebars.compile(source)
					
          			//Create a for loop with the length equaling number of found titles
					for (var i = 0 ; i < movieObject.Search.length; i++) {
						
						// declare and define movieData object
						var movieData = {
							image: movieObject.Search[i].Poster,
							title: movieObject.Search[i].Title,
							year: movieObject.Search[i].Year,
							imdb: movieObject.Search[i].imdbID,
							type: movieObject.Search[i].Type
						};
						
						// pass movieData object to template
						var fullText = template(movieData);
						
						//append container class. Loop until done.
						$('.container').append(fullText);
					}
	
			}

		}
	};

	// initialize request
	httpRequest.open('GET', url);	
				
	//send request
	httpRequest.send();

	
};

// On button click, invoke callAPI function and pass omdb url and query: search X-men
document.getElementById('getCustomDataButton').onclick = function(){
	var movieQuery = "http://www.omdbapi.com/?s=X-men&apikey=7fe29f8b";
	callAPI(movieQuery);
};