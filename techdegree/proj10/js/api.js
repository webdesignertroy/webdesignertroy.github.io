 $(document).ready(function(){
/*********************************
   VARIABLES
**********************************/
	var $search = $("#search");
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

	var createDetails = function(index) {
		var imdbImage = 'http://img.omdbapi.com/?i=' + details[index].id + '&apikey=7fe29f8b'
		var detailHTML = '<div data-id="' + details[index].id + '">';
		detailHTML +='<p>' + details[index].title + '</p>\n';
		if (details[index].image !== "N/A") {
			detailHTML += '<div class="detail-img" style="background: url(' +imdbImage +')"></div>';
			detailHTML += '</div>';
		}
		$info.html(detailHTML);
		detailHTML = "";
	}

/*********************************
   API
**********************************/
$submit.on("click", function(e){
	e.preventDefault();

	// Disable search field and button
	$search.prop("disabled", true);
	$submit.attr("disabled", true);
	$loader.addClass("show-loader");

	// API #1
	var url = "http://www.omdbapi.com/?apikey=7fe29f8b&s=" + $search.val();

	var movieData = {
		title: $search.val()
	}
	var movieResults = function(response) {
		var movieHTML = '';
		details = [];
		$.each(response.Search, function(i, data){
			//Create Details Object
				details.push({
					title: data.Title,
					year: data.Year,
					id: data.imdbID,
					type: data.Type,
					image: data.Poster
				})
			// 
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
		$search.val("");
	}
	// Enable search field and button
	$search.prop("disabled", false);
	$submit.attr("disabled", false);
	$loader.removeClass("show-loader");

	// call API #1
	$.getJSON(url, movieData, movieResults);
});
	// Add .show on result click
	 $container.on("click", ".result", function(evt){
	 	evt.preventDefault();
	 	evt.stopPropagation();
	 	// Append #overlay
		$info.appendTo($overlay);
		$arrowRight.appendTo("wrapper");
		$arrowLeft.appendTo("wrapper");
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
	$("wrapper").on("click", "#arrow-right",function(){
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
	$("wrapper").on("click", "#arrow-left",function(){
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

});// end of ready