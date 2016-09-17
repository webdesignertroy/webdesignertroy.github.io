
	// Function Declaration for GoogleAPI API (YouTube API)
	function init() {
		gapi.client.setApiKey("AIzaSyD1i2kQhJqH2NGeZqECn0KQwlibpE36NDc");
		gapi.client.load("youtube", "v3", function(){
			// yt api is ready
		});
	}
 $(document).ready(function(){
/*********************************
   VARIABLES
**********************************/
	var $search = $("#search");
	var searchValue = $.trim($search.val());
	var $submit = $("#submit");
	var $container = $("#container");
	var $overlay = $("#overlay");
	var $info = $('<div id="info"></div>');
	var $cursorBorderLeft = $('<div id="cursor-border-left"></div>');
	var $cursorBorderRight = $('<div id="cursor-border-right"></div>');
	var $arrowLeft = $('<div id="arrow-left"></div>');
	var $arrowRight = $('<div id="arrow-right"></div>');
	var $resultLink = $("#container .result-link");
	var $loader = $("#loader-background");

	var details;

	/*********** Function Expressions ***********/
	var createDetails = function(index) {

	 	//API #2: YouTube Search:link

	 	// prepare the request
	 	var imdbHref = "http://www.imdb.com/title/" + details[index].id;
	 	var searchYear = details[index].year.slice(0,4);
	 	var searchPhrase = encodeURIComponent(details[index].title + " release date " + searchYear).replace(/%20/g, "+");
	 	searchPhrase = searchPhrase.replace(/%3A/g, "");
	 	searchPhrase = searchPhrase.replace("(", "");
	 	searchPhrase = searchPhrase.replace(")", "");

	 	var request = gapi.client.youtube.search.list({
	 		part: "snippet",
	 		chart: "mostPopular",
	 		type: "video",
	 		q: searchPhrase,
	 		maxResults: 1,
	 		order:"viewCount"
	 	})

	 	//execute the request
	 	request.execute(function(response) {
	 		if ( response.items.length > 0 ) {
	 			$(".item").remove(); 
		 		var results = response.result;
		 		$.each(results.items, function(index,item) {
		 			$.get("tpl/item.html", function(data){
		 				$info.append(tplawesome(data, [{
		 					"videoid": item.id.videoId,
		 					"imdblink": imdbHref
		 				}]));
		 				resetVideoHeight();
		 			});
		 		});
		 	} else {
		 		$.get("tpl/no-item.html", function(data){
		 			$info.append(tplawesome(data, [{
		 				"message": "Sorry. No related video was found for this title."
		 			}]));
		 		});
		 	}
	 	});
	 	$(window).on("resize", resetVideoHeight);

		var imdbImage = 'http://img.omdbapi.com/?i=' + details[index].id + '&apikey=7fe29f8b'
		var detailHTML = '<div data-id="' + details[index].id + '">';
		detailHTML +='<h2>' + details[index].title + ' [' + searchYear + ']</h2>\n';
		$info.html(detailHTML);
		detailHTML = "";
	} // end createDetails

	/*********** Function Declarations ***********/

	// "Seperation of concerns" practice w/ tplawesome
	function tplawesome(template, data) {
		// initiate the result to the basic template
		res = template;
		// for each data key, replace the content of the brackets with the data
		for(var i = 0; i < data.length; i++) {
			res = res.replace(/\{\{(.*?)\}\}/g, function(match, j) { // some magic regex
				return data[i][j];
			})
		}
		return res;
	} // end tplawesome

	//  Responsive: Keep iframe ratio
	function resetVideoHeight() {
		$(".video").attr("height", $info.width() * 9/16);
	}// end resetVideoHeight

	// Sort omdb objects by year: oldest to most recent
	function compare(a,b) {
	  if (a.Year < b.Year)
	    return -1;
	  if (a.Year > b.Year)
	    return 1;
	  return 0;
	}
	// Sort omdb objects by year: most recent to oldest
	function compareReverse(a,b) {
	  if (a.Year > b.Year)
	    return -1;
	  if (a.Year < b.Year)
	    return 1;
	  return 0;
	}
/*********************************
   API OMDB
**********************************/
$submit.on("click", function(e, addorder){
	if ( $search.val() !== "") {
		searchValue = $search.val();
	}
	console.log(addorder);
	e.preventDefault();

	// Disable search field and button
	$search.prop("disabled", true);
	$submit.attr("disabled", true);

	// API #1: OMDB
	var url = "http://www.omdbapi.com/?apikey=7fe29f8b&s=" + searchValue;

	var movieData = {
		title: searchValue
	}
	var movieResults = function(response) {
		if ( response.Response !== "False" ) {
			var movieHTML = '';
			details = [];

			movieHTML ='<div id="filter"><a id="filter-link">Toggle Release Date</a></div>';

			// Toggle Date: Oldest to Most Recent
			if (addorder === 1) {
				response.Search.sort(compare);
				movieHTML ='<div id="filter"><a id="filter-link">Sort: Recent to Oldest</a></div>';
			}
			// Toggle Date: Most Recent to Oldest

			if (addorder === -1) {
				response.Search.sort(compareReverse);
				movieHTML ='<div id="filter"><a id="filter-link" class="reverse">Sort: Oldest to Recent</a></div>';
			}
			$.each(response.Search, function(i, data){
				//Create Details Object
					details.push({
						title: data.Title,
						year: data.Year,
						id: data.imdbID,
						type: data.Type,
						image: data.Poster
					})

				// Build HTML in JavaScript (Dirty)
				if ( data.Poster !== "N/A" ) {
					movieHTML += '<div class="result" id="' + data.imdbID+ '">\n';
					movieHTML += '<a href="#" class="result-link">\n';
					var movieImage = '<img src="http://img.omdbapi.com/?i=' + data.imdbID + '&apikey=7fe29f8b" class="result-img"/>';
					movieHTML += movieImage + '\n';
					movieHTML += '<div class="content">' + data.Title + ' (' + data.Year + ')</div>';
					movieHTML += '</a>\n';
					movieHTML += '</div>\n';
				} else {
					movieHTML += '<div class="result" id="' + data.imdbID+ '">\n';
					movieHTML += '<a href="#" class="no-result-link">\n';
					movieHTML += '<p class="link-header">Poster Not Available</p>\n';
					movieHTML += '<p>' + data.Title + '</p>\n';
					movieHTML += '<p>(' + data.Year + ')</p>\n';
					movieHTML += '</a>\n';
					movieHTML += '</div>\n';
				}
			});
			$container.html(movieHTML);
		} else {
			$container.html("");
	 		$.get("tpl/no-movie.html", function(data){
	 			$("#container").append(tplawesome(data, [{
	 				"messageTitle": "This Title was Not Found",
	 				"message": 'Please check your spelling (i.e. "Indiana Jone" instead of "Indiana Jones" ).'
	 			}]));
	 		});
		}
		$search.val("");
	}
	// Enable search field and button
	$search.prop("disabled", false);
	$submit.attr("disabled", false);

	// call API #1
	$.getJSON(url, movieData, movieResults);

});
	// Add .show on result click
	 $container.on("click", ".result", function(evt){
	 	evt.preventDefault();
	 	evt.stopPropagation();


	 	// Append #overlay
		$info.appendTo($overlay);
		$arrowRight.appendTo("#wrapper");
		$arrowLeft.appendTo("#wrapper");
		$cursorBorderRight.appendTo($overlay);
		$cursorBorderLeft.appendTo($overlay);
		$overlay.addClass("show");

		// Find correct data in details array
		var currentId = $(this).attr("id");
		$.each(details, function(i, data){
			if ( currentId === data.id ) {
				createDetails(i);
			}
		});

		// Fade-in overlay
		$overlay.animate({
			opacity: 1
		}, 500);

		
	});

	// Remove .show on overlay click
	$overlay.on("click", function(){
		$overlay.animate({
			opacity: 0
		}, 500, function(){
			$overlay.removeClass("show");
			$info.remove();
			$cursorBorderRight.remove();
			$cursorBorderLeft.remove();
			$arrowRight.remove();
			$arrowLeft.remove();
		});
		
	});// end of on click

	/*********************************
	   NAVIGATION
	**********************************/

	// On right arrow click (bubbling event issues)
	$("#wrapper").on("click", "#arrow-right",function(){
		var currentId = $info.find("div").attr("data-id");
		$.each(details, function(i, data){
			if( data.id === currentId ) {
				if ( i < details.length - 1) {
					createDetails(i + 1);
				} else {
					createDetails(0);
				}
			}
		});
	});


	// On left arrow click (bubbling event issues)
	$("#wrapper").on("click", "#arrow-left",function(){
		var currentId = $info.find("div").attr("data-id");
		$.each(details, function(i, data){
			if( data.id === currentId ) {
				if ( i > 0) {
					createDetails(i - 1);
				} else {
					createDetails(details.length - 1);
				}
			}
		});
	});
	/*********************************
	   ACESSIBILITY: KEYBOARD
	**********************************/
	$(this).keyup(function(e){
	"use strict";
		switch(e.keyCode) {
			case 27:
		//Fade out overlay when[ESC=27] is keyed.
		$overlay.trigger("click");
		break;
		case 37:
		//Advances slideshow left on left-arrow [37] key.
			$("#arrow-left").trigger("click");			
		break;
		case 39:
		//Advances slideshow right on right-arrow [39] key.
			$("#arrow-right").trigger("click");
		break;
		}
	});

	/*********************************
	   FILTER
	**********************************/
	$container.on("click", "#filter-link", function(){
		if ( $(this).hasClass("reverse") ) {
			$(this).removeClass("reverse");
			// most recent
			$submit.trigger("click", 1);

		} else {
			$(this).addClass("reverse");
			//oldest
			$submit.trigger("click", -1);
		}
	});

});// end of ready