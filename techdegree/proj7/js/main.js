	/************************
	Prototypes
	*************************/
	/*  Loop Prototypes  */
	MediaElementPlayer.prototype.buildloop = function(player, controls, layers, media) {
	    var
	        // create the loop button
	        loop =
	        $('<div class="mejs-buttons mejs-loop-button ' + ((player.options.loop) ? 'mejs-loop-on' : 'mejs-loop-off') + '">' +
	            '<button type="button" title="Loop" aria-label="Loop"></button>' +
	        '</div>')
	        // append it to the toolbar
	        .appendTo(controls)
	        // add a click toggle event
	        .click(function() {
	            player.options.loop = !player.options.loop;
	            if (player.options.loop) {
	                loop.removeClass('mejs-loop-off').addClass('mejs-loop-on');
	            } else {
	                loop.removeClass('mejs-loop-on').addClass('mejs-loop-off');
	            }
	        });
	}

$(document).ready(function(){

	/************************
	Variables
	*************************/
	var $interactiveVideo = $("#interactive-video");
	var interactiveVideo = document.getElementById("interactive-video"); //Non jquery
	var $htmlCaption = $("#html-caption");
	var $mejsTime = $(".mejs-webdesignertroy .mejs-time");
	var firstSpanTop;
	// Layers attributed to hiding controls (also includes: #interactive-video)
	var $captionsLayer = $(".mejs-captions-position");
	var $mejsControls = $(".mejs-webdesignertroy .mejs-controls");
	var $videoLayer = $(".mejs-layer");
	var $video = $(".mejs-webdesignertroy");

	/************************
	Functions
	*************************/

	/*  Hide Controls  */
	var hideUI = function() {
		$mejsControls.addClass("hide-controls");
		$mejsTime.addClass("hide-time");
	}
	/*  Show Controls */
	var showUI = function() {
		$mejsControls.removeClass("hide-controls");
		$mejsTime.removeClass("hide-time");
	}


	/************************
	Initialize Text
	*************************/

	/*  Load HTML Caption  */
	var myCaptions = internetCaption();
	$htmlCaption.append(myCaptions);

	/************************
	Event Listners
	*************************/

	/*  Hide Controls on mouseleave event  */
	$interactiveVideo.mouseleave(function() {
		hideUI();
	});
	$mejsControls.mouseleave(function() {
		hideUI();
	});
	$captionsLayer.mouseleave(function() {
		hideUI();
	});
	$videoLayer.mouseleave(function() {
		hideUI();
	});

	/*  Hide Controls on mouseenter event */
	$interactiveVideo.mouseenter(function() {
		showUI();
	});
	$mejsControls.mouseenter(function() {
		showUI();
	});
	$captionsLayer.mouseenter(function() {
		showUI();
	});
	$videoLayer.mouseenter(function() {
		showUI();
	});

	/************************
	Highlight Active 
	Captions
	*************************/
	// Create "captionObject" to hold caption appearance
	//    start time and a unique id
	var captionList = []
	var captionObject;

	//    Iterate each instance of <span> in #html-caption
	//       and collect caption start and id info
	$htmlCaption.find("span").each(function(){
		var captionID = $(this).attr("id");
		var captionStartTime = $(this).attr("data-start");
		captionObject = {
			captionID: captionID,
			captionStartTime: captionStartTime
		}
		captionList.push(captionObject);
	});

	//  Use MediaElement's "timeupdate", to listen for the start 
	//      of each caption segment's appearance.  Highlight active 
	//      caption segments (housed in <span>). Un-highlight inactive
	//      captions
	interactiveVideo.addEventListener("timeupdate" , function() {
		var index = -1;

		//   Iterate each instance of <span> in #html-caption
		//      and highlight active the active caption.
		//      un-highlight inactive captions
		$htmlCaption.find("span:first-child").each(function(){
			firstSpanTop = this.offsetTop;
		});

		$htmlCaption.find("span").each(function(){
			index++;
			if ( captionList[index].captionStartTime <= interactiveVideo.currentTime && interactiveVideo.currentTime < captionList[index+1].captionStartTime  ) {
				$(this).addClass("highlight-active");
					$(this).parent().animate ({
						scrollTop: this.offsetTop - firstSpanTop
					}, 400);
			} else {
				$(this).removeClass("highlight-active");
			}
		
		
		});
	});

	/************************
	Make Caption Text
	Under Video, Clickable
	*************************/
	// When mouse clicks on any part of the HTML caption, video 
	//   jumps to that part of the time line.
	$(document).on("click", ".current-caption", function(e){
		var captionID = $(this).attr("id");
		var captionStartTime = $(this).attr("data-start");
		interactiveVideo.currentTime = captionStartTime;
		$("#html-caption").find("span").each(function(){
			$(this).removeClass("highlight-active");
		});
		$(this).addClass("highlight-active");
	});

	/************************
	Fix Current Time and 
	Duration Separator
	*************************/
	//  Convert the pipe "|" separating
	//     the current time and durartion
	//     to a forward slash "/"
	var i = 0;
	$(".mejs-time").find("span").each(function(){
		if (  $(this).html() === " | " ) {
			$(this).html(" / ");
		}
	});

});






