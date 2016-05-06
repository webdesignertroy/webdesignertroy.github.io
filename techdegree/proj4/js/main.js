/*
Problems:
1) Search needs to filter images BASED ON CAPTIONS
2) Images need to create a lightbox on mouse-click/keyboard press
3) Navigation left right  on mouse-click/keyboard press 
*/

var $caption = $('.image-link span');
var $description = $("<p></p>");
var $tab = $('.image-link');
var $overlay = $('<div id="overlay"></div>');
var $arrowLeft = $('<div class="arrow-left"></div>');
var $arrowRight = $('<div class="arrow-right"></div>');
var $container = $('<div class="container"></div>');
var $img = $("<img>");
var currentSpan;
var $currentCaption;
var $currentTitle;
var imageLocation;
var imageArray = [];
var imageCaption = [];
var imageTitle = [];
var newImg;
var newCaption;
var newTitle;
var d = new Date();
var n = d.getFullYear();
var $currentYear;


//Add image to overlay
$overlay.append($img).append($description);

//Add overlay
$container.append($overlay);

//Add directional arrows
$("body").append($arrowLeft).append($arrowRight);

//Add container
$("body").append($container);


//Display thumb and caption on [HOVER]
$caption.css("opacity", 0);

$caption.mouseenter(function(){
	$(this).css("opacity", 1);
	$currentCaption = $(this).prev().attr('alt');
	$currentTitle = $(this).prev().attr('title');
	$(this).html('<span class="caption-style">' +$currentTitle + '</span><br />' +$currentCaption);
}).mouseleave(function(){	
	$(this).css("opacity", 0);
});

// Display thumb and caption on [TAB]	
$tab.focus(function(){
	$(this).find('span').css("opacity", 1);
	$currentCaption = $(this).find('img').attr('alt');
	$currentTitle = $(this).find('img').attr('title');	
	$(this).find('.caption-info').html('<span class="caption-style">' +$currentTitle + '</span><br />' +$currentCaption);
}).blur(function(){
	$(this).find('.caption-info').css('opacity',0);
	currentSpan = $(this).find('span');
});

//Capture the [MOUSE-CLICK] event on a link to an image
$caption.click(function(event){
	event.preventDefault();
	imageLocation = $(this).parents().attr("href");	
	$currentCaption = $(this).prev().attr('alt');
	$currentTitle = $(this).prev().attr('title');
	
	//Update image src
	$img.attr("src", imageLocation);
	
	//Update image description
	$description.html('<strong>' + $currentTitle + '</strong>: ' + $currentCaption);	
	
	
	//Show overlay	
	$container.fadeIn(400);
	$arrowLeft.fadeIn(400);
	$arrowRight.fadeIn(400);
	
	return imageLocation;
	
});

//Capture the [ENTER] key event on a link to an image
$tab.click(function(event){
	event.preventDefault();
	var imageLocation = $(this).attr("href");
	//Update image src
	$img.attr("src", imageLocation);
	$container.fadeIn(400);
	$arrowLeft.fadeIn(400);
	$arrowRight.fadeIn(400);
	
	return imageLocation;
});

//Fade out overlay when [MOUSE] is clicked
$('.container').click(function(){
 	//Hide the overlay on mouse click
 	$container.fadeOut(100);
	$arrowLeft.fadeOut(100);
	$arrowRight.fadeOut(100);
	//Clean up overlay
	$("body").detach(".container");
});

//Fade out overlay when [ESC=27] is keyed
$(this).keyup(function(event){
  	//Hide the overlay on keypress  
  	if(event.keyCode === 27){
 	$container.fadeOut(100);
	$arrowLeft.fadeOut(100);
	$arrowRight.fadeOut(100);
	//Clean up overlay
	$("body").detach(".container");
  }
});

// [ENTER=13] is keyed
$(this).keyup(function(event){	 
  	if(event.keyCode === 13  && $(this) === $tab) {
		event.preventDefault();
		var imageLocation = $(this).attr("href");
		//Update image src
		$img.attr("src", imageLocation);
		$container.fadeIn(400);
	}
});

//[DIRECTIONS KEY CONTROLS]

//Mouse Arrow Left
$arrowLeft.click(function(){	
	$( ".col" ).children().each(function() {
		imageArray.push($(this).attr("href"));
		imageCaption.push($(this).children().attr("alt"));
		imageTitle.push($(this).children().attr("title"));
	});
	for ( var i = 0 ; i < imageArray.length; i++ ){
		if ( $img.attr("src") === imageArray[i] ) {
			if ( i !== 0 ) {
				newImg = imageArray[i - 1];
				newCaption = imageCaption[i - 1];
				newTitle = imageTitle[i - 1];
			} else {
				newImg = imageArray[imageArray.length-1];
				newCaption = imageCaption[imageArray.length-1];
				newTitle = imageTitle[imageArray.length-1];
			}
		} 
	}
		$description.fadeOut('fast');	
		$img.fadeOut('fast', function(){
			$img.attr("src", newImg).fadeIn('slow');
			$description.html('<strong>' + newTitle + '</strong>: ' + newCaption).fadeIn('slow');
	});
});

//Mouse Arrow Right
$arrowRight.click(function(){
	$( ".col" ).children().each(function() {
		imageArray.push($(this).attr("href"));
		imageCaption.push($(this).children().attr("alt"));
		imageTitle.push($(this).children().attr("title"));
	});
	for ( var i = 0 ; i < imageArray.length; i++){
		if ( $img.attr("src") === imageArray[i] ) {
			if ( i !== imageArray.length - 1 ) {
				newImg = imageArray[i + 1];
				newCaption = imageCaption[i + 1];
				newTitle = imageTitle[i + 1];
			} else {
				newImg = imageArray[0];
				newCaption = imageCaption[0];
				newTitle = imageTitle[0];
			}
		}
	}
	$description.fadeOut('fast');	
	$img.fadeOut('fast', function(){
		$img.attr("src", newImg).fadeIn('slow');
		$description.html('<strong>' + newTitle + '</strong>: ' +newCaption).fadeIn('slow');
	});
});


$(this).keyup(function(event){
	if(event.keyCode === 39) {
		
		$(this).closest('.col').next($tab).focus();
	}
});


function $currentYear() {
    var d = new Date();
    var n = d.getFullYear();
    document.getElementById("copyright").innerHTML = '&copy; ' + n + ' - Image Gallery';
}
$currentYear();