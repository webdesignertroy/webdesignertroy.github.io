
'use strict';

// Function gets a date in the future. Gets current date if numbersOfDaysToAdd = 0
var getFutureDate = function (day) {
	var someDate = new Date();
	var numberOfDaysToAdd = day;
	someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 

	var dd = someDate.getDate();
	var mm = someDate.getMonth();
	var y = someDate.getFullYear();
	var d = someDate.getDay();

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

	// convert day number into day name
	var day = new Array();
	day[1] = 'Monday';
	day[2] = 'Tuesday';
	day[3] = 'Wednesday';
	day[4] = 'Thursday'; 
	day[5] = 'Friday';
	day[6] = 'Saturday';
	day[0] = 'Sunday';

	var futureMonth = month[mm];
	var futureDay = day[d];

	var someFormattedDate = futureDay + ", " + futureMonth + ' '+ dd + ', '+ y;

	return someFormattedDate;
}
// Function evaluates "clouds" conditions between 1 and 100 and returns image index
var getClouds = function(clouds) {
	
	switch(true) {
		case 100 < clouds && clouds < 90:
			// return Cloudy Object
			var condition = {
				cloudNumber: 6,
				cloudText: 'Cloudy'
			};
			return condition;
		break;
		case 89 < clouds && clouds < 60:
			// return Mostly Cloudy
			var condition = {
				cloudNumber: 5,
				cloudText: 'Mostly Cloudy'
			};
			return condition;

		break;
		case 59 < clouds && clouds < 30:
			// return Partly Cloudy
			var condition = {
				cloudNumber: 4,
				cloudText:'Partly Cloudy'
			};
			return condition;

		break;
		case 29 < clouds && clouds > 20:
			// return Mostly Sunny
			var condition =  {
				cloudNumber: 3,
				cloudText: 'Mostly Sunny'
			};
			return condition;

		break;
		case 19 > clouds && clouds > 10:
			// return Sunny to Mostly Sunny
			var condition = {
				cloudNumber: 2,
				cloudText: 'Sunny to Mostly Sunny'
			};
			return condition;

		break;
		default:
			// return Sunny
			var condition = {
				cloudNumber: 1,
				cloudText: 'Sunny'
			};
			return condition;
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
			cloudInfo: cloudsCondition.cloudNumber,
			cloudInfoText: cloudsCondition.cloudText
		}
		
		// PASS weather data object to template via the variable "fullText"
		var fullText = template(weatherData);

		// APPEND fullText to the div.container
		$('.container').append(fullText);
	}
};

// Function: Call api.openweathermap.com
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

	// prevent natural form submit event
	e.preventDefault();
	// check to see if search box has value
	if( $('#city-name').val().trim() === "" || $('#city-name').val().trim() === null ) {
		// if search box is empty, do nothing
		return;
	} else {
		//  clear old results
		$('.section').remove();

		// get input box value and invoke APICall function
		var cityName = $('#city-name').val().trim();
		$('#city-name').val("");
		APICall(cityName);
	}
});