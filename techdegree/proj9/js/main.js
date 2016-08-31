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

	/*****  Traffic Line Chart Object Literal  *****/
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

			//  variables
			var canvas = document.querySelector("#traffic-chart");
			var ctx = canvas.getContext("2d");

			// remove old data before drawing new
			if (lineChart !== null) {
				for( i=0; i < oldData.length + 1 ; i++ ) {
					lineChart.removeData();
				}
			}	

			// draw new chart
			//   lineChart and old Data need
			//   to stay global as variables 
			lineChart = new Chart(ctx).Line(data, {
				pointDotRadius: 5,
				bezierCurve: true,
				responsive: true
			});

			// store current data to variable to use
			//   on next option cycle
			oldData = data.datasets[0].data;

		},

		// Select time-level (i.e., Hourly, Daily) option
		activeTraffic: function(divName, time){

			// iterate through Traffic options
			//   remove active style
			$trafficUlLi.each(function(){
				$(this).removeClass("active-time");
			});
			// add active style to newly selected
			//   Traffic option
			divName.addClass("active-time");

			// switch Statement and draw appropriate
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

	};

	/*****  Daily Traffic Bar Chart Object Literal  *****/

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

			var canvas = document.querySelector("#daily-chart");

			var ctx = canvas.getContext("2d");

			var barChart = new Chart(ctx).Bar(data, {
				responsive: true
			});
			document.getElementById('daily-chart-legend').innerHTML = barChart.generateLegend();

		}

	};

	/*****  Mobile Users Doughnut Chart Object Literal  *****/

	var mobileUsers = {

		//Mobile User data
		mobile: function() {
			var users = [
				{	
					label: "IOS",
					value: 43,
					color: "rgba(151, 187, 205, 0.5)"
				},
				{
					label: "Android",
					value: 35,
					color: "rgba(170,153, 57, 0.5)"
				},
				{
					label: "Windows",
					value: 15,
					color: "rgba(136, 204, 136, 0.5)"
				},
				{
					label: "Other",
					value: 7,
					color: "rgba(255, 105, 105, 0.5)"
				}
			];
			mobileUsers.drawDoughnutChart(users);
		},

		// Draw Chart
		drawDoughnutChart: function(data) {

			var canvas = document.querySelector("#mobile-chart");

			var ctx = canvas.getContext("2d");
			var doughnutChart = new Chart(ctx).Doughnut(data, {
				responsive: true,
				segmentShowStroke: false,
				tooltipTemplate: "<%= value %>%"
			});
			document.getElementById('mobile-legend').innerHTML = doughnutChart.generateLegend();
		}

	};

	/*****  Social Stat Object Literal  *****/

	var social = {
		media: [
			{
				socialMedia: "Facebook", value: "10,2015", socialId: "facebook-svg"
			},

			{
				socialMedia: "Twitter", value: "6,525", socialId: "twitter-svg"
			},

			{
				socialMedia: "Google+", value: "3,834", socialId: "googleplus-svg"
			},

			{
				socialMedia: "LinkedIn", value: "4,232", socialId: "linkedin-svg"
			},

			{
				socialMedia: "Instagram", value: "8,900", socialId: "instagram-svg"
			}
		]
	};

	/*****  Members Chart Object Literal  *****/	

	var members = {
		memberData: [
			{
				id:1123, first: "Sharon", last:"Lee", profile:"sharon-1123", join:"Aug 8, 2012", email:"sharon.lee1985@example.com", recentActivity:"commented on Facebook's Changes for 2016.", recentTime:"2 hours ago", activity: "commented"
			},

			
			{
				id:2134, first: "John", last:"Warner", profile:"john-2134", join:"May 28, 2013", email:"johnny90064@example.com", recentActivity:"posted Facebook's Changes for 2016.", recentTime:"3 hours ago", activity: "posted"
			},

			{
				id:9009, first: "Crystal", last:"Meyers", profile:"crystal-9009", join:"Aug 23, 2016", email:"crystal1989@example.com", recentActivity:"commented on YourApp's SEO Tips.", recentTime:"4 hours ago", activity: "commented"
			},

			{
				id:9101, first: "Jackie", last:"Sun", profile:"jackie-9101", join:"Aug 25, 2016", email:"jackie.sun@example.com", recentActivity:"just joined YourApp&trade; a few hours ago.", recentTime:"5 hours ago", activity: "joined"
			},

			{
				id:9153, first: "Jill", last:"Scott", profile:"jill-9153", join:"Aug 25, 2016", email:"jillthehammer@example.com", recentActivity:"commented on YourApp's SEO Tips.", recentTime:"5 hours ago", activity: "commented"
			},

			{
				id:9254, first: "Manuel", last:"Ortiz", profile:"manuel-9254", join:"Aug 25, 2016", email:"manuel-ortiz@example.com", recentActivity:"posted YourApp's SEO Tips.", recentTime:"1 day ago", activity: "posted"
			}
		],

		newMembers: function() {
			// variables
			var newMemberList = [];

			// loop through all members
			for ( var index = members.memberData.length - 1; index > 0; index-- ) {

				// I expect to search PHP to find
				//   most recent and last index numbers
				//   8000 and 10,000 will be given parameters
				for( i = 8000; i < 10000; i++) {
					var name = "";
					var profile = "";
					var email = "";
					var join = "";
					if( members.memberData[index].id === i ) {
						name = members.memberData[index].first + " ";
						name += members.memberData[index].last;
						profile = members.memberData[index].profile;
						email = members.memberData[index].email;
						join = members.memberData[index].join;
						newMemberList.push({name: name, profile: profile, email: email, join: join});
					}
				}

			}
			return newMemberList;
		},
		
		buildMemberArray: function(value) {
		// Create an array of member choices

		var searched = [];
		var given = value.toLowerCase();
		for ( i = 0; i < members.memberData.length; i++ ) {
			var member = members.memberData[i].first + " " + members.memberData[i].last;
			member = member.toLowerCase();
			if ( member.indexOf(given) !== -1 ) {
				if (given !== "" ) {
					searched.push(member);
				}
			}
		}
		return searched;

		},

		searchForm: function(value) {

			// Create an array of member choices
			var sel = document.getElementById("list");
			var searched = [];
			var given = value.toLowerCase();
			for ( i = 0; i < members.memberData.length; i++ ) {
				var memberItem = members.memberData[i].first + " " + members.memberData[i].last;
				memberItem = memberItem.toLowerCase();
				if ( memberItem.indexOf(given) !== -1 ) {
					if (given !== "" ) {
						searched.push(memberItem);
					}
				}
			}

			//  Remove previous results from #list li
			var selExists = sel.getElementsByTagName("li")[0];
			if ( typeof selExists !== "undefined" || typeof selExists !== "unknown") {
				var selLength = sel.getElementsByTagName("li").length;
				for ( i = 0; i < selLength; i++ ) {
					if ( typeof sel.getElementsByTagName("li")[i] !== "undefined" || typeof sel.getElementsByTagName("li")[i] !== "unknown" ) {
						sel.getElementsByTagName("li")[i].remove();
					} else {
						sel.getElementsByTagName("li")[0].remove(); 
					}
				}
			}

			// Propagate #list li
			for ( i = 0; i < searched.length; i++ ) {
				var li = document.createElement("li");
				li.innerHTML = searched[i];
				sel.appendChild(li);
			}

			// Hide list if no Choices
			if ( searched.length > 0 ) {
					$("#list").removeClass("hide-div");
				} else {
					$("#list").addClass("hide-div");
			}

		},

		// Add first result to search field
		//   on [TAB]
		updateSearchField: function(li, e) {

			$searchMember.val(li);
			$list.addClass("hide-div");

		},

		// Notifies user of validation error
		validateThis: function(fieldName, message) {

			fieldName.html(strip(message));
			fieldName.addClass("show-validate");

		},

		// Fades out validation message
		fadeMessage: function(parent, helper) {

			var timedMessage = setInterval(function(){
				clearInterval(timedMessage);
				parent.find(helper).each(function(){
					$(this).removeClass("show-validate");
				});
			}, 1500);

		},

		// Clears fields of Message User form 
		clearFields: function() {

			$sendMessage.find(".clear").each(function(){
				$(this).val("");
			});

		},

		// Validates Message User form
		validateForm: function() {

			// variables
			var searchMemberVal = $searchMember.val().trim();
			var messageMemberVal = $messageMember.val().trim();
			var test = 0;
			var parent =$("#send-message");
			var $helperField;
			var message;
			var help;

			//  check #search-member for val
			if ( searchMemberVal === "" || searchMemberVal === null ) {
				$helperField = $("#help-member");
				message = "Check 1: Please type member name";
				members.validateThis($helperField, message);
			} else {
				test++;
			}

			// check #message-member for val
			if ( messageMemberVal === "" || messageMemberVal === null ) {
				$helperField = $("#help-write");
				message = "Check 1: Please write something";
				members.validateThis($helperField, message);
			} else {
				test++;
			}

			// check 1: test for blank fields, etc.
			if ( test < 2 ) {
				help = $(".help");
				members.fadeMessage(parent, help);
				return;
			}

			// check 2: check #message-member field against member list

			var foundMember = members.buildMemberArray($searchMember.val());
			if ( foundMember.length < 1 ) {
				$helperField = $("#help-member");
				help = $(".help");
				message = "Check 2: There is no member by that name";
				members.validateThis($helperField, message);
				members.fadeMessage(parent, help);
				return;
			}

			// send message via PHP or equivalent
			//      [----CODE---]

			// relay timed success message
			$helperField = $("#help-submit");
			message = "SUCCESS! Message sent";
			help = $(".success-help");
			members.validateThis($helperField, message);
			members.clearFields();
			members.fadeMessage(parent, help);

		}

	};
	/*****  Settings  Object Literal  *****/	

	var appSettings = {

		// Save settings on localStorage
		saveSettings: function() {

			// variables
			var saveEmail = $emailNotification.prop("checked");
			var savePublic = $publicProfile.prop("checked");
			var $helperField = $("#help-save");
			var message = "SUCCESS! Saved";
			var parent = $("#dashboard-settings");
			var help = $(".success-help");

			// save email notification option
			localStorage.setItem("emailSetting", saveEmail);

			// save profile option
			localStorage.setItem("publicSetting", savePublic);

			// save timezone
			for ( i = 0; i < $timezoneOption.length; i++) {
				if ( $timezoneOption[i].selected === true ){
					var saveTimezone = i;
					localStorage.setItem("timezoneSetting", saveTimezone);
				}

			}

			// relay timed success message
			members.validateThis($helperField, message);
			members.fadeMessage(parent, help);
		},

		// Retrieve settins from local storage
		retrieveSettings: function() {

			//retrieve  email notification choice
			var getEmail = localStorage.getItem("emailSetting");
			var getPublic = localStorage.getItem("publicSetting");
			var getTimezone = localStorage.getItem("timezoneSetting");

			//retrieve  email notification choice
			if ( typeof(getEmail) !== "undefined") {
				if ( getEmail !== "true" ) {
					$emailNotification.switchButton({
						checked: false
					});
				} else {
					$emailNotification.switchButton({
						checked: true
					});
				}
			}

			// retrive public profile notification
			if ( typeof(getPublic) !== "undefined") {
				if ( getPublic !== "true" ) {
					$publicProfile.switchButton({
						checked: false
					});
				} else {
					$publicProfile.switchButton({
						checked: true
					});
				}

			}

			// retrieve timezone
			$timezoneSelect.prop("selectedIndex", getTimezone);

		},

		//  Reset Defaults
		clearSettings: function() {

			// variables
			var $helperField = $("#help-save");
			var message = "Settings set to Default";
			var parent = $("#dashboard-settings");
			var help = $(".success-help");

			// clear localStorage
			localStorage.clear();

			// reset fields to given defaults

			// email notification reset
			$emailNotification.switchButton({
				checked: false
			});
			// public profile reset
			$publicProfile.switchButton({
				checked: false
			});
			// timezone reset
			$timezoneSelect.prop("selectedIndex", 0);

			// relay timed success message
			members.validateThis($helperField, message);
			members.fadeMessage(parent, help);
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

	/**********   BUILD SOCIAL STATS  **********/

	// Instantiate SOCIAL STATS via Handlebars Templating Machine 
	//   handlebars.js

	//reference
	var source2 = $("#social-handle").html();

	//complile the source markup
	var socialTemplate = Handlebars.compile(source2);

	// Iterate through messages
	for (var j = 0; j < social.media.length; j++) {

		// define the data object
		var messageData2 = {
			socialId: social.media[j].socialId,
			socialMedia: social.media[j].socialMedia,
			value: social.media[j].value
		};

		// pass data object to template
		var fullText2 = socialTemplate(messageData2);

		// append to to #alert-area
		$("#social-container").append(fullText2);
	}

	/**********   BUILD NEW MEMBERS  **********/

	// Instantiate NEW MEMBERS LIST via Handlebars Templating Machine 
	//   handlebars.js
	var newMemberList = members.newMembers();

	//reference
	var source3 = $("#new-members").html();

	//complile the source markup
	var newMembersTemplate = Handlebars.compile(source3);

	// Iterate through messages
	for (var k = 0; k < 4; k++) {

		// define the data object
		var newMembersData = {
			name: newMemberList[k].name,
			profile: newMemberList[k].profile,
			email: newMemberList[k].email,
			join: newMemberList[k].join
		};

		// pass data object to template
		var fullText3 = newMembersTemplate(newMembersData);

		// append to to #alert-area
		$("#member-container").append(fullText3);
	}

	/**********   BUILD RECENT ACTIVITIES  **********/

	// Instantiate NEW RECENT ACTIVITIES LIST via Handlebars Templating Machine 
	//   handlebars.js

	//reference
	var source4 = $("#activity-handle").html();

	//complile the source markup
	var recentTemplate = Handlebars.compile(source4);

	// Iterate through messages
	for (var l = 0; l < 4; l++) {

		var name = members.memberData[l].first + ' ' + members.memberData[l].last;

		// define the data object
		var recentsData = {
			name: name,
			profile: members.memberData[l].activity,
			text: members.memberData[l].recentActivity,
			time: members.memberData[l].recentTime
		};

		// pass data object to template
		var fullText4 = recentTemplate(recentsData);

		// append to to #alert-area
		$("#new-activities").append(fullText4);
	}

	/******************************
	BUILD CHARTS
	******************************/

	// Instantiate Charts
	lineTraffic.trafficMonth();
	barDailyTraffic.barDay();
	mobileUsers.mobile();
	$switchWrapper.switchButton();

	// jQuery UI checkbox light switch
	//    Refer to: http://olance.github.io/jQuery-switchButton/
	$("input[type=checkbox]").switchButton({
		width: 36,
		height: 16,
		button_width: 24
	});

	$("input[type=checkbox]").switchButton({
		on_label: 'OFF',
		off_label: 'ON'
	});

	/******************************
	RETRIEVE DATA
	******************************/

	// Invoke functin that 
	//   retrieves data from localStorage
	appSettings.retrieveSettings();

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

	/*******  SEARCH MEMBER FIELDS/BUTTONS  *******/

	// Search field
	//   Control tab keypress event in #search-member
	//   Select #help value if available
	$searchMember.bind("keydown", function(event) {
		if(event.which == 9) {
			event.preventDefault();
			var tabChoice = document.getElementById("list");
			if ( tabChoice.getElementsByTagName("li")[0] !== undefined ) {
				tabChoice = tabChoice.getElementsByTagName("li")[0].innerText;
				$searchMember.val(tabChoice);
			}
			$sendMessage.find("#message-member").focus();
		}
	});

	//  Capture keyup strokes in #search-member and find results
	$searchMember.on("keyup", function(event) {
		var searchValue = document.getElementById("search-member").value;
		members.searchForm(searchValue);
	});

	// Place those results on from #list li in #search-member
	//      ::event bubbling
	$("#list").on("click", function(event) {
		var target = targetChoice(event).innerHTML;
		members.updateSearchField(target, event);
	});

	// Hide #list on #search-member blur
	$searchMember.on("blur", function(event) {
		if ( !$("#list").hasClass("hide-div") ) {
			setTimeout (function(){
				$("#list").addClass("hide-div");
			}, 200);
		}
	});

	// Send button
	$formButton.on("click", function(e){
		e.preventDefault();
		members.validateForm();
	});

	// Hide Valdation Message
	$help.on("click", function(){
		$(this).removeClass("show-validate");
	});
	$successHelp.on("click", function(){
		$(this).removeClass("show-validate");
	});


	/*******  SETTINGS CONTROLS  *******/

	//
	$save.on("click", function(e){
		e.preventDefault();
		appSettings.saveSettings();
	});

	$reset.on("click", function(e){
		e.preventDefault();
		appSettings.clearSettings();
	});


	/*******  EVENT BUBBLING BUTTONS  *******/
	//  I'm using handlebar.js becaue
	//    animation does not work as smoothly 
	//    with regular javaScript/jQuery library

	$(".close").on("click", function() {
		notify.closeNotify($(this));
	});

	$(".alert-notification").on("click", function() {
		notify.openMessage($(this));

	});
	$(".alert-message").on("click", function() {
		notify.closeMessage($(this));
	});

	// Test browswer compatibility for localStorage use
	//   If not compatible, show message
	/*function hasLocalStorage() {

		if ( typeof(Storage) === "undefined" ) {
			var message = "Sorry. Your browser is not ";
			message += "compatible with this App.";
			notify.openMessageTest(message);

		}

	}
	hasLocalStorage();*/

});




