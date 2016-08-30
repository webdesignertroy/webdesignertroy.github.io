$(document).ready(function(){
	/******************************
	VARIABLES
	******************************/
	/* Element ==> jQuery */

	//   main navigation
	var $dashboard = $("#dashboard");
	var $members = $("#members");
	var $charts = $("#charts");
	var $settings = $("#settings");

	//   notification system
	var $notification = $("#notification");
	var $alertArea = $("#alert-area");
	var $notificationPlaceholder = $("#notification-placeholder");
	var $note = $(".note");
	var $innerNote = $(".inner-note");

	//   charts
	var $hourly = $("#hourly");
	var $daily = $("#daily");
	var $weekly = $("#weekly");
	var $monthly = $("#monthly");
	var $trafficUlLi =$("#traffic ul li");

	//  member users
	var $searchMember = $("#search-member");
	var $list = $("#list");
	var $messageMember = $("#message-member");
	var $formButton = $("#member-button");
	var $sendMessage = $("#send-message");
	var $successHelp = $(".success-help");
	var $help = $(".help");


	//  settings
	var $emailNotification = $("#email-notifications");
	var $publicProfile = $("#public-profile");
	var $timezoneOption = $("#timezone option");
	var $timezoneSelect = $("#timezone");
	var $save = $("#save"); 
	var $reset = $("#reset-form");

	//  jQuery Ui checkbox light switch
	var $switchWrapper = $(".switch-wrapper");

	/* Other */
	var lineChart = null;
	var oldData = null;
document.getElementById("title").innerHTML = "JS Working Test 2";
	/******************************
	HELPER DECLARATION FUNCTIONS
	******************************/

	// Use regex decode HTML
	function strip(message) {

		var regex = /(<([^]+)>\n)/ig;
		var cleanIt = message.replace(regex, "");
		var results = cleanIt.trim();
		return results;

	}

	// Get enclosing element on an event (e.g. "click")
	function targetChoice(e){

		e = e || window.event;

		return e.target || e.srcElement; // Accommodate all browsers

	}

	/******************************
	OBJECTS-ORIENTED VARIABLES
	******************************/

	/*****  Navigation Object Literal  *****/
	var nav = {

		// Show active nav item link, using green bar,
		//  on main navigation menu
		activeNav: function(link) {

			$("#nav ul").find("li").each(function(){
				$(this).find("span").removeClass("active");
			});
			link.find("span").addClass("active");

		}

	};

	/*****  Notification Object  *****/
	var notify = {

		// Notification messages
		messageList: [{
			notification: "You have not verified your account.", note: "warning", message: "<h3>You have not verified your account</h3><p>A confimation request was sent to your email. Please confirm your account by clicking the link provided.</p>  <p>If you have any questions, please contact us at <a href='http://www.w3schools.com/tags/tag_html.asp' target='_blank'>http://yourapp.com/acconts</a>.</p>"
		},
		{
			notification: "Your ad has been approved and is ready for publication.", note: "marketing", message: "<h3>Congratulations</h3><p>Your ad has been approved. Visit <a href='http://www.w3schools.com/tags/tag_html.asp' target='_blank'>http://yourapp.com/ads</a> for more information.</p>"
		},
		{
			notification: "Invite your friends to use YourApp&trade;.", note: "marketing", message: "<h3>Invite Your<br />Friends Over</h3><p>Good friends don't let  friends pass on the promotions and deals <strong>YourApp&trade;</strong> offers.  Visit <a href='http://www.w3schools.com/tags/tag_html.asp' target='_blank'>http://yourapp.com/invite</a> for instructions on how to generate invites from your Facebook or email contact lists.</p>"
		}],

		// Close the notification bar smoothly after
		//  clicking attached close button
		closeNotify: function(divName) {

			var counter = -1;
			divName.parent().animate({
				opacity: 0
			},function(){
				divName.parent().addClass("hide-div");
			});
			$notificationPlaceholder.children().each(function(){
				if ( !$(this).hasClass("hide-div") ) {
					counter++;
				}
			});
			if ( counter < 1 ) {
				$notification.find("span").removeClass("alert");
			}

		},

		// Show accompanying pop-up message after
		//   clicking notification bar
		openMessage: function(divName) {

			divName.parent().find(".alert-message").addClass("show-message");
			divName.parent().find(".alert-message").animate({
				opacity: 1
			});

		},

		// Close accompanying pop-up message after
		//   clicking alert message
		closeMessage: function(divName) {

			divName.parent().find(".alert-message").animate({
				opacity: 0,
				left: 0
			}, function(){
				$(this).parent().find(".alert-message").removeClass("show-message");
			});

		},

		// Special message: Browser compatibiliy and 
		//   teacher's notes
		openMessageTest: function(message) {

			$innerNote.text(message);
			$note.addClass("show-message");
			$note.animate({
				opacity: 1
			});
			var messageTimer = setInterval(function(){
				clearInterval(messageTimer);
				$note.animate({
					opacity: 0
				}, function(){
					$note.removeClass("show-message");
				});
			}, 4000);

		},

		// Open all messages after selecting notification icon
		openAll: function() {

			var counter1 = 0;
			var counter2 = 0;
			$notificationPlaceholder.children().find(".alert-message").each(function(){
				// display and animate
				$(this).addClass("show-message").animate({
					opacity: 1,
					left: counter1 * 30
				});
				counter1++;
			});
			$notificationPlaceholder.children().each(function(){
				if ( !$(this).hasClass("hide-div") ) {
					counter2++;
				}
			});
			if ( counter2 < 1 ) {
				var message = "Tester: You closed all the "; 
				message += "notifications. Refresh the page ";
				message += "and click the icon again.";
				notify.openMessageTest(message);
			}

		}

	};

	

	/******************************
	BUILD ELEMENTS/HTML
	******************************/

	/**********   BUILD NOTIFICATIONS  **********/

	// Instantiate NOTIFICATIONS via Handlebars Templating Machine 
	//   handlebars.js

	//reference
	var source = $alertArea.html();

	//complile the source markup
	var notificationTemplate = Handlebars.compile(source);

	// Iterate through messages
	for (var i = 0; i < notify.messageList.length; i++) {

		// define the data object
		var messageData = {
			note: notify.messageList[i].note,
			notification: notify.messageList[i].notification,
			message: notify.messageList[i].message
		};

		// pass data object to template
		var fullText = notificationTemplate(messageData);

		// append to to #alert-area
		$("#notification-placeholder").append(fullText);

	}

	

});




