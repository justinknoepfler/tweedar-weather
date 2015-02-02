/* variables
*/

//modes
var selection_mode = false;

//time variables
var start_index = 1;
var end_index = 1;

//data variables
var graph_data;
var region_list = [[]];
var regionindex = 0;

//dimension variables
var graph_margin = {top:20, right:20, bottom:30, left:50};
var graph_width = 1200 - graph_margin.left - graph_margin.right;
var graph_height = 200 - graph_margin.top - graph_margin.bottom;

//axis variables
var x_time_scale = d3.time.scale().range([0,graph_width]);
var y_time_scale = d3.scale.linear().range([graph_height,0]);
var x_axis = d3.svg.axis().scale(x_time_scale).orient("bottom");
var y_axis = d3.svg.axis().scale(y_time_scale).orient("left");

var graph_lines;

/* Methods
*/

//graph drawing
function plot_lines() {
	/* do something along these lines
	
	for(i=0; i<graph_data.length(); i++) {
		var newline = d3.svg.line()
					.x(function (d) { return x(graph_data[i])})
					.y blah blah ;
		graph_lines[i] = newline;
	}
	*/
}
//graph json queries

/**SENT 

POST JSON API/
JSON
{
STARTTIME: ,
ENDTIME: ,
GRIDPOINTS: { 
		{REGION: 1, 
		 x: , 
		 y: },
		{REGION:2, 
		 x: , 
		 y: }, 
		...
   }
}



RETURNED
JSON
{
STARTTIME: ,
ENDTIME: ,

GRIDPOINTS: {

		{REGION:1,
		 SENTIMENTS: { <timestamp>:sentiment
					  	   <timestamp>:sentiment
					  	   ...
						 }
		},
		{REGION:2,
		 SENTIMENTS: { <timestamp>:sentiment
		 				   <timestamp>:sentiment
		 				   ...
		 				 }
		},
		...
	}
}


*/

//graph variable manipulations
function add_graph(){
	//initalize start_time & end_time
	
	//make graph visible
	
	//make json request
	
	//populate graph with json response

}

function add_region(){
	//toggle a selection tool
	if(!selection_mode){
		selection_mode = true;
		d3.select("#add_selection_button").style({height:'23px',opacity:1});
		d3.select("#add_region_button").attr("value","done");
	}
	else {
		selection_mode = false;
		d3.select("#add_selection_button").style({height:'0px',opacity:0});
		d3.select("#add_region_button").attr("value","add region");
		
		//make json request
	
		//repopulate graph
	}
}


function convertGPStoBins(longitude,latitude) {
	var x_bin, y_bin;
	
	longitude = longitude+180;
	x_bin = 256*(longitude/360)
	
	latitude = (latitude*-1)+90;
	y_bin = 128*(latitude/180);
	
	return [x_bin,y_bin];
}


function add_selection() {
	// feedback that it was added
	console.log(d3.selectAll(".selected").data().enter().attr("x"));
	/*var the_selected = d3.selectAll(".selected");
	console.log(the_selected.data());
	var the_selected_enter = the_selected.map(function (d) {return d.__data__});
	console.log(the_selected);
	console.log(the_selected_enter);
	console.log(the_selected.length);
	console.log(the_selected_enter.length);
	console.log(the_selected[0]);
	console.log(the_selected_enter[0]);
	// add selection to region_list
	var selected_list;
	var x_coord, y_coord, latitude, longitude, x_bin, y_bin;
	for(i=0; i<the_selected.length; i++) {
		x_coord = the_selected[i].attr("x");
		y_coord = the_selected[i].attr("y");
		latlong = projection.invert(x_coord,y_coord);
		latitude = latlong[0];
		longitude = latlong[1];
		bins = convertGPStoBins(longitude,latitude);
		selected_list[i] = bins;
	}
	console.log(selected_list);
	d3.select("#region_list").append("input")
									 .attr(type,"button")
									 .classed("button",true)
									 .attr(id,"region_"+regionindex)
									 .attr(value,"region "+regionindex);
	region_list[region_list.length-1] = [regionindex, selected_list];
	regionindex = regionindex + 1;
	*/
	// make all selected unselected
	d3.selectAll(".selected").enter().classed("selected",false)	
}

function remove_region(){
	//remove region from region_list
		
	//make json request
	
	//repopulate graph
	
}

function setStartTime() {
	var selectedvalue = d3.event.target.value;
	start_index = document.getElementById("starttimestamplist").selectedIndex;
	
	//make json request
	
	//populate graph
}
d3.select(".starttimestamplist").on("change", setStartTime);

function setEndTime() {
	var selectedvalue = d3.event.target.value;
	end_index = document.getElementById("endtimestamplist").selectedIndex;
	
	//make json request
	
	//populate graph
}
d3.select(".endtimestamplist").on("change", setEndTime);


