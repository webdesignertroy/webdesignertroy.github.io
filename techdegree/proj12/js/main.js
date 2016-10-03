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
		$('html, body').animate({
			scrollTop: $( $hash ).offset().top - 10 * menuCount -20
		}, 500, "swing");
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

 		// counts menu items to determine menu height
		mq.addListener(function(changed) {
			if(changed.matches) {
				menuLength = $menuLi.length;
			} else {
				$menuReveal.hide();
				menuLength = 0;
			}
		});

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

		// counts menu items to determine menu height
		mq.addListener(function(changed) {
			if(changed.matches) {
				menuLength = $menuLi.length;
			} else {
				$menuReveal.hide();
				menuLength = 0;
			}
		});

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
		 		$("#back-top").removeClass("hide-div");
		 	} else {
		 		$("#back-top").addClass("hide-div");

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

// Create project list of objects with variables
var projects=[ {
	name: "Responsive registration form", url: "http://andystoica.github.io/fewd-project-03/", github: "https://github.com/andystoica/fewd-project-03", description: 'In this project I built a responsive, mobile-friendly registration form using a wide variety of HTML form input types and attributes. Using the supplied mockup file as a guide, I created repsonsive mobile, tablet and desktop versions of the form using CSS media queries and a "mobile-first" approach as well as implementing custom form controls.', preview: "project-preview-1.jpg", tech: ["html", "css", "github"]
	}

	,
	{
		name: "Interactive photo gallery", url: "http://andystoica.github.io/fewd-project-04/", github: "https://github.com/andystoica/fewd-project-04", description: "This project was about creating an interactive photo gallery using JavaScript and jQuery. Thumbnails and photos were be provided with descriptions. User intraction with the search box will cause images in the gallery to be filtered based on the input. Clicking on thumbnails, opens up a lighbox showing a larger version of each photo and allows keyboard navigation.", preview: "project-preview-2.jpg", tech: ["html", "css", "js", "jquery", "github"]
	}

	,
	{
		name: "Responsive layouts with Sass", url: "http://andystoica.github.io/fewd-project-05/", github: "https://github.com/andystoica/fewd-project-05", description: "This project was about refactoring a previous project originally written in CSS, to Sass. I used the oportunity to redesign the layout using Flexbox instead of floating divs. I also took advantage of many Sass features such as support for partials, variables, extends, and mixins to write modular, more maintainable code.", preview: "project-preview-3.jpg", tech: ["html", "css", "sass", "github"]
	}

	,
	{
		name: "Interactive video player", url: "http://andystoica.github.io/fewd-project-07/", github: "https://github.com/andystoica/fewd-project-07", description: "This is an HTML5 video player featuring custom control elements, written in JavaScript using the HTML5 Video API. Using the supplied mockups, video files, and transcript, I wrote an interactive video player that synchronizes the video and the transcript. The transcript is highlighting as the video progresses.", preview: "project-preview-4.jpg", tech: ["html", "css", "js", "jquery", "github"]
	}

	,
	{
		name: "Web application dashboard", url: "https://andystoica.github.io/fewd-project-09/", github: "https://github.com/andystoica/fewd-project-09", description: "This project was about building a beautiful web application dashboard complete with JavaScript-driven charts and graphs base on a suplied graphic mockup. This was a front end project onlythat required to create the responsive layout in HTML and CSS with added JavaScript functionality. Flexbox and Sass proved to be invaluable tools.", preview: "project-preview-5.jpg", tech: ["html", "css", "sass", "js", "github"]
	}

	,
	{
		name: "Public API galley", url: "https://andystoica.github.io/fewd-project-10/", github: "https://github.com/andystoica/fewd-project-10", description: "This project was about using at least one of the provided APIs to grab, fromat and present data from that API. Items had to be presented on a page in an attractive gallery of images or titles. Clicking an image opens a lightbox prodiving detailed information about that item. This project included Ajax calls using jQuery, pasring and formatting JSON with Javascript and a bit of CSS magic.", preview: "project-preview-6.jpg", tech: ["html", "css", "sass", "js", "jquery", "github"]
	}
]

	// Create "for loop" with HTML code mixed with variables
	    // (For assignement only) Not best practice because there's no 'separation of concerns'
	function renderProjectDetails(e) {
		for ( var t="",  i=0; i < projects.length; i++ ) 

			t+="<h3>"+projects[i].name+"</h3>",
			t+='<div class="project-preview"><img src='+link+'images/'+projects[i].preview+' alt=""></div>',
			t+='<div class="project-links">',
			t+='  <a href="'+projects[i].url+'" target="_blank" class="btn-project-view">Demo</a>',
			t+='  <a href="'+projects[i].github+'" target="_blank" class="btn-project-github">GitHub</a>',
			t+="</div>",
			t+="<p>"+projects[i].description+"</p>",
			t+='<ul class="skills">',
			t+="</ul>";

		$(".project-details").html(t);
	}

	// Invoke function
	renderProjectDetails();


});