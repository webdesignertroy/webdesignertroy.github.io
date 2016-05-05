/*
Problems:
1) Search needs to filter images BASED ON CAPTIONS
2) Images need to create a lightbox on mouse-click/keyboard press
3) Navigation left right  on mouse-click/keyboard press 
*/

var $caption = $('.image-link span');
var $description = $("<p></p>");
var $tab = $('.image-link');
var $container = $('<div class="container"></div>');
var $overlay = $('<div id="overlay"></div>');
var $img = $("<img>");
var currentSpan;
var $currentCaption;
var $currentTitle;
var imageLocation;



//Add image to overlay
$overlay.append($img).append($description);

//Add overlay
$container.append($overlay);
$("body").append($container);


//Display image and caption on [HOVER]
$caption.css("opacity", 0);

$caption.mouseenter(function(){
	$(this).css("opacity", 1);
	$currentCaption = $(this).prev().attr('alt');
	$currentTitle = $(this).prev().attr('title');
	$(this).html('<span class="caption-style">' +$currentTitle + '</span><br />' +$currentCaption);
}).mouseleave(function(){	
	$(this).css("opacity", 0);
});

// Display image and caption on [TAB]	
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
	$description.html($currentCaption);	
	
	
	//Show overlay	
	$container.fadeIn(400);	
	
});

//Capture the [ENTER] key event on a link to an image
$tab.click(function(event){
	event.preventDefault();
	var imageLocation = $(this).attr("href");
	//Update image src
	$img.attr("src", imageLocation);
	$container.fadeIn(400);
});

//Fade out overlay when [MOUSE] is clicked
$('.container').click(function(){
 	//Hide the overlay on mouse click
 	$container.fadeOut(100);
	//Clean up overlay
	$("body").detach(".container");
});

//Fade out overlay when [ESC] is keyed
$(this).keyup(function(event){
  	//Hide the overlay on keypress  
  	if(event.keyCode === 27){
 	$container.fadeOut(100);
	//Clean up overlay
	$("body").detach(".container");
  }
});