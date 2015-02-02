//Where the bin data will be initalized and modified

var bins;
var timestamps;
//var currindex = 0;
var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// populate the avalible timestamp list
window.onload = function () {
	datahaschanged = true;
	d3.select(".timestamplist").append("option")
        											  .attr("value","no_selection")
        											  .text("Select start time");
	$.getJSON('http://127.0.0.1:8080/gettimestamps', function (data) {
			timestamps = data;
			for(var i=0;i<data.length;i++){
				var obj = data[i];
				var a = new Date((parseInt(obj.time_start)));
				var year = a.getFullYear();
				var month = months[a.getMonth()];
				var date = a.getDate();
				var hour = a.getHours();
				var timeofday = "am";
				if(parseInt(hour)==12){
					timeofday = "pm";				
				}
				if(parseInt(hour)>12){
					hour = hour -12;				
					timeofday = "pm";
				}				
				
				var time = date + ',' + month + ' ' + year + ' ' + hour+timeofday;
				
        		d3.select(".timestamplist").append("option")
        											  .attr("value",obj.id)
        											  .text(time);
        		d3.select(".starttimestamplist").append("option")
        											  .attr("value",obj.id)
        											  .text(time);
        		d3.select(".endtimestamplist").append("option")
        											  .attr("value",obj.id)
        											  .text(time);
        											  
     			
			} 
			var currindex = data.length;
			document.getElementById("timestamplist").selectedIndex = data.length;
			s = document.getElementById("timestamplist");
			var selectedvalue = s.options[currindex].value;
			makejsonreq(selectedvalue);
		})
		.error(function() { console.log("error occured durring 'getJSON' request"); });
		
	
}


function makejsonreq(selectedvalue) {
	$.getJSON('http://127.0.0.1:8080/'+selectedvalue, function (data) {
			datahaschanged = true;
			bins = data; 
			redraw(); 
		})
		.error(function() { console.log("error occured durring 'getJSON' request"); });
}


window.onkeydown = function () {
	var keycode;
	if(window.event){
		keycode = window.event.keyCode;
		if (keycode == 37) {
			previousTimestamp();
		}		
		if(keycode == 39) {
			nextTimestamp();		
		}
			
	}
} 