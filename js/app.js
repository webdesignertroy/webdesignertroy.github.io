// Create project list of objects with variables
var projects=[ {
		name: "Responsive registration form", url: "http://webdesignertroy.github.io/techdegree/proj3/", github: "https://github.com/webdesignertroy/Techdegreee-Project-3", description: 'In this project I built a responsive, mobile-friendly registration form using a wide variety of HTML form input types and attributes. Using the supplied mockup file as a guide, I created repsonsive mobile, tablet and desktop versions of the form using CSS media queries and a "mobile-first" approach as well as implementing custom form controls.', preview: "proj3", tech: ["html", "css", "github"]
	}

	,
	{
		name: "Interactive photo gallery", url: "http://webdesignertroy.github.io/techdegree/proj4/", github: "https://github.com/webdesignertroy/Techdegree-Project-4", description: "This project was about creating an interactive photo gallery using JavaScript and jQuery. Thumbnails and photos were be provided with descriptions. User intraction with the search box will cause images in the gallery to be filtered based on the input. Clicking on thumbnails, opens up a lighbox showing a larger version of each photo and allows keyboard navigation.", preview: "proj4", tech: ["html", "css", "js", "jquery", "github"]
	}

	,
	{
		name: "Responsive layouts with Sass", url: "http://webdesignertroy.github.io/techdegree/proj5/", github: "https://github.com/webdesignertroy/Techdegree-Project-5", description: "This project was about refactoring a previous project originally written in CSS, to Sass. I used the oportunity to redesign the layout using Flexbox instead of floating divs. I also took advantage of many Sass features such as support for partials, variables, extends, and mixins to write modular, more maintainable code.", preview: "proj5", tech: ["html", "css","js","jquery", "sass", "github"]
	}

	,
	{
		name: "Interactive video player", url: "http://webdesignertroy.github.io/techdegree/proj7", github: "https://github.com/webdesignertroy/Techdegree-Project-7", description: "This is an HTML5 video player featuring custom control elements, written in JavaScript using the HTML5 Video API. Using the supplied mockups, video files, and transcript, I wrote an interactive video player that synchronizes the video and the transcript. The transcript is highlighting as the video progresses.", preview: "proj7", tech: ["html", "css", "js", "jquery", "github"]
	}

	,
	{
		name: "Web application dashboard", url: "http://webdesignertroy.github.io/techdegree/proj9", github: "https://github.com/webdesignertroy/Techdegree-Project-9", description: "This project was about building a beautiful web application dashboard complete with JavaScript-driven charts and graphs base on a suplied graphic mockup. This was a front end project onlythat required to create the responsive layout in HTML and CSS with added JavaScript functionality. Flexbox and Sass proved to be invaluable tools.", preview: "proj9", tech: ["html", "css", "js", "jquery", "github"]
	}

	,
	{
		name: "Public API galley", url: "http://webdesignertroy.github.io/techdegree/proj10", github: "https://github.com/webdesignertroy/Techdegree-Project-10", description: "This project was about using at least one of the provided APIs to grab, fromat and present data from that API. Items had to be presented on a page in an attractive gallery of images or titles. Clicking an image opens a lightbox prodiving detailed information about that item. This project included Ajax calls using jQuery, pasring and formatting JSON with Javascript and a bit of CSS magic.", preview: "proj10", tech: ["html", "css", "js", "jquery", "github"]
	}
] 
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

	var $portfolio = $(".project-details-dom");

	var $overlay = $("#overlay");
	var $projectImage = $('<div id="project-image"></div>');
	var $projectDetails = $('<div id="project-details"></div>');
	var $projectTech = $('<div id="project-tech"></div>'); 
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

		$(".project-details-dom").html(t);
	}

	// Invoke function
	renderProjectDetails();

	// Open overlay on click
	$(".project-details-dom").on("click", ".port-col", function(){

		// variables
		var $projectIndex = parseInt($(this).attr("data-index")); 
		var imageHTML = "";
		var detailHTML = "";
		var skillsHTML = "";

		// Append overlay/wrapper and show
		$projectImage.appendTo($overlay);
		$overlay.addClass("show");
		$projectDetails.appendTo($wrapper);
		$projectTech.appendTo($wrapper);
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

				// build skills badges div
				skillsHTML += '<div class="layout-skills">';
				for ( i = 0; i < data.tech.length; i++ ) {
					skillsHTML += '<div id="' + data.tech[i] + '" class="badge">';
					skillsHTML += data.tech[i];
					skillsHTML += '</div>';
				}
				skillsHTML += '</div>'
			}
		});

			document.getElementById("project-tech").innerHTML = skillsHTML;
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

		// Fade-in project-skills
		$projectTech.animate({
			opacity: 1
		},500);

	});  // end Open overlay on click

	// Close overlay and project details on click
	$overlay.on("click", function(){

		// Fade-out project details
		$projectDetails.animate({
			opacity: 0
		}, 500)

		// Fade-out project details
		$projectTech.animate({
			opacity: 0
		}, 500)

		// Fade-out overlay
		$overlay.animate({
			opacity: 0
		}, 500, function(){
			$overlay.removeClass("show");
			$projectDetails.remove();
			$projectTech.remove();
			$cursorBorderRight.remove();
			$cursorBorderLeft.remove();
		});


	});  //end Close overlay on click

});