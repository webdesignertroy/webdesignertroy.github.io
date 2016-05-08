/*
Problems:
1) Search needs to filter images BASED ON CAPTIONS
2) Images need to create a lightbox on mouse-click/keyboard press (Done)
3) Navigation left right  on mouse-click/keyboard press  (Done)
4) Need to streamline bulky code after first pass (Done)
*/

/* ================================= 
  Variables
==================================== */

var $caption = $('.image-link span');
var $description = $("<p></p>");
var $tab = $('.image-link');
var $overlay = $('<div id="overlay"></div>');
var $arrowLeft = $('<div class="arrow-left"></div>');
var $arrowRight = $('<div class="arrow-right"></div>');
var $container = $('<div class="container"></div>');
var $img = $("<img>");
var $iframe = $("<iframe>");
var currentSpan;
var $currentCaption;
var $currentTitle;
var imageLocation;
var imageHref;
var imageTitle;
var imageCaption;
var imageMedia;
var newImg;
var newCaption;
var newTitle;
var newMediaType;
var d = new Date();
var n = d.getFullYear();
var $findData;
var $currentYear;
var $displayThumb;
var $hideThumb;
var $displayThumbOnFocus;
var $hideThumbOnBlur;
var $showImage;
var $getImage;
var $fadeOut;
var $arrayGenerator;
var $slideAnimation;
var mediaType;


/* ================================= 
  Functions
==================================== */

//Function for Displaying Thumb and Caption
function $displayThumb(element){
	"use strict";
	$(element).css("opacity", 1);
	$currentCaption = $(element).prev().attr('alt');
	$currentTitle = $(element).prev().attr('title');
	$(element).html('<span class="caption-style">' +$currentTitle + '</span><br />' +$currentCaption);
}

//Function for Hiding Thumb and Caption
function $hideThumb(element){
	"use strict";	
	$(element).css("opacity", 0);
}

//Function for Displaying Thumb and Caption on FOCUS
function $displayThumbOnFocus(element){
	"use strict";
	$(element).find('span').css("opacity", 1);
	$currentCaption = $(element).find('img').attr('alt');
	$currentTitle = $(element).find('img').attr('title');	
	$(element).find('.caption-info').html('<span class="caption-style">' +$currentTitle + '</span><br />' +$currentCaption);
}

//Function for Hiding Thumb and Caption on FOCUS
function $hideThumbOnBlur(element){
	"use strict";
	$(element).find('.caption-info').css('opacity',0);
	currentSpan = $(element).find('span');
}

//Function generates Arrays using .col class
function $arrayGenerator(){
	"use strict";
	imageHref = [];
	imageCaption = [];
	imageTitle = [];
	imageMedia = [];
	$( ".col" ).children().each(function() {
		imageHref.push($(this).attr("href"));
		imageMedia.push($(this).attr("class"));
		imageCaption.push($(this).children().attr("alt"));
		imageTitle.push($(this).children().attr("title"));
	});
}

//Function dictates slide animation;
function $slideAnimation(){
	"use strict";
	$description.fadeOut('fast');	
	if (mediaType === "image") {
		$img.hide();
		$iframe.fadeOut("slow", function(){	
			$img.fadeOut("slow", function(){
				$img.attr("src", newImg).fadeIn("slow");
			});
		});
	} else {
		$iframe.hide();
		$img.fadeOut("slow", function(){
			$iframe.fadeOut("slow", function(){
				$iframe.attr("src", newImg).fadeIn("slow");
			});
		});
	}
	$description.html('<strong>' + newTitle + '</strong>: ' + newCaption).fadeIn('slow');

}

//Function generates a current year and adds language for copyright notice.
function $currentYear() {
	"use strict";
    var d = new Date();
    var n = d.getFullYear();
    document.getElementById("copyright").innerHTML = '&copy; ' + n + ' - Image Gallery';
}

//Set Image's href, caption and title
function $findData(imageSrc){
	"use strict";
	imageHref = [];
	imageCaption = [];
	imageTitle = [];
	$( ".col" ).children().each(function() {
		imageHref.push($(this).attr("href"));
		imageCaption.push($(this).children().attr("alt"));
		imageTitle.push($(this).children().attr("title"));
	});
	for ( var i = 0 ; i < imageHref.length; i++){
		if ( imageSrc === imageHref[i] ) {
			newCaption = imageCaption[i];
			newTitle = imageTitle[i];
		}
	}
}

//Function for opening Image or Video on [MOUSE-CLICK]
function $getImage(element, e){
	"use strict";
	e.preventDefault();
	if(mediaType === "image") {
		$img.show();
		$iframe.hide();
	} else {
		$img.hide();
		$iframe.show();
	}
	imageLocation = $(element).parent().attr("href");	
	
	$findData(imageLocation);
	
	
	$showImage(imageLocation, newTitle, newCaption);
}

//Function for showing Image.
function $showImage(iL, $cT, $cC){
	"use strict";	
	//Update image src.
	if(mediaType === "image"){
		$img.attr("src", iL);
	} else {
		$iframe.attr("src",iL);
	}
	//Update image description.
	$description.html('<strong>' + $cT + '</strong>: ' + $cC);	
	
	//Show overlay.	
	$container.fadeIn(400);
	$arrowLeft.fadeIn(400);
	$arrowRight.fadeIn(400);	
}

//Function to fade out image.
function $fadeOut(){
	"use strict";
 	//Hide the overlay on mouse click.
 	$container.fadeOut(100);
	$arrowLeft.fadeOut(100);
	$arrowRight.fadeOut(100);
	//Clean up overlay
	$("body").detach(".container");
}

/* ================================= 
  Append the Document
==================================== */

//Add image to overlay.
$overlay.append($img).append($iframe).append($description);
$img.hide();
$iframe.hide();

//Add overlay
$container.append($overlay);

//Add directional arrows.
$("body").append($arrowLeft).append($arrowRight);

//Add container.
$("body").append($container);

//Call "always current" year
$currentYear();

/* ================================= 
  MOUSE & NATVE KEYBOARD EVENTS
==================================== */

//Display thumb and caption on [HOVER]. Hide thumb and caption on leave.
$caption.css("opacity", 0); /* Initally Hide */
$caption.mouseenter(function() {
	"use strict";
	$displayThumb(this);
}).mouseleave(function() {
	"use strict";
	$hideThumb(this);
});

// Display thumb and caption on [FOCUS]. Hide thumb and caption on [BLUR].	
$tab.focus(function(){
	"use strict";
	$displayThumbOnFocus(this);
}).blur(function(){
	"use strict";
	$hideThumbOnBlur(this);
});

//Capture the [MOUSE-CLICK] event on a link to an image.
$caption.click(function(e){
	"use strict";
	switch($(this).parent().attr("class")){
		case "image-link":
			mediaType = "image";
		break;
		case "image-link video":
			mediaType = "video";
		break;
	}
	
	$getImage(this, e);
});

//Prevents [ENTER] press from activating .col a elment.  This is reserved for [MOUSE-CLICK].
$tab.click(function(e){
	"use strict";
	e.preventDefault();
});

//Fade out overlay when [MOUSE] is clicked.
$('.container').click(function(){
	"use strict";
	$fadeOut();
});

//Image's Left-Arrow Directional Behavior on [MOUSE-CLICK].
$arrowLeft.click(function(){	
"use strict";

	imageHref = [];
	imageCaption = [];
	imageTitle = [];
	imageMedia = [];
	
	$arrayGenerator();
	
	for ( var i = 0 ; i < imageHref.length; i++ ){
		switch(mediaType){
			case "image":
				if ( $img.attr("src") === imageHref[i] ) {
					if ( i !== 0 ) {
						newImg = imageHref[i - 1];
						newCaption = imageCaption[i - 1];
						newTitle = imageTitle[i - 1];
						newMediaType =  imageMedia[i - 1];
					} else {
						newImg = imageHref[imageHref.length - 1];
						newCaption = imageCaption[imageHref.length - 1];
						newTitle = imageTitle[imageHref.length - 1];
						newMediaType = imageMedia[imageHref.length - 1];
					}
				} 
			break;
			case "video":			
				if ( $iframe.attr("src") === imageHref[i] ) {
					if ( i !== 0 ) {
						newImg = imageHref[i - 1];
						newCaption = imageCaption[i - 1];
						newTitle = imageTitle[i - 1];
						newMediaType =  imageMedia[i - 1];
					} else {
						newImg = imageHref[imageHref.length - 1];
						newCaption = imageCaption[imageHref.length - 1];
						newTitle = imageTitle[imageHref.length - 1];
						newMediaType = imageMedia[imageHref.length - 1];
					}
				} 
			break;
		}
	}
	switch(newMediaType){
	case "image-link":
		mediaType = "image";
		$img.show();
		$iframe.hide();
	break;
	case "image-link video":
		mediaType = "video";
		$img.hide();
		$iframe.show();
	break;
	}
	$slideAnimation();
});

//Image's Right-Arrow Directional Behavior on [MOUSE-CLICK].
$arrowRight.click(function(){
	"use strict";
	imageHref = [];
	imageCaption = [];
	imageTitle = [];
	imageMedia = [];
	
	$arrayGenerator();
		for ( var i = 0 ; i < imageHref.length; i++){
			switch (mediaType) {
				case "image" :
					if ( $img.attr("src") === imageHref[i] ) {
						if ( i !== imageHref.length - 1 ) {
							newImg = imageHref[i + 1];
							newCaption = imageCaption[i + 1];
							newTitle = imageTitle[i + 1];
							newMediaType = imageMedia[i + 1];
						} else {
							newImg = imageHref[0];
							newCaption = imageCaption[0];
							newTitle = imageTitle[0];
							newMediaType = imageMedia[0];
						}
					}
				break;
				case "video":
					if ( $iframe.attr("src") === imageHref[i] ) {
						if ( i !== imageHref.length - 1 ) {
							newImg = imageHref[i + 1];
							newCaption = imageCaption[i + 1];
							newTitle = imageTitle[i + 1];
							newMediaType = imageMedia[i + 1];
						} else {
							newImg = imageHref[0];
							newCaption = imageCaption[0];
							newTitle = imageTitle[0];
							newMediaType = imageMedia[0];
						}
					}
				
				break;				
			}
		}
	switch(newMediaType){
	case "image-link":
		mediaType = "image";
		$img.show();
		$iframe.hide();
	break;
	case "image-link video":
		mediaType = "video";
		$img.hide();
		$iframe.show();
	break;
	}
	
	$slideAnimation();
});

/* ================================= 
  KEYBOARD EVENTS
==================================== */

//[KEY UP] Switch Statement.
$(this).keyup(function(e){
	"use strict";
	switch(e.keyCode) {
		case 13:
		case 27:
			//Fade out overlay when [ENTER=13] and [ESC=27] is keyed.
			$fadeOut();
		break;
		case 37:
			//Advances slideshow left on left-arrow [37] key.
			$arrowLeft.trigger("click");
		break;
		case 39:
			//Advances slideshow right on right-arrow [39] key.
			$arrowRight.trigger("click");
		break;
	}
});


// Search function sets the "active" class to filtered items and hides the rest.
$('#searchbox').keyup(function(){
	"use strict";
	console.log('This works');
  
});