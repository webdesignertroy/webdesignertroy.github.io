
'use strict';

// Function gets a date in the future. Gets current date if numbersOfDaysToAdd = 0
var getFutureDate = function (day) {
	var someDate = new Date();
	var numberOfDaysToAdd = day;
	someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 

	var dd = someDate.getDate();
	var mm = someDate.getMonth();
	var y = someDate.getFullYear();

	// convert month number to month name
	var month = new Array();
	month[0] = 'January';
	month[1] = 'February';
	month[2] = 'March';
	month[3] = 'April';
	month[4] = 'May';
	month[5] = 'June';
	month[6] = 'July';
	month[7] = 'August';
	month[8] = 'September';
	month[9] = 'October';
	month[10] = 'November';
	month[11] = 'December';

	var futureMonth = month[mm];

	var someFormattedDate = futureMonth + ' '+ dd + ', '+ y;

	return someFormattedDate;
}
// Function evaluates "clouds" conditions between 1 and 100 and returns image index
var getClouds = function(clouds) {
	var condition ;
	switch(true) {
		case 100 < clouds && clouds < 90:
			// return Cloudy
			return condition = 6;
		break;
		case 89 < clouds && clouds < 60:
			// return Mostly Cloudy
			return condition = 5;
		break;
		case 59 < clouds && clouds < 30:
			// return Partly Cloudy
			return condition = 4;
		break;
		case 29 < clouds && clouds > 20:
			// return Mostly Sunny
			return condition = 3;
		break;
		case 19 > clouds && clouds > 10:
			// return Sunny to Mostly Sunny
			return condition = 2;
		break;
		default:
			// return Sunny
			return condition = 1;
	}
}

// Function: Handlebar Module / CRPA ("Crapa") (Create, Reference, Pass & Append)
var getWeather = function(theForecast) {
	// City Label
	$('#results').html(theForecast.city.name);
	// REFERENCE from HTML
	var source = $('#weather-spot').html();
	// compile to Handlebars
	var template = Handlebars.compile(source);

	// create loop to get x days worth of data.  "list" is key name.
	for (var i = 1 ; i < theForecast.list.length; i++) {
		// get future dates
		var futureDate = getFutureDate(i);
		var cloudsCondition = getClouds(theForecast.list[i].clouds);
		// build weather data object for Handlebars
		var weatherData = {
			now: futureDate,
			average: Math.round(theForecast.list[i].temp.day),
			high: Math.round(theForecast.list[i].temp.max),
			low: Math.round(theForecast.list[i].temp.min),
			morning: Math.round(theForecast.list[i].temp.morn),
			nighttime: Math.round(theForecast.list[i].temp.night),
			cloudInfo: cloudsCondition
		}
		// PASS weather data object to template via the variable "fullText"
		var fullText = template(weatherData);

		// APPEND fullText to the div.container
		$('.container').append(fullText);
	}
};

// Function: Self-invoking.  Call api.openweathermap.com
var APICall = function(theCity) {
	// get API url
	var weatherUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + theCity;
	// get API key
	var apiKey = "b0b34e0501286ae903bab8dde901b6ae";
	// get "unit" as imperial
	var unitType = "imperial";
	// get "cnt" as number of days up to 16 days
	var daysTotal = 8;

	// start jQuery-based API Call
	$.get({
		url: weatherUrl + "&APPID=" + apiKey + "&units=" + unitType + "&cnt=" + daysTotal,
		success: function(objectFromOWM){
			getWeather(objectFromOWM);
		},
		error: function(){
			console.log("error");
		}
	});

};

// On button click, invoke APICall() and pass input text box value
$('#getWeather').on('click', function(e){

	// prevent natutal form submit event
	e.preventDefault();
	// check to see if search box has value
	if( $('#city-name').val().trim() === "" || $('#city-name').val().trim() === null ) {
		// if search box is empty, do nothing
		return;
	} else {
		//  clear old results
		$('.section').remove();

		// clear 'no results' notification
		$('#nothing-found').html("");

		// get input box value and invoke APICall function
		var cityName = $('#city-name').val().trim();
		$('#city-name').val("");
		APICall(cityName);
	}
});