//Variable initialization
var data; 
var open_price  ,yaxisminvalue , yaxismaxvalue;
var height = "500",width="700";

//url for the backend api file
var url = "backend.php";

var up = "<i class='glyphicon glyphicon-arrow-up'></i>"; 
var down = "<i class='glyphicon glyphicon-arrow-down'></i>"; 

//Setting the angular controller and module
var myApp = angular.module("myApp" , []);
myApp.controller('myCtrl',function($scope,$http){ 	
   //This function fetches values from the webservice
   change_value = function(){
	   	$http.get(url).then(function(response) {
			if(data == null)
			{
				data = response.data; //Set data value
				$(".stock-rate").removeClass("hidden");
				current_setdata(); //Start the chart 
				five_day();//Start five day Chart
				one_month();//Start five day Chart
				five_month();//Start five day Chart
				one_year();//Start five day Chart
	    	}
			if(data.prev_close > data.series.close)
			{
				$(".crement").html(down).parent("div").addClass("text-danger").removeClass("text-success");
				$scope.stock_rate = "-"+Math.round((data.prev_close-data.series.close)*100)/100;
			}
			else
			{
				$(".crement").html(up).parent("div").addClass("text-success").removeClass("text-danger");
					$scope.stock_rate = Math.round((data.series.close-data.prev_close)*100)/100;
			}
			$scope.current_price = "INR "+data.series.close;
			data = response.data; //Set data value
	    });
	  }

});
