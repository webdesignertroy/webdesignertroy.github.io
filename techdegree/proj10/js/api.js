
/*********************************
  INITIALIZE
**********************************/
// Function Declaration for Google API (YouTube API)
function init() {
	// Note: YouTube v3 API uses GET, and not POST, so I'm not 
	//   not sure what to expect here. For the record, the 
	//   API key is exclusive to this App and is "restricted" to
	//   "webdesignertroy.github.io" and "localhost:8888" 
	//   by design. If YouTube thinks there's a sufficient amount of
	//   security, I think there's a sufficient amount of security.
	//   I would like to use this project for my real portfolio
	//   so, it needs to standout. By limiting me to a limited 
	//   amount of APIs, I CAN do it, but
	//   I'll just be like everyone else.

	var xReq = new XMLHttpRequest();
	xReq.onload = function(){
		gapi.client.setApiKey(this.responseText);
		gapi.client.load("youtube", "v3", function(){
		});// yt api is ready
	};
	xReq.open("get", "./txt/api-key.txt", true);
	xReq.send();
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

	var details;

	/*********** Function Expressions ***********/
	var createDetails = function(index) {

		//API #2: YouTube Search:link

		// prepare the request
		var description;
		if(  typeof details[index].ldescription !== "undefined" ) {
			description = details[index].ldescription.substring(0,100) + "...";
		} else {
			description = "";
		}
		var titleYear = '<san class="id-info" data-id="' + details[index].id + '"></span>';
			titleYear += details[index].title + ' - ' + details[index].type.toUpperCase() + ' [' + details[index].year + ']';

		var searchPhrase = details[index].brand + " " + details[index].title + " release date " + details[index].year ;
		searchPhrase = searchPhrase.replace(/%3A/g, "");
		searchPhrase = searchPhrase.replace(/\//g, "");
		searchPhrase = searchPhrase.replace("(", "");
		searchPhrase = searchPhrase.replace(")", "");
		console.log(searchPhrase);
		var request = gapi.client.youtube.search.list({
			part: "snippet",
			chart: "mostPopular",
			type: "video",
			q: searchPhrase,
			maxResults: 1,
			order:"viewCount"
		});// youTube search option selections

		//execute the request
		request.execute(function(response) {
			if ( response.items.length > 0 ) {
				$(".item").remove(); 
				var results = response.result;
				$.each(results.items, function(index,item) {
					$.get("tpl/item.html", function(data){
						$info.append(tplawesome(data, [{
							"videoid": item.id.videoId,
							"short": description,
							"title": titleYear 
						}]));
						resetVideoHeight();
					});
				});
			} else {
				$(".item").remove(); 
				$.get("tpl/no-item.html", function(data){
					$info.append(tplawesome(data, [{
						"short": description,
						"title": titleYear, 
						"message": "Sorry. No related video was found for this title."
					}]));
				});
			}
		});
		$(window).on("resize", resetVideoHeight);

		
	}; // end createDetails

	/*********** Function Declarations ***********/

	// "Seperation of concerns" practice w/ tplawesome
	function tplawesome(template, data) {
	// initiate the result to the basic template
	res = template;
	// for each data key, replace the content of the brackets with the data
	for(var i = 0; i < data.length; i++) {
		res = res.replace(/\{\{(.*?)\}\}/g, function(match, j) { // some magic regex
			return data[i][j];
		});
	}
	return res;
	} // end tplawesome

	//  Responsive: Keep iframe ratio
	function resetVideoHeight() {
			$(".video").attr("height", $info.width() * 9/16);
	}// end resetVideoHeight


	// Sort omdb objects by year: oldest to most recent
	function compare(a,b) {
		if (a.releaseDate < b.releaseDate)
			return -1;
		if (a.releaseDate > b.releaseDate)
			return 1;
		return 0;
	}// end compare()

	// Sort omdb objects by year: most recent to oldest
	function compareReverse(a,b) {
		if (a.releaseDate > b.releaseDate)
			return -1;
		if (a.releaseDate < b.releaseDate)
			return 1;
		return 0;
	}// end compareReverse()

	// Found No Title Results in iTunes
	function foundNothing(){
		$container.html("");
		$.get("tpl/no-movie.html", function(data){
			$("#container").append(tplawesome(data, [{
				"messageTitle": "This Title was Not Found",
				"message": 'Please check your spelling (i.e. "Indiana Jone" instead of "Indiana Jones" ).'
			}]));
		});
	}

	/*********************************
	  API OMDB
	**********************************/
	$submit.on("click", function(e, addorder){
		if ( $search.val() !== "") {
			searchValue = $search.val();
		}
		e.preventDefault();

		// Disable search field and button
		$search.prop("disabled", true);
		$submit.attr("disabled", true);

		// API #1: OMDB
		var url = "//itunes.apple.com/search?term=" + searchValue ;

		var movieData = {
			title: searchValue
		};
		var movieResults = function(response) {
			if ( response.results.length !== 0 ) {
				var movieHTML = '';
				details = [];

				movieHTML ='<div id="filter"><a id="filter-link">Toggle Release Date</a></div>';

				// Toggle Date: Oldest to Most Recent
				if (addorder === 1) {
					response.results.sort(compare);

					// Building HTML in JavaScript 
					movieHTML ='<div id="filter"><a id="filter-link">Sort: Recent to Oldest</a></div>';
				}
				// Toggle Date: Most Recent to Oldest
				if (addorder === -1) {
					response.results.sort(compareReverse);

					// Building HTML in JavaScript 
					movieHTML ='<div id="filter"><a id="filter-link" class="reverse">Sort: Oldest to Recent</a></div>';
				}

				// Iterate through API response
				$.each(response.results, function(i, data){
						if ( typeof data.trackId !== "undefined" ) {
							if( data.kind.indexOf("episode") !== -1 || data.kind.indexOf('movie') !== -1 ) {
								//Create Details Object
								var relDate = data.releaseDate.slice(0,4);
								details.push({
									title: data.trackName,
									year: relDate,
									id: data.trackId,
									type: data.kind,
									image: data.artworkUrl100,
									brand: data.artistName,
									ldescription: data.longDescription
								});

								// Building HTML in JavaScript 
								if ( typeof data.artworkUrl100 !== "undefined" ) {
									movieHTML += '<div class="result" id="' + data.trackId+ '">\n';
									movieHTML += '<a href="#" class="result-link">\n';
									var movieImage = '<img alt="' + data.trackName + '" title="' + data.artistName + '" src="'+ data.artworkUrl100 + '" class="result-img"/>';
									movieHTML += movieImage + '\n';
									movieHTML += '<div class="content">' + data.trackName + '<br />(' + relDate + ')</div>';
									movieHTML += '</a>\n';
									movieHTML += '</div>\n';
								} else {
									movieHTML += '<div class="result" id="' + data.trackId+ '">\n';
									movieHTML += '<a href="#" class="no-result-link">\n';
									movieHTML += '<p class="link-header">Poster Not Available</p>\n';
									movieHTML += '<p>' + data.trackId + '<br />\n';
									movieHTML += '(' + relDate + ')</p>\n';
									movieHTML += '</a>\n';
									movieHTML += '</div>\n';
								}
							}
						}
					});
				if (details.length !== 0 ) {
					$container.html(movieHTML);
				} else {
					foundNothing();
				}

			} else {
				foundNothing();
			} // end movieResults()

				// Clear search field for next searxh
				$search.val("");
		};

		// Enable search field and button
		$search.prop("disabled", false);
		$submit.attr("disabled", false);

		// call API #1
		$.ajax({
			url: url,
			dataType: 'JSONP'
		}).done(function(response){
			movieResults(response);
		});

	}); // end submit click

	// Add .show on .result click
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
		var currentId = parseInt($(this).attr("id"));
		$.each(details, function(i, data){
			if ( currentId === data.id ) {
				createDetails(i);
			}
		});

		// Fade-in overlay
		$overlay.animate({
			opacity: 1
		}, 500);

	}); // end $container append

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

	});// end $overlay hide

	/*********************************
	  NAVIGATION
	**********************************/

	// On right arrow click (bubbling event issues)
	$("#wrapper").on("click", "#arrow-right",function(){
		var currentId = parseInt($info.find(".id-info").attr("data-id"));
		$.each(details, function(i, data){
			if( data.id === currentId ) {
				if ( i < details.length - 1) {
					createDetails(i + 1);
				} else {
					createDetails(0);
				}
			}
		});
	}); // end right arrow click

	// On left arrow click (bubbling event issues)
	$("#wrapper").on("click", "#arrow-left",function(){
		var currentId = parseInt($info.find(".id-info").attr("data-id"));
		$.each(details, function(i, data){
			if( data.id === currentId ) {
				if ( i > 0) {
					createDetails(i - 1);
				} else {
					createDetails(details.length - 1);
				}
			}
		});
	}); // end left arrow click

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

	// On #filter-link click, sort .results by year (toggle)
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