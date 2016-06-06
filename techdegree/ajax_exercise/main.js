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
				// creat an empty variable to store HTML build
				var HTMLBuild="";
				
				// iterate through movieObject's supplied array
				for ( var i = 0 ; i < movieObject.Search.length ; i++) {
					
					// capture values for specific keys 
					var image = movieObject.Search[i].Poster;
					var title = movieObject.Search[i].Title;
					var year = movieObject.Search[i].Year;
					var imdb = movieObject.Search[i].imdbID;
					var type = movieObject.Search[i].Type;
					
					// Build HTML iteration
					HTMLBuild+= '<div class="section">\n';
					HTMLBuild+= '<div class="movie-description">\n';
					HTMLBuild+= '<h2>' + title + '</h2>\n';
					HTMLBuild+= '<h3>' + year;
					HTMLBuild+= ' (' + type + ')</h3>\n';
					HTMLBuild+= '<h3>IMDB ID: ' + imdb + '</h3>\n';
					HTMLBuild+= '<a class="poster-link" href="http://www.imdb.com/title/' + imdb  + '/" target="_blank">IMDB Page</a>\n';
					HTMLBuild+= '<img class="movie-image" src=" ' + image + '" alt=" ' + title + '">\n';
					HTMLBuild+= '</div>\n';
					HTMLBuild+= '</div>\n';
				}
				// print HTMLBuild to document
				var print = document.getElementById('data');
				print.innerHTML = HTMLBuild;
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
	var movieData = "http://www.omdbapi.com/?s=X-men&apikey=7fe29f8b";
	callAPI(movieData);
};
 	

	

