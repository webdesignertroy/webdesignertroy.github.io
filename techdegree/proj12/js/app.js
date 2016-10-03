$(document).ready(function(){
	var $menuLi = $("#main li a");
	var $backTop = $("#back-top a");

	/************************
		FUNCTION EXPRESSION
	*************************/

	// Function: scrolls to 'targeted id' on page
	var $scroll = function($hash, menuCount) {
		$('html, body').animate({
			scrollTop: $( $hash ).offset().top - 50 * menuCount
		}, 500, "swing");
	};

 	/************************
	   NAVIGATION
	*************************/	

 	// On menu li click, scroll to targeted id
 	$menuLi.on("click", function(e){

 		// prevent normal action
 		e.preventDefault();

 		// defines the href of the'targeted id' I'm looking for
 		var $link = $(this).attr("href");
 		$scroll($link, 0);

 	});

 	// On #back-top click, scroll to 'targeted id'
 	 $backTop.on("click", function(e){

 	 	// prevent normal action
 	 	e.preventDefault();

 	 	// defines the href of the 'targeted id' I'm looking for
 	 	var $link = $(this).attr("href");
 	 	$scroll($link, 0);
 	 });

	// On left-hemisphere hover in header
	$("#left-trigger").mouseenter(function(){
		$("#left").addClass("reveal-left");
		$("#left").removeClass("hide-left");
		$("#header").addClass("red");
	});
	$("#left-trigger").mouseleave(function(){
		$("#left").removeClass("reveal-left");
		$("#left").addClass("hide-left");
		$("#header").removeClass("red");
	});

	// On right-hemisphere hover in header
	$("#right-trigger").mouseenter(function(){
		$("#right").addClass("reveal-right");
		$("#right").removeClass("hide-right");
		$("#header").addClass("blue");
	});
	$("#right-trigger").mouseleave(function(){
		$("#right").removeClass("reveal-right");
		$("#right").addClass("hide-right");
		$("#header").removeClass("blue");
	});

});