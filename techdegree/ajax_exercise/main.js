//Call API from omdbapi.com

'use strict';
  
// Function that handles API call and Print
var callAPI = function(url){
	 	
	// instansiate httprequest object
	var httpRequest = new XMLHttpRequest();

	// define event handler for state changes 
	httpRequest.onreadystatechange = function(){
		
		// check to see if readystate is done
		if ( httpRequest.readyState === XMLHttpRequest.DONE) {
			// check to see if status is okay
			if ( httpRequest.status === 200 ) {
				
				// create a data object and call it movieOject
				var movieObject = JSON.parse(httpRequest.responseText);

					//reference
					var source = $('#movie-spot').html(); 
					
					//complile the source markup
					var template = Handlebars.compile(source)
					

					for (var i = 0 ; i < movieObject.Search.length; i++) {
						
						// define the data object
						var movieData = {
							image: movieObject.Search[i].Poster,
							title: movieObject.Search[i].Title,
							year: movieObject.Search[i].Year,
							imdb: movieObject.Search[i].imdbID,
							type: movieObject.Search[i].Type
						};
						
						// pass data object to template
						var fullText = template(movieData);
						
						//append
						$('.container').append(fullText);
					}
	
			}

		}
	};

	// initializes request
	httpRequest.open('GET', url);	
				
	//send request
	httpRequest.send();

	
};

// On Button Click invoke callAPI function and pass OMD url and query: search X-men
document.getElementById('getCustomDataButton').onclick = function(){
	var movieQuery = "http://www.omdbapi.com/?s=X-men&apikey=7fe29f8b";
	callAPI(movieQuery);
};
 	

	

