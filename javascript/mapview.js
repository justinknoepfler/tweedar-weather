/* By Holland Herbert
 *
 * Code skeleton for map zoom/pan & country information from:
 * http://techslides.com/responsive-d3-map-with-zoom-and-pan-limits
 */

var width = 960;
var height = 500;
var t = [(width/2),(height/2)];
var s = width / 2 / Math.PI;


d3.select(window).on("resize",throttle);

var zoom = d3.behavior.zoom()
				 .scaleExtent([1,9])
				 .on("zoom",move);
				 

var rectangles = [[]];

var topo,projection,path,svg,g;


var tooltip = d3.select(".map").append("div").attr("class","tooltip hidden");

setup(width,height);


function setup(width,height) {
	console.log("settingup");
	projection = d3.geo.mercator()
						.translate([(width/2),(height/2)])
						.scale(width / 2 / Math.PI);

	path = d3.geo.path().projection(projection);
	
	svg = d3.select(".map").append("svg")
			  .attr("width",width)
			  .attr("height",height)
			  .call(zoom)
			  //.on("click",click)
			  .append("g");
			  
	g = svg.append("g");	
	
	// selection window 
	d3.select(".map").on({
		mousedown : function () {
			/*if (selectionModeSquare) {
				var p = d3.mouse(this);
				svg.append("rect")
					.attr({
						rx		: 6,
						ry 	: 6,
						class	: "selection",
						x		: p[0],
						y		: p[1],
						width	: 0,
						height: 0
					});
			}*/
				
		},
		
		mousemove : function () {
			/*if (selectionModeSquare) {
				var s = svg.select("rect.selection");
				 
				if( !s.empty()){
					var p = d3.mouse(this),
						 d = {
								x		: parseInt( s.attr("x"),10),
								y		: parseInt( s.attr("y"),10),
								width	: parseInt( s.attr("width"),10),
								height	: parseInt( s.attr("height"),10)		
  		     	   	 },
					    move = {
					    		x : p[0]-d.x,
					    		y : p[1]-d.y
					    };		
					if( (move.x < 1) || (move.x*2 < d.width) ){
						d.x = p[0];
						d.width -=move.x;
					} else {
						d.width = move.x;
					}
					
					if( (move.y < 1) || (move.y*2 < d.height) ){
						d.y = p[1];
						d.height -=move.y;
					} else {
						d.height = move.y;
					}
					
					s.attr(d);
					
				}
			}*/
			
		},
		
		mouseup : function () {
			/*if (selectionModeSquare) {
				selectionModeSquare = false;
				var x = svg.select("rect").attr("x") - d3.select("map").x;
				var y = svg.select("rect").attr("y") - d3.select("map").y;
				var width = svg.select("rect").attr("width");
				var height = svg.select("rect").attr("height");
				
				rectangles[rectangles.length] = [projection.invert(x),projection.invert(y),projection.invert(x+width),projection.invert(y-height)];
				svg.selectAll("rect.selection").remove();
				var gpoint = g.append("g").attr("class","gpoint");
				gpoint.append("svg:rect")
					.attr("x",projection.invert(x,y)[0])
					.attr("y",projection.invert(x,y)[1])
					.attr("width",10)
					.attr("height",10)
					.attr("id","hammy")
					.attr("fill","#ffffff");
				
			}*/
		}
	});	  

	
		svg.on({
			mousedown : function () {
				click;
			}
			});
}


d3.json("resources/world-topo-min.json", function (error, world) {
	var countries = topojson.feature(world, world.objects.countries).features;
	
	topo = countries;
	draw(topo);
});


function draw(topo) {
			
	g.append("path")
	 .datum({type: "LineString", coordinates: [[-180,0],[-90,0],[0,0],[90,0],[180,0]]})
	 .attr("class","equator")
	 .attr("d",path);
	 
	var country = g.selectAll(".country").data(topo);


	var offsetL = 200;
	var offsetT = 200;
	if(colorScheme_outliers){
		country.enter().insert("path")
				 .attr("class","country")
				 .attr("d",path)
				 .attr("id",function(d,i) {return d.id;})
				 .attr("title",function(d,i) {return d.properties.name;})
				 .style({fill:color_countries});	 
		//.style({fill:'#1cab3d'});

		//country.on('mouseover', function(d){ if(selectionModeCountry){d3.select(this).style({fill:'#97bf21',stroke: '#F08C00', 'stroke-width':'.3px'}); }})
	   //      .on('mouseout', function(d){ d3.select(this).style({fill:'#1cab3d',stroke: '', 'stroke-width':''}); });
	}
	if(colorScheme_equal){
		country.enter().insert("path")
				 .attr("class","country")
				 .attr("d",path)
				 .attr("id",function(d,i) {return d.id;})
				 .attr("title",function(d,i) {return d.properties.name;})
				 .style({fill:'#168730'});
	
		//country.on('mouseover', function(d){ if(selectionModeCountry){d3.select(this).style({fill:'#97bf21',stroke: '#F08C00', 'stroke-width':'.3px'}); }})
	   //      .on('mouseout', function(d){ d3.select(this).style({fill:'#168730',stroke: '', 'stroke-width':''}); });
	}
	

	/*country.on("mousemove", function (d,i) {
					var mouse = d3.mouse(svg.node()).map( function (d) {return parseInt(d); });
		
					tooltip.classed("hidden",false)
				 			 .attr("style","left:"+(mouse[0]+offsetL)+"px;top:"+(mouse[1]+offsetT)+"px")	
				 			 .html(d.properties.name);	
			 })
			 .on("mouseout", function (d,i) {
			 		tooltip.classed("hidden",true);
			 });*/
}
	

function redraw() {
	d3.select('svg').remove();
	setup(width,height);
	
	draw(topo);
	drawBins();
	g.attr("transform","translate("+t+")scale("+s+")");
}

function move() {
	t = d3.event.translate;
	s = d3.event.scale;
	zscale = s;
	var h = height/4

	t[0] = Math.min(
		(width/height) * (s-1),
		Math.max(width*(1-s), t[0])	
	);
	t[1] = Math.min(
		h*(s-1) + h*s,
		Math.max(height*(1-s)-h*s, t[1])	
	);

	zoom.translate(t);
	g.attr("transform","translate("+t+")scale("+s+")");

	d3.selectAll(".country").style("stroke-width",1.5/s);
}

var throttleTimer;
function throttle() {
	window.clearTimeout(throttleTimer);
	throttleTimer = window.setTimeout( function(){redraw();} , 200 );
}

function click() {
	var latlong = projection.invert(d3.mouse(this));
}






/*
function toggleSquareSelection() {
	if(selectionModeSquare){
		selectionModeSquare=false;
		d3.select("#squareSelection").style({'background-color' : '#A3CC7A'});
	}else{
		selectionModeSquare=true;	
		d3.select("#squareSelection").style({'background-color' : '#97bf21'});
	}
	if(selectionModeCountry){
		selectionModeCountry=false;	
	}
}
document.getElementById("squareSelection").onclick = toggleSquareSelection;
function toggleCountrySelection (){
	if(selectionModeCountry){
		selectionModeCountry=false;
		d3.select("#countrySelection").style({'background-color' : '#A3CC7A'});
	}else{
		selectionModeCountry=true;	
		d3.select("#countrySelection").style({'background-color' : '#97bf21'});
	}
	if(selectionModeSquare){
		selectionModeSquare=false;	
	}
}
document.getElementById("countrySelection").onclick = toggleCountrySelection;
*/


