$(document).ready(function(){
	/******************************
		VARIABLES
	******************************/
	/* element to jQuery */
	var $dashboard = $("#dashboard");
	var $members = $("#members");
	var $charts = $("#charts");
	var $settings = $("#settings");

	var $notification = $("#notification");
	var $alertArea = $("#alert-area");
	var $alertMessage = $(".alert-message");
	var $alertBox = $(".alert-box");
	var $notificationPlaceholder = $("#notification-placeholder");

	/******************************
		HELPER FUNCTIONS
	******************************/
		function strip(message) {
			var regex = /(<([^]+)>\n)/ig;
			var results = message.replace(regex, "");
			var results = results.trim();
			return results;
		}
		//reference
		var source = $alertArea.html();

		//complile the source markup
		var notificationTemplate = Handlebars.compile(source);

	/******************************
		OBJECTS-ORIENTED VARIABLES
	******************************/
	// Notificaiton Object
	var notify = {
		// Notification messages
		messageList: [{
				notification: "You have not verified your account.", note: "warning", message: "<p>This message is in <a href='http://www.w3schools.com/tags/tag_html.asp' target='_blank'>HTML</a> format</p>"
			},
			{
				notification: "Yout post has been approved and is ready for publication.", note: "marketing", message: "<p>This message is ALSO in <a href='http://www.w3schools.com/tags/tag_html.asp' target='_blank'>HTML</a> format</p>"
			}],
		// Close the notification bar smoothly
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
		// Show accompanying pop-up message
		openMessage: function(divName) {
			divName.parent().find(".alert-message").addClass("show-message");
			divName.parent().find(".alert-message").animate({
				opacity: 1
			});
		},
		// Show accompanying pop-up message
		closeMessage: function(divName) {
			divName.parent().find(".alert-message").animate({
				opacity: 0
			});
			divName.parent().find(".alert-message").removeClass("show-message");
		}
	}	

	/******************************
		BUILD ELEMENTS/HTML
	******************************/
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

	/******************************
		BUILD CHARTS
	******************************/
	
	  
	  function trafficChart() {
	    var data = {
	      labels: ["January", "February", "March", "April", "May", "June", "July"],
	      datasets: [
	        {
	          label: "My Second dataset",
	          fillColor: "rgba(151,187,205,0.2)",
	          strokeColor: "rgba(151,187,205,1)",
	          pointColor: "rgba(151,187,205,1)",
	          pointStrokeColor: "#fff",
	          pointHighlightFill: "#fff",
	          pointHighlightStroke: "rgba(151,187,205,1)",
	          data: [28, 48, 40, 19, 86, 27, 190]
	        }
	      ]
	    };

		Chart.defaults.global.responsive = true;

	    var ctx = $("#traffic-chart")[0].getContext("2d");
	    currentChart = new Chart(ctx).Line(data, {
	    	pointDotRadius: 5,
	    	bezierCurve: true
	    });
	  }
	  trafficChart();
	  
	/******************************
		EVENT LISTENERS/HANDLERS
	******************************/
	/*******  NAV BUTTONS  *******/
	// Dashboard Nav Item
	$dashboard.click(function(){
		console.log("Do Something on the Dashboard Buttons");
	});
	// Members Nav Item
	$members.click(function(){
		console.log("Do Something on the Members Button");
	});
	// Charts Nav Item
	$charts.click(function(){
		console.log("Do Something on the Charts Buttons");
	});
	// Settings Nav Item
	$settings.click(function(){
		console.log("Do Something on the Settings Buttons");
	});


	/*******  BUBBLING EVENT BUTTONS  *******/
	
	$(".close").on("click", function() {
		notify.closeNotify($(this));
	});
	$(".alert-notification").on("click", function() {
		notify.openMessage($(this));
	});
	$(".alert-message").on("click", function() {
		notify.closeMessage($(this));
	});
});
	



