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
	

});




