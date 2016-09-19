//Call API from omdbapi.com

'use strict';
  
// Function that handles API call to omdb
var callAPI = function(url, name){
	 	
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

				//Check to see if search revealed results
				if ( movieObject.Search !== undefined) {
					//reference source
					var source = $('#movie-spot').html(); 
					
					//complile the source markup
					var template = Handlebars.compile(source)
					
          			//Create a for loop with the length equaling number of found titles
					for (var i = 0 ; i < movieObject.Search.length; i++) {
						
						// declare and define movieData object
						var movieData = {
							image: "http://img.omdbapi.com/?i=" + movieObject.Search[i].imdbID + "&apikey=7fe29f8b",
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
				} else {
					// If No results post notificaton
					$('#nothing-found').html("<h2>'" + name + "' Returned Nothing</<h2>");

					return;
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
$('#getCustomDataButton').on('click', function(e){

	// prevent natutal form submit event
	e.preventDefault();
	// check to see if search box has value
	if( $('#movie-name').val().trim() === "" || $('#movie-name').val().trim() === null ) {
		// if search box is empty, do nothing
		return;
	} else {
		//  clear old results
		$('.section').remove();

		// clear 'no results' notification
		$('#nothing-found').html("");

		// get input box value and invoke callAPI function
		var movieName = $('#movie-name').val().trim();
		$('#movie-name').val("");
		var movieQuery = "http://www.omdbapi.com/?apikey=7fe29f8b&s=" + movieName;
		callAPI(movieQuery, movieName);
	}
});


