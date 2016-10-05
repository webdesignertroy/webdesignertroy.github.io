/*******************************
   PROJECTS DATA
*******************************/
var projects=[ {
		name: "Responsive registration form", url: "http://webdesignertroy.github.io/techdegree/proj3/", github: "https://github.com/webdesignertroy/Techdegreee-Project-3", description: 'In this project I built a responsive, mobile-friendly registration form using a wide variety of HTML form input types and attributes. Using the supplied mockup file as a guide, I created repsonsive mobile, tablet and desktop versions of the form using CSS media queries and a "mobile-first" approach as well as implementing custom form controls.', preview: "proj3", tech: ["html", "css", "github"]
	}

	,
	{
		name: "Interactive photo gallery", url: "http://webdesignertroy.github.io/techdegree/proj4/", github: "https://github.com/webdesignertroy/Techdegree-Project-4", description: "This project was about creating an interactive photo gallery using JavaScript and jQuery. Thumbnails and photos were be provided with descriptions. User intraction with the search box will cause images in the gallery to be filtered based on the input. Clicking on thumbnails, opens up a lighbox showing a larger version of each photo and allows keyboard navigation.", preview: "proj4", tech: ["html", "css", "js", "jquery", "github"]
	}

	,
	{
		name: "Responsive layouts with Sass", url: "http://webdesignertroy.github.io/techdegree/proj5/", github: "https://github.com/webdesignertroy/Techdegree-Project-5", description: "This project was about refactoring a previous project originally written in CSS, to Sass. I used the oportunity to redesign the layout using Flexbox instead of floating divs. I also took advantage of many Sass features such as support for partials, variables, extends, and mixins to write modular, more maintainable code.", preview: "proj5", tech: ["html", "css","js","jquery", "sass", "github"]
	}

	,
	{
		name: "Interactive video player", url: "http://webdesignertroy.github.io/techdegree/proj7", github: "https://github.com/webdesignertroy/Techdegree-Project-7", description: "This is an HTML5 video player featuring custom control elements, written in JavaScript using the HTML5 Video API. Using the supplied mockups, video files, and transcript, I wrote an interactive video player that synchronizes the video and the transcript. The transcript is highlighting as the video progresses.", preview: "proj7", tech: ["html", "css", "js", "jquery", "github"]
	}

	,
	{
		name: "Web application dashboard", url: "http://webdesignertroy.github.io/techdegree/proj9", github: "https://github.com/webdesignertroy/Techdegree-Project-9", description: "This project was about building a beautiful web application dashboard complete with JavaScript-driven charts and graphs base on a suplied graphic mockup. This was a front end project onlythat required to create the responsive layout in HTML and CSS with added JavaScript functionality. Flexbox and Sass proved to be invaluable tools.", preview: "proj9", tech: ["html", "css", "js", "jquery", "github"]
	}

	,
	{
		name: "Public API galley", url: "http://webdesignertroy.github.io/techdegree/proj10", github: "https://github.com/webdesignertroy/Techdegree-Project-10", description: "This project was about using at least one of the provided APIs to grab, fromat and present data from that API. Items had to be presented on a page in an attractive gallery of images or titles. Clicking an image opens a lightbox prodiving detailed information about that item. This project included Ajax calls using jQuery, pasring and formatting JSON with Javascript and a bit of CSS magic.", preview: "proj10", tech: ["html", "css", "js", "jquery", "github"]
	}
] 

/*******************************
   SKILLS DATA
*******************************/

var skillLevel = {

	// HTML
	html: function() {
		var level = [
			{	
				value: 75,
				color: "#1d7d8b"
			},
			{
				value: 25,
				color: "#eeeeee"
			} 
		]; 

		var canvas = document.querySelector("#html");
		skillLevel.drawDoughnutChart(level, canvas);
	},
	// CSS
	css: function() {
		var level = [
			{	
				value: 85,
				color: "#de3635"
			},
			{
				value: 15,
				color: "#eeeeee"
			} 
		]; 

		var canvas = document.querySelector("#css");
		skillLevel.drawDoughnutChart(level, canvas);
	},
	// JS
	js: function() {
		var level = [
			{	
				value: 70,
				color: "#2a73c0"
			},
			{
				value: 30,
				color: "#eeeeee"
			} 
		]; 

		var canvas = document.querySelector("#js");
		skillLevel.drawDoughnutChart(level, canvas);
	},
	// jQuery
	jquery: function() {
		var level = [
			{	
				value: 65,
				color: "#802ce6"
			},
			{
				value: 35,
				color: "#eeeeee"
			} 
		]; 

		var canvas = document.querySelector("#jquery");
		skillLevel.drawDoughnutChart(level, canvas);
	},
	// WordPress
	wordpress: function() {
		var level = [
			{	
				value: 60,
				color: "#2573be"
			},
			{
				value: 40,
				color: "#eeeeee"
			} 
		]; 

		var canvas = document.querySelector("#wordpress");
		skillLevel.drawDoughnutChart(level, canvas);
	},
	// SASS
	sass: function() {
		var level = [
			{	
				value: 55,
				color: "#1f7e94"
			},
			{
				value: 45,
				color: "#eeeeee"
			} 
		]; 

		var canvas = document.querySelector("#sass");
		skillLevel.drawDoughnutChart(level, canvas);
	},
	// Gulp
	gulp: function() {
		var level = [
			{	
				value: 50,
				color: "#de3635"
			},
			{
				value: 50,
				color: "#eeeeee"
			} 
		]; 

		var canvas = document.querySelector("#gulp");
		skillLevel.drawDoughnutChart(level, canvas);
	},
	// GitHub
	github: function() {
		var level = [
			{	
				value: 60,
				color: "#1f7e94"
			},
			{
				value: 40,
				color: "#eeeeee"
			} 
		]; 

		var canvas = document.querySelector("#github");
		skillLevel.drawDoughnutChart(level, canvas);
	},

	// Draw Chart
	drawDoughnutChart: function(data, canvas) {
		var options = {
			responsive: false,
			segmentShowStroke: true,
			segmentStrokeWidth: 2,
			showTooltips: false,
			tooltipTemplate: "<%= value %>%",
			percentageInnerCutout: 80
		}
		var ctx = canvas.getContext("2d");
		var doughnutChart = new Chart(ctx).Doughnut(data, options);
	}

}; // end HTML5Level




