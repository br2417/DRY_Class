/**
 * @author
 */




var myKey = "&key=AIzaSyDsBrSpJRliKgi913vr9FWTy8oL57c42bA";
var myTableURL = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+12A0eKUXKb4TCFhngfaGqaMEH6uECY1iBhd3VOBAV+WHERE+DATE>";

	//console.log("hi there"); 
	
	//UNEMPDATA is the local name of the json file I just loaded
	
	function dataLoaded(UNEMPDATA){
		
		console.log(UNEMPDATA)
		
		var gDataTable = new google.visualization.DataTable();
		
		//wehn I add columns (column names) the first parameter is thr data type in that column
		//the 2nd paramenter is the name of the column
		
		
		gDataTable.addColumn('string', UNEMPDATA.columns[0]);  //only works because this is a google.visualization
		gDataTable.addColumn('number', UNEMPDATA.columns[1]);
		gDataTable.addColumn({type: 'string', 'role': 'tooltip', 'p': {'html': true}});
		
		gDataTable.addRows(UNEMPDATA.rows) //only works because this is a google.visualization
		
		
		
		/*
		var myObsData = UNEMPDATA.observations; 
		
		///i am trying to construct an array of arrays
		
		var myDataArray = [];
		
		//?console log my DataArray
		
		//wait a second, I need headers in the first row
		//create a header array and push to 
		
		
		var headerArray = ["Date", "Value"];
		myDataArray.push(headerArray);
		
		
		
		//push always puts things onto the end of the array
		
		// specify starting point, ending point, 
		for(var i=0; i<myObsData.length; i++){
			
			//create reference to current object in list
			var currObj = myObsData[i];
			
			//below is the Number function, basically says 'treat this as a number.' If you need to make it a string, you would write String.
			var currArray = [currObj.date, Number(currObj.value)];
			
			//myDataArray is the array of arrays
			
			myDataArray.push(currArray);
			
		} //end of for loop
		
		console.log(myDataArray);
		
		//fed data to visualization library
		 var myDataTable = google.visualization.arrayToDataTable(myDataArray);
		 
		 
		 //create options object to actually customize the look of the chart
		 
		 */
		 
		 var chartOptions = {
          title: "Unemployment since 1948",
          tooltip: { isHtml: true } 
        };


		//tell it to create a line chart
		var myChart = new google.visualization.LineChart(document.getElementById("myChartDiv"));
  			myChart.draw(gDataTable, chartOptions);
  			
  			
   	
	}

	function showNewData(e){
	//e is my click event; I will use its target property to getthe id of the div
	var myID = e.target.id; //e.g. "year_2000"
	console.log(myID);
	
	var myNameArray = myID.split("_"); //splits into an array, "2000"
	var myYear = myNameArray[1]; //grab the year
	
	$.get(myTableURL+"'"+myYear+"-12-01'"+myKey, dataLoaded, "json");
	
	History.pushState({year:myYear}, "Unemployment from - "+myYear, "?year="+myYear);
}

	
	
	function googleLoaded(){
		
		console.log("google loaded");
		
		//start with URL - URL is just a string; when I split it on '?' I'm doing ...
		var myURL = History.getState().cleanUrl;

		var queryArray = myURL.split("?"); //split the URL on ?, into two pieces
		
		var defaultYear = "1990";
		
		//current year that you have in the URL 
		
		//if query array length is great than 1 then take default year 
		//query array = 1, is the year 1990
		// the next thing that happens, if you split on = sign, then you have two strings, "year" and "1990"
		//and then saying get the thing in position 1 which is 1990 
		//and the default year happens to also be 1990 
		
		if(queryArray.length > 1){
			// the below is not great practice bc you have to think through what is going on 
			//get the query string, break it on equals and then take the right half that contains the year
			defaultYear = queryArray[1].split("=")[1];
		}
		
		//console.log(cleanURL);
		
		$('.btn-success').on("click", showNewData);
		
		//grab the button with the id that is year_"default
		
		$("#year_"+defaultYear).click();
		
		//  * instead of loading data from a static JSON file I'm going to laotd it from a google fusion table
		//$.get("https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+12A0eKUXKb4TCFhngfaGqaMEH6uECY1iBhd3VOBAV&key=AIzaSyDsBrSpJRliKgi913vr9FWTy8oL57c42bA", dataLoaded, "json");
		
		//$.get("https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+12A0eKUXKb4TCFhngfaGqaMEH6uECY1iBhd3VOBAV+WHERE+DATE>'1989-12-01'" +myKey, dataLoaded, "json");
		
		
		// - we have elimninated this redundant request thanks to line 107: $.get(myTableURL+"'1980-12-01'"+myKey, dataLoaded, "json");
		
		// in order to have two charts on the same page we would need a second get request. 
		// we would also need a new dataloaded function - or a different function (e.g. dataloaded2)
		//can still use same argument name becuase we are in a completely different function
		//we would also need a new div
	}
		
	
	function pageLoaded(){
		
		//is there something in the URL that specifies a particular year? 
		
		console.log("got to page Loaded");
		
		//load the google visualization library 
		//added the callback - want the name of the callback function to be googleLoaded
		
		google.load("visualization", "1", {packages:["corechart"], callback: "googleLoaded"});

		
	}
	
	$(document).ready(pageLoaded);
