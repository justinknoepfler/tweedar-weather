
//calendar variables
var highlighted_dates = {};

//map variables
var five_sd_sad = -8.5;
var four_sd_sad = -6.16;
var three_sd_sad = -4.27;
var two_sd_sad = -2.38;
var one_sd_sad = -0.49;
var median = 1.4;
var one_sd_happy = 3.29;
var two_sd_happy = 5.18;
var three_sd_happy = 7.07;
var four_sd_happy = 8.96;
var five_sd_happy = 8.96;

var cloudMode = false;
var binmatrix = [[]];
var datahaschanged=false;

// Different color schemes for square mode and cloud mode
var colorScheme_outliers=true;
var colorScheme_equal=false;
var colorScheme_single=true;
var colorScheme_gradient=false;
var gradient_sadthreshold=three_sd_sad;
var gradient_sadthreshold_index=2;
var cloud_threshold=median;
var cloud_threshold_index = 5;

/** Modes & settings
  */

function toggleCloudMode() {
	//ENTER: Square mode
	if(cloudMode){
		color_countries = color_neutral;
		//set mode
		cloudMode = false;
		
		//update menu: button
		d3.select("#drawCloudMap").attr("value","Draw Clouds");
		
		//update menu: color select list
		$("#colorthemelist").empty();
		d3.select("#colorthemelist").append("option")
        											  .attr("value","outliers")
        											  .text("Emphasize Extremes");
      d3.select("#colorthemelist").append("option")
        											  .attr("value","equal")
        											  .text("No Emphasis");      
      if (colorScheme_equal) {
      	document.getElementById("colorthemelist").selectedIndex=1;
		}
        											  
		//update menu: hide cloud threshold options        											  
		d3.select("#cloudthresholdtitle").style({opacity:0,height:0});
      document.getElementById("colorthemelist").selectedIndex=1;
		
		//update menu: make sure gradient threshold is hidden        											  
      d3.select("#gradientthresholdtitle").style({opacity:0,height:0});
      d3.select("#gradientthreshold").style({width:'50px',opacity:0,height:0});
      d3.select("#gradientthresholdsubmit").style({opacity:0,height:0});
      
      //show legend
      //d3.select(".legend").style({opacity:1,height:'55px'});

	}
	//ENTER: Cloud mode
	else {
		color_countries = color_cloud_background;
		//set mode
		cloudMode = true;
		
		//update menu: button
		d3.select("#drawCloudMap").attr("value","Draw Squares");
		
		//update menu: color select list
		$("#colorthemelist").empty();
		d3.select("#colorthemelist").append("option")
        											  .attr("value","single")
        											  .text("Single Color");
      d3.select("#colorthemelist").append("option")
        											  .attr("value","gradient")
        											  .text("Gradient");
      
      //update menu: cloud threshold options
		d3.select("#cloudthresholdtitle").style({opacity:1,height:'23px'});	
	   d3.select("#cloudthreshold").style({opacity:1,height:'20px'});
      document.getElementById("cloudthreshold").selectedIndex=cloud_threshold_index;
      document.getElementById("gradientthreshold").selectedIndex=gradient_sadthreshold_index;
	   
	   //update menu: cloud gradient options  
      if (colorScheme_gradient) {
	      d3.select("#gradientthresholdtitle").style({opacity:1,height:'23px'});
	      d3.select("#gradientthreshold").style({opacity:1,height:'20px'});
      	document.getElementById("colorthemelist").selectedIndex=1;
	   }
      
      //hide legend
      //d3.select(".legend").style({opacity:0,height:0});
	}
	
	//update map
	redraw();
}

function setselectedcolortheme() {
	var selectedvalue = d3.event.target.value;
	currindex = document.getElementById("colorthemelist").selectedIndex;
	if(selectedvalue=="outliers"){
		colorScheme_outliers=true;
		colorScheme_equal=false;
	}
	if(selectedvalue=="equal"){
		colorScheme_equal=true;
		colorScheme_outliers=false;
	}
	if(selectedvalue=="single"){
		colorScheme_single=true;
		colorScheme_gradient=false;	
      d3.select("#gradientthresholdtitle").style({opacity:0,height:'0px'});
      d3.select("#gradientthreshold").style({opacity:0,height:'0px'});
	}
	if(selectedvalue=="gradient"){
		colorScheme_single=false;
		colorScheme_gradient=true;	
      d3.select("#gradientthresholdtitle").style({opacity:1,height:'23px'});
      d3.select("#gradientthreshold").style({opacity:1,height:'20px'});
	}
	redraw();
}
d3.select(".colorthemelist").on("change", setselectedcolortheme);


function changegradientthreshold() {
	var selectedvalue = d3.event.target.value;
	gradient_sadthreshold_index = document.getElementById("gradientthreshold").selectedIndex;
	switch(true) {
		case (selectedvalue=="five_sd_sad"):
			gradient_sadthreshold = five_sd_sad;
			break;
		case (selectedvalue=="four_sd_sad"):
			gradient_sadthreshold = four_sd_sad;
			break;
		case (selectedvalue=="three_sd_sad"):
			gradient_sadthreshold = three_sd_sad;
			break;
		case (selectedvalue=="two_sd_sad"):
			gradient_sadthreshold = two_sd_sad;
			break;
		case (selectedvalue=="one_sd_sad"):
			gradient_sadthreshold = one_sd_sad;
			break;
		case (selectedvalue=="median"):
			gradient_sadthreshold  = median;
			break;
			
	}
	redraw();
}
d3.select("#gradientthreshold").on("change",changegradientthreshold);



function changecloudthreshold() {
	var selectedvalue = d3.event.target.value;
	cloud_threshold_index = document.getElementById("cloudthreshold").selectedIndex;
	switch(true) {
		case (selectedvalue=="five_sd_sad"):
			cloud_threshold = five_sd_sad;
			break;
		case (selectedvalue=="four_sd_sad"):
			cloud_threshold = four_sd_sad;
			break;
		case (selectedvalue=="three_sd_sad"):
			cloud_threshold = three_sd_sad;
			break;
		case (selectedvalue=="two_sd_sad"):
			cloud_threshold = two_sd_sad;
			break;
		case (selectedvalue=="one_sd_sad"):
			cloud_threshold = one_sd_sad;
			break;
		case (selectedvalue=="median"):
			cloud_threshold = median;
			break;
			
	}
	redraw();
}
d3.select("#cloudthreshold").on("change",changecloudthreshold);

/** Time Navigation
  */

function setselectedvalue() {
	var selectedvalue = d3.event.target.value;
	currindex = document.getElementById("timestamplist").selectedIndex;
	
	makejsonreq(selectedvalue);
}
d3.select(".timestamplist").on("change", setselectedvalue);

function nextTimestamp() {
	var currindex = document.getElementById("timestamplist").selectedIndex;
	if(currindex+1 < timestamps.length){
		document.getElementById("timestamplist").selectedIndex = -1; 
		document.getElementById("timestamplist").selectedIndex = currindex + 1;
		var selectedvalue = timestamps[currindex].id;	
		makejsonreq(selectedvalue);
	}			
	
}
document.getElementById("nextTimestamp").onclick = nextTimestamp;

function previousTimestamp() {
	var currindex = document.getElementById("timestamplist").selectedIndex;
	if(currindex!=0){
		document.getElementById("timestamplist").selectedIndex = -1;
		document.getElementById("timestamplist").selectedIndex = currindex -1;
		var selectedvalue = timestamps[currindex].id;
		console.log(timestamps[currindex].id);	
		makejsonreq(selectedvalue);
	}			
}
document.getElementById("previousTimestamp").onclick = previousTimestamp;

/** calendars
*/
function populate_highted_dates(date) {
	SelectedDates[new Date(date)] = new Date(date);
}



/** Selection tools
  */

// lasso tool for selecting a collection of gridpoints
function lassotool() {
		// the polygon that will be created
		
}
