$(document).ready(function(){

	/************************
		VARIABLES
	*************************/

	var $wrapper = $("#wrapper");
	var $navDiv = $("#nav");
	var $navBar = $("#main");
	var $menuLi = $("#main li a");
	var $backTop = $("#back-top a");
	var $menuReveal = $("#menu-reveal");
	var mq = window.matchMedia('all and (max-width: 769px)');
	var menuLength = 0;

	var $portfolio = $(".project-details");

	var $overlay = $("#overlay");
	var $projectImage = $('<div id="project-image"></div>');
	var $projectDetails = $('<div id="project-details"></div>');
	var $cursorBorderLeft = $('<div id="cursor-border-left"></div>');
	var $cursorBorderRight = $('<div id="cursor-border-right"></div>');

	/************************
		FUNCTION EXPRESSION
	*************************/

	// Function: hide menu items
	var hideMenu = function() {
		$navBar.slideUp(700, "swing");
	};

	// Function: show menu items
	var showMenu = function() {
		$navBar.slideDown(700, "swing");
	};
	// Function: scrolls to 'targeted id' on page
	var $scroll = function($hash, menuCount) {
		if( $(this).scrollTop() < 424 && $hash === "#portfolio" && menuCount !== 0) {
			$('html, body').animate({
				scrollTop: $( $hash ).offset().top -  menuCount - 245
			}, 500, "swing");		} else {
			$('html, body').animate({
				scrollTop: $( $hash ).offset().top -  menuCount - 48
			}, 500, "swing");
		} 
	};

 	/************************
	   NAVIGATION
	*************************/	

 	// On menu li click, scroll to 'targeted id'
 	$menuLi.on("click", function(e){

 		// prevent normal action
 		e.preventDefault();

 		// defines the href of the'targeted id' I'm looking for
 		var $link = $(this).attr("href");
 		$scroll($link, 0);

		// invokes hideMenu()
		if (mq.matches) {
			hideMenu();
		}

		// invokes $scroll()
 	 	$scroll($link, menuLength);

 	});

 	// On #back-top click, scroll to 'targeted id'
 	 $backTop.on("click", function(e){

 	 	// prevent normal action
 	 	e.preventDefault();

 	 	// defines the href of the 'targeted id' I'm looking for
 	 	var $link = $(this).attr("href");

		// invokes hideMenu()
		if (mq.matches) {
			hideMenu();
		}

		// invokes $scroll()
 	 	$scroll($link, menuLength);
 	 });

	// if javascript works, hide/show appropriate menus
	if (mq.matches) {
		$menuReveal.show();
		$navBar.hide();
		menuLength = $menuLi.length;
	} else {
		$menuReveal.hide();
		menuLength = 0;
	}

 	/************************
	   EVENT LISTENERS
	*************************/	

	// On menu click, reveal or hide mobile navigation
	$menuReveal.on("click", function(){
		// toggles MenuReveal button
		if( $navBar.css("display") === "none" ) {
			showMenu();
		} else {
			hideMenu();
		}
	});

	// If javascript is on and the media window changes, 
	//    hide/show appropriate menus
	mq.addListener(function(changed) {
		if(changed.matches) {
			$menuReveal.show();
			$navBar.hide();
			menuLength = $menuLi.length;
		} else {
			$menuReveal.hide();
			$navBar.show();
			menuLength = 0;
		}
	});

	// Listen for scroll pass 440px then fix main navigation
	if( $(window).height() !== $(document).height() ) {
		$(window).on("scroll", function(){
		 	var scrollWin = $(this).scrollTop();
		 	if ( scrollWin > 440 ) {
		 		$navDiv.addClass("fix-menu");
		 		$wrapper.addClass("add-lost-height");
		 		$("#back-top").removeClass("hide-div");
		 	} else {
		 		$navDiv.removeClass("fix-menu");
		 		$wrapper.removeClass("add-lost-height");
		 		$("#back-top").addClass("hide-div");

		 	}
		});
	}
	// Listen for scroll pass 100px then fix #back-top
	if( $(window).height() !== $(document).height() ) {
		$(window).on("scroll", function(){
		 	var scrollWin = $(this).scrollTop();
		 	if ( scrollWin > 200 ) {
		 		$("#back-top").addClass("fade-in");
		 	} else {
		 		$("#back-top").removeClass("fade-in");
		 	}
		});
	}  


 	/************************
	   HEADER INTERACTIVE 
	*************************/	

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

 	/*******************************
	   FOR PORTFOLIO INTERACTIVE
	*******************************/

	var link = "https://andystoica.github.io/"; // This is just a link to site for codepen purposes


	// Create "for loop" with HTML code mixed with variables 
	function renderProjectDetails(e) {
		for ( var t="",  i=0; i < projects.length; i++ ) 
			t+='<div class="port-col" data-index="' + i + '">',
			t+="<h3>"+projects[i].name+"</h3>",
			t+='<div class="project-preview"><img src="img/projects/thumbs/'+projects[i].preview+'.png" alt=""></div>',
			t+="</div>";

		$(".project-details").html(t);
	}

	// Invoke function
	renderProjectDetails();

	// Open overlay on click
	$(".project-details").on("click", ".port-col", function(){

		// variables
		var $projectIndex = parseInt($(this).attr("data-index")); 
		var imageHTML = "";
		var detailHTML = "";

		// Append overlay/wrapper and show
		$projectImage.appendTo($overlay);
		$overlay.addClass("show");
		$projectDetails.appendTo($wrapper);
		$cursorBorderLeft.appendTo($wrapper);
		$cursorBorderRight.appendTo($wrapper);

		// Find correct data in project details array
		$.each(projects, function(i, data){
			if ( $projectIndex === i) {
				// build image div
				imageHTML += '<div class="image-details">';
				imageHTML += '<img src="img/projects/' + data.preview + '.jpg"/>';
				imageHTML += '</div>'

				// build description div
				detailHTML += '<div class="layout-details">';
				detailHTML += '<h3>' + data.name +'</h3>';
				detailHTML +=  '<p class="btn-container">'
				detailHTML += '<a href="' + data.url + '" class="btn" target="_blank">Visit Site</a>';
				if ( data.github !== "" ) {
					detailHTML += '<a href="' + data.github + '" class="btn" target="_blank"> Visit GitHub</a>';
				}
				detailHTML += '</p>';
				detailHTML += '<p>' + data.description + '</p>';
				detailHTML +='</div>';

			}
		});
			document.getElementById("project-image").innerHTML = imageHTML;
			document.getElementById("project-details").innerHTML = detailHTML;

		// Fade-in overlay
		$overlay.animate({
			opacity: 1
		}, 500);

		// Fade-in project-details
		$projectDetails.animate({
			opacity: 1
		},500);

	});  // end Open overlay on click

	// Close overlay and project details on click
	$overlay.on("click", function(){

		// Fade-out project details
		$projectDetails.animate({
			opacity: 0
		}, 500)

		// Fade-out overlay
		$overlay.animate({
			opacity: 0
		}, 500, function(){
			$overlay.removeClass("show");
			$projectDetails.remove();
			$cursorBorderRight.remove();
			$cursorBorderLeft.remove();
		});


	});  //end Close overlay on click

});