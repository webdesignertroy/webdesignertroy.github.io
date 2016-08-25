$(document).ready(function(){
	/******************************
	VARIABLES
	******************************/
	/* Element ==> jQuery */
	var $dashboard = $("#dashboard");
	var $members = $("#members");
	var $charts = $("#charts");
	var $settings = $("#settings");

	var $notification = $("#notification");
	var $alertArea = $("#alert-area");
	var $alertMessage = $(".alert-message");
	var $alertBox = $(".alert-box");
	var $notificationPlaceholder = $("#notification-placeholder");

	var $hourly = $("#hourly");
	var $daily = $("#daily");
	var $weekly = $("#weekly");
	var $monthly = $("#monthly");

	/* Other */
	var lineChart = null;
	var oldData = null;

	/******************************
	HELPER DECLARATION FUNCTIONS
	******************************/
	function strip(message) {
		var regex = /(<([^]+)>\n)/ig;
		var results = message.replace(regex, "");
		var results = results.trim();
		return results;
	}

	/******************************
	OBJECTS-ORIENTED VARIABLES
	******************************/

	/*****  Navigation Object  *****/
	var nav = {
		activeNav: function(link) {
			$("#nav ul").find("li").each(function(){
				$(this).find("span").removeClass("active");
			});
			link.find("span").addClass("active");
		}
	}

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

		// Handle missed requirement (delete after grading)
		openMessageTest: function() {
			$(".note").addClass("show-message");
			$(".note").animate({
				opacity: 1
			});
			setInterval(function(){
				$(".note").animate({
					opacity: 0
				}, function(){
					$(".note").removeClass("show-message");
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
				notify.openMessageTest();
			}
		}
	}

	/*****  Traffic Line Chart Object  *****/
	var lineTraffic = {

		// Hourly Data
		trafficHour: function() {
			var hours = {
				labels: ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM"],
				datasets: [
					{
						label: "Hourly",
						fillColor: "rgba(255, 105, 105, 0.2)",
						strokeColor: "rgba(255, 105, 105, 1)",
						pointColor: "rgba(255, 105, 105, 1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(255, 105, 105, 1)",
						data: [31, 42, 25, 52, 89, 101, 66, 105, 63, 31, 25, 24, 20]
					}
				]
			};

			lineTraffic.drawChart(hours);
		},

		// Daily Data
		trafficDay: function() {
			var days = {
				labels: ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"],
				datasets: [
					{
						label: "Daily",
						fillColor: "rgba(170,153, 57, 0.1)",
						strokeColor: "rgba(170,153, 57, 1)",
						pointColor: "rgba(170,153, 57, 1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(170,153, 57, 1)",
						data: [305, 425, 633, 581, 233, 455, 365]
					}
				]
			};

			lineTraffic.drawChart(days);
		},

		// Weekly Data
		trafficWeek: function() {
			var week = {
				labels: ["(This Week)", "Week 2", "Week 3", "Week 4", "Week 5"],
				datasets: [
					{
						label: "Daily",
						fillColor: "rgba(136, 204, 136, 0.2)",
						strokeColor: "rgba(136, 204, 136, 1)",
						pointColor: "rgba(136, 204, 136, 1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(136, 204, 136, 1)",
						data: [1203, 1355, 902, 878, 1026]
					}
				]
			};

			lineTraffic.drawChart(week);
		},

		// Monthly Data
		trafficMonth: function() {
			var months = {
				labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
				datasets: [
					{
						label: "Monthly",
						fillColor: "rgba(151, 187, 205, 0.2)",
						strokeColor: "rgba(151, 187, 205, 1)",
						pointColor: "rgba(151, 187, 205, 1)",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(151, 187, 205 ,1)",
						data: [10233, 12682, 18523, 14629, 18923, 16234, 11231, 17234, 9973, 20323, 19234, 11323]
					}
				]
			};

			lineTraffic.drawChart(months);
		},

		// Draw Chart
		drawChart: function(data) {
			//  Global options
			Chart.defaults.global.responsive = true;

			//  Variables
			var canvas = document.querySelector("#traffic-chart");
			var ctx = canvas.getContext("2d");

			// remove old data before drawing new
			var counter = 0;
			if (lineChart != null) {
				for( i=0; i < oldData.length + 1 ; i++ ) {
					lineChart.removeData();
				}
			}	

			// draw new chart
			//   lineChart and old Data need
			//   to stay global as variables 
			lineChart = new Chart(ctx).Line(data, {
				pointDotRadius: 5,
				bezierCurve: true
			});

			// Store current data to variable to use
			//   on next option cycle
			oldData = data.datasets[0].data;
		},

		// Select time option
		activeTraffic: function(divName, time){
			// iterate through Traffic options
			//   remove active style
			$("#traffic ul li").each(function(){
				$(this).removeClass("active-time");
			});
			// Add active style to newly selected
			//   Traffic option
			divName.addClass("active-time");

			// Switch Statement and draw appropriate
			//    Traffic chart 
			switch(time) {
				case "days":
				lineTraffic.trafficDay();
				break;
				case "hours":
				lineTraffic.trafficHour();
				break;
				case "weeks":
				lineTraffic.trafficWeek();
				break;
				case "months":
				lineTraffic.trafficMonth();
				break;
			}
		}
	}
	/*****  Daily Traffic Bar Chart Object  *****/

	var barDailyTraffic = {

		// Daily Traffic data
		barDay: function() {
			var days = {
				labels: ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"],
				datasets: [
					{
						label: "Unique Visits",
						data: [125, 232, 411, 342, 55, 211, 118],
						fillColor: "rgba(170,153, 57, 0.5)",
						strokeColor: "rgba(170,153, 57, 1)"
					},
					{
						label: "Return Visits",
						data: [255, 391, 522, 442, 200, 355, 234],
						fillColor: "rgba(151, 187, 205, 0.5)",
						strokeColor: "rgba(151, 187, 205, 1)"
					}
				]
			};

			barDailyTraffic.drawBarChart(days);
		},

		// Draw Chart
		drawBarChart: function(data) {

			Chart.defaults.global.responsive = true;

			var canvas = document.querySelector("#daily-chart");

			var ctx = canvas.getContext("2d");

			var barChart = new Chart(ctx).Bar(data, {
				pointDotRadius: 5
			});
			document.getElementById('daily-chart-legend').innerHTML = barChart.generateLegend();
		}
	}

	/*****  Mobile Users Doughnut Chart Object  *****/

	var mobileUsers = {

		//Mobile User data
		mobile: function() {
			var users = [
				{	
					label: "IOS",
					value: 40,
					color: "rgba(151, 187, 205, 0.5)"
				},
				{
					label: "Android",
					value: 30,
					color: "rgba(170,153, 57, 0.5)"
				},
				{
					label: "Windows",
					value: 20,
					color: "rgba(136, 204, 136, 0.5)"
				},
				{
					label: "Other",
					value: 10,
					color: "rgba(255, 105, 105, 0.5)"
				}
			]
			mobileUsers.drawDoughnutChart(users);
		},

		// Draw Chart
		drawDoughnutChart: function(data) {

			Chart.defaults.global.responsive = true;

			var canvas = document.querySelector("#mobile-chart");

			var ctx = canvas.getContext("2d");
			var doughnutChart = new Chart(ctx).Doughnut(data, {
			});
			document.getElementById('mobile-legend').innerHTML = doughnutChart.generateLegend();
		}

	}



	/******************************
	BUILD ELEMENTS/HTML
	******************************/

	// Instantiate notifications via Handlebars Templating Machine 
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

	/******************************
	BUILD CHARTS
	******************************/

	// Instantiate Charts
	lineTraffic.trafficMonth();
	barDailyTraffic.barDay();
	mobileUsers.mobile();

	/******************************
	EVENT LISTENERS/HANDLERS
	******************************/

	/*******  NAV BUTTONS  *******/

	// Dashboard Nav Item
	$dashboard.click(function(){
		nav.activeNav($(this));
	});
	// Members Nav Item
	$members.click(function(){
		nav.activeNav($(this));
	});
	// Charts Nav Item
	$charts.click(function(){
		nav.activeNav($(this));
	});
	// Settings Nav Item
	$settings.click(function(){
		nav.activeNav($(this));
	});
	// Notification Icon
	$notification.click(function(){
		notify.openAll();
	});

	/*******  TRAFFIC BUTTONS  *******/

	// Hourly Option
	$hourly.click(function(){
		hours = "hours";
		lineTraffic.activeTraffic($(this), hours);
	});
	// Daily Option
	$daily.click(function(){
		days = "days";
		lineTraffic.activeTraffic($(this), days);
	});
	// Weekly Option
	$weekly.click(function(){
		weeks = "weeks";
		lineTraffic.activeTraffic($(this), weeks);
	});
	// Monthly Option
	$monthly.click(function(){
		months = "months";
		lineTraffic.activeTraffic($(this), months);
	});

	/*******  BUBBLING EVENT BUTTONS  *******/

	$(".close").on("click", function() {
		notify.closeNotify($(this));

		/*$(".alert").html(counter);*/
	});
	$(".alert-notification").on("click", function() {
		notify.openMessage($(this));
	});
	$(".alert-message").on("click", function() {
		notify.closeMessage($(this));
	});
});




