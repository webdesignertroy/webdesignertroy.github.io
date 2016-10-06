/*******************************
   PROJECTS DATA
*******************************/
var projects=[ {
		name: "Responsive Registration Form", url: "http://webdesignertroy.github.io/techdegree/proj3/", github: "https://github.com/webdesignertroy/Techdegreee-Project-3", description: 'This third project challenge from <a href="https://teamtreehouse.com/techdegree" target="_blank">Treehouse\'s Techdegree Program</a> asked students to construct a responsive online form from scratch. I used HTML and CSS to build a mock newsletter contact form consisting of basic input fields from text boxes to pull-down menus.  Validation functions ensure that visitors fill out required fields completely and correctly.  The form comes complete with a reset button.  Although not a fully functioning form, this exercise still taught me the values of considering user experience and accessibility while building a form interface.', preview: "proj3", tech: ["html", "css", "github"]
	}

	,
	{
		name: "Interactive Image Gallery", url: "http://webdesignertroy.github.io/techdegree/proj4/", github: "https://github.com/webdesignertroy/Techdegree-Project-4", description: 'This fourth challenging project presented to students by <a href="https://teamtreehouse.com/techdegree" target="_blank">Treehouse\'s Techdegree Program</a> asked students to build an interactive photo gallery complete with lightbox. Students were not allowed to use plugins.  So, it appeared that my introduction to programming would be harrowing to say the least. Armed with JavaScript, jQuery, HTML, CSS and my imagination, I constructed a small thumb image gallery. When a visitor clicks on a thumb image, he or she is presented with an interactive lightbox holding an image or video.', preview: "proj4", tech: ["html", "css", "js", "jquery", "github"]
	}

	,
	{
		name: "Building Layouts with Sass", url: "http://webdesignertroy.github.io/techdegree/proj5/", github: "https://github.com/webdesignertroy/Techdegree-Project-5", description: 'Before <a href="https://teamtreehouse.com/techdegree" target="_blank">Treehouse\'s Techdegree Program</a> introduced this fifth challenge to me, I never even heard of Sass. Now, I see how applications like Sass can be invaluable to a company’s workflow.  The project asked students to refactor a previous project with Sass.  I learned how to break very large scripts into manageable smaller ones.  Sass would work hard to recompile them to ensure an optimal online experience.', preview: "proj5", tech: ["html", "css","js","jquery", "sass", "github"]
	}

	,
	{
		name: "HTML5 Video Player", url: "http://webdesignertroy.github.io/techdegree/proj7", github: "https://github.com/webdesignertroy/Techdegree-Project-7", description: 'I worked with HTML5 video players before, but never to the degree that <a href="https://teamtreehouse.com/techdegree" target="_blank">Treehouse\'s Techdegree Program</a> requested in this 7th project.  In my introduction to Object-Oriented Programming, the task asked us to create an interactive video interface from a mockup.  Using JavaScript, jQuery, HTML and CSS, I constructed a video player complete with multiple functions such as a progress bar and two variations of closed captions.', preview: "proj7", tech: ["html", "css", "js", "jquery", "github"]
	}

	,
	{
		name: "Web App Dashboard", url: "http://webdesignertroy.github.io/techdegree/proj9", github: "https://github.com/webdesignertroy/Techdegree-Project-9", description: 'The web application challenge given to me by <a href="https://teamtreehouse.com/techdegree" target="_blank">Treehouse\'s Techdegree Program</a> as the 9th project was by far the most challenging.  The course gave students a mockup of a web app that consisted of charts, pop-ups, tables and finally a form and told to make it interactive using only JavaScript, jQuery, HTML and CSS.  Specifically, working with a third-party plugin chart maker proved difficult.  Documentation was sparse and explanations by the community was few and wide-spread. But, I met the the challenge with wonderful results and growth.', preview: "proj9", tech: ["html", "css", "js", "jquery", "github"]
	} 

	,
	{
		name: "Public API Galley", url: "http://webdesignertroy.github.io/techdegree/proj10", github: "https://github.com/webdesignertroy/Techdegree-Project-10", description: 'I personally found <a href="https://teamtreehouse.com/techdegree" target="_blank">Treehouse\'s Techdegree Program\'s</a> 10th project the most rewarding and useful. Students generated a public API call from at least two sources using only JavaScript, jQuery, HTML and CSS.  Building functional, interactive sites that visitors could actually use was why I started the Program.  This app called on iTunes\' and YouTube\'s APIs to generate a movie and show search library. Results from the API mismatch generates great fun.', preview: "proj10", tech: ["html", "css", "js", "jquery", "github"]
	}

	,
	{
		name: "General Contractor Site", url: "http://2mgconstruction.com/", github: "", description: 'I refactored 2MGconstruction to keep up with mobile requests. The old site was outdated, so I started from scratch. I kept the traditional menu, but augmented it with a pull-down version for mobile devices. I replaced slideshows with image grids to give the visitor upfront choices all at once. I added a review section where <em>happy</em> clients could comment on the work completed by 2MGconstruction.', preview: "wp1", tech: ["wordpress", "html", "css", "js", "jquery"]
	}

	,
	{
		name: "Writer's Page", url: "http://questionsformrright.com", github: "", description: 'Andrea Guzman - Writer\'s Page was created to promote Andrea\'s guide to a healthy relationship, <em>20 Questions for Mr. Right</em>. I created a clean, simple design with call-to-action tools and buttons that focused on prodding the visitor to select links to shops where they could purchase the guide. Among the tools was a promotional video in which Andrea discussed why she wrote her guide and why the visitor should buy it. I also provided Andrea with a blog to keep her socially connected to her audience.', preview: "wp2", tech: ["wordpress", "html", "css", "js", "jquery"]
	}

	,
	{
		name: "Actor's Site", url: "http://jamaicafarewelltheplay.com", github: "", description: 'In designing this simple site, I wanted to create a dark, cool theatrical appeal. I went with full-width images that took up the entire screen to mimic the feeling of sitting in an open forum. I kept the navigation simple and the call-to-action abundant in order to focus the visitor on the message we were trying to convey, which was "Buy Tickets." I added an audience review form, a calendar of Upcoming Shows and tried to be very helpful with the information we projected. Besides basic show information, I included a Google map with an option for driving instructions and the ability to add the website calendar information to Google Calendars or iCal.', preview: "wp3", tech: ["wordpress", "html", "css", "js", "jquery"]
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

		var canvas = document.querySelector("#github2");
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




