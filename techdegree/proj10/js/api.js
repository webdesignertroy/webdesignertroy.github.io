$(document).ready(function(){
/*********************************
   VARIABLES
**********************************/
	var $search = $("#search");
	var $submit = $("#submit");
	var $container = $("#container");

/*********************************
   API
**********************************/
$submit.on("click", function(e){
	e.preventDefault();
		// API #1
		var url = "http://www.omdbapi.com/?apikey=7fe29f8b&s=" + $search.val();

		var movieData = {
			title: $search.val()
		}
		function movieResults(response) {
			var movieHTML = '';
			$.each(response.Search, function(i, data){
				console.log(data.Poster);
				if ( data.Poster !== "N/A" ) {
					movieHTML += '<div class="result">\n';
					movieHTML += '<a href="#" class="result-link">\n';
					var movieImage = '<img src="http://img.omdbapi.com/?i=' + data.imdbID + '&apikey=7fe29f8b" class="result-img"/>';
					movieHTML += movieImage + '\n';
					movieHTML += '<div class="content">' + data.Title + ' (' + data.Year + ')</div>';
					movieHTML += '</a>\n';
					movieHTML += '</div>\n';
				} else {
					movieHTML += '<div class="result">\n';
					movieHTML += '<a href="#" class="no-result-link">\n';
					movieHTML += '<p class="link-header">Poster Not Available</p>\n';
					movieHTML += '<p>' + data.Title + '</p>\n';
					movieHTML += '<p>(' + data.Year + ')</p>\n';
					movieHTML += '</a>\n';
					movieHTML += '</div>\n';
				}
			});
			$container.html(movieHTML);
			$search.val("");
		}

		// call API #1
		$.getJSON(url, movieData, movieResults);
});


});// end of ready