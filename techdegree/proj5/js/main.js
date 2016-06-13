/************************
Variables
*************************/
var $navBar = $("#main-nav");
var $menuReveal = $("#menu-reveal");
var $menuLi = $("#main-nav li");
var $subMenuLi = $("#sub-menu li");
var $backTop = $("#back-top");
var mq = window.matchMedia('all and (max-width: 769px)');
var menuLength = 0;

/************************
Function Expressions
*************************/
var hideMenu = function() {
	$navBar.slideUp(600, "swing");
};

// Function: shows menu itesms
var showMenu = function() {
	$navBar.slideDown(600, "swing");
};

// Function: scrolls to and id on page
var $scroll = function($hash, menuCount) {
	$('html, body').animate({
		scrollTop: $( $hash ).offset().top - 50 * menuCount
	}, 500, "swing");
};

/************************
On 'Click' Action
*************************/

// On menu click, reveal or hide
$menuReveal.on("click", function(){

	// toggles MenuReveal button
	if( $navBar.css("display") === "none" ) {
		showMenu();
	} else {
		hideMenu();
	}
});

// On Main Menu <li> click, hide menu and scroll to id
$menuLi.on("click", function(e){
	// prevent normal action
	e.preventDefault();

	// references id I'm looking for
	var $link = $(this).find("a").attr('href');

	// counts menu items
	mq.addListener(function(changed) {
		if(changed.matches) {
			menuLength = $menuLi.length;
		} else {
			$menuReveal.hide();
			menuLength = 0;
		}
	});

	// invokes hideMenu function
	if (mq.matches) {
		hideMenu();
	}

	// invoke $makeCalls
	$scroll($link, menuLength);

});

// On Sub Menu <li> click, scroll to id
$backTop.on("click", function(e){
	// prevent normal action
	e.preventDefault();

	// references id I'm looking for
	var $link = $navBar.first().find("a").attr('href');

	// counts menu items
	mq.addListener(function(changed) {
		if(changed.matches) {
			menuLength = $menuLi.length;
		} else {
			$menuReveal.hide();
			menuLength = 0;
		}
	});

	// invoke $makeCalls
	$scroll($link, menuLength);

});
// On Back-to-top link click, scroll to id
$subMenuLi.on("click", function(e){
	// prevent normal action
	e.preventDefault();

	// references id I'm looking for
	var $link = $(this).find("a").attr('href');

	// counts menu items
	mq.addListener(function(changed) {
		if(changed.matches) {
			menuLength = $menuLi.length;
		} else {
			$menuReveal.hide();
			menuLength = 0;
		}
	});
	// invoke $makeCalls
	$scroll($link, menuLength);

});
/************************
Media Queries
*************************/
// if javascript works, show menu animation on smart phones

if (mq.matches) {
	$menuReveal.show();
	$navBar.hide();
} else {
	$menuReveal.hide();
}

// if javascript is on and the media changes, 
//    hide or show menu animation accordingly
mq.addListener(function(changed) {
	if(changed.matches) {
		$menuReveal.show();
		$navBar.hide();
	} else {
		$menuReveal.hide();
		$navBar.show();
	}
});


