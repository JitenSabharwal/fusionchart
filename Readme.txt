This file is to explain about the Task
The given task was to "Create an app in AngularJS which consumes data from a web-service and illustrates movements in the price of any stock/ticker over time using chart/charts from FusionCharts library."
So the task conist of total 5 Charts
1)Current Time Chart/ Real Time Chart
2)5 Days Chart
3)1 Months Chart
4)5 Months Chart
5)1 Year Chart

In the task there are two main files :
1)index.html
2)backend.php

index.html -> 
	This files consist of script and css file and all the display content.
	It is linked with : 
	1)js/common/angular_controller.js => This file is used to call all the chart functions and call the backend.php to get the data.
	2)js/common/today.js => This consist of the function that forms the Real Time chart in which the values are continously updated.
	3)js/common/my_charts.js => This file consist of charts that will show the chart for previous 5 days ,1 Month ,5 Months,1 Year .
	4)assets/css/menu.css => This file is used to give the css for the Chart menu in  index.html
backend.php ->
	This file consist of function that are used to get the online stock market data for 5days and 1year . It then returns the required data in json format which is feed to the charts . It gets the online stock data from "http://chartapi.finance.yahoo.com/instrument/1.0/%5Ensei/chartdata;type=quote;range=5d/json/" which is the  data for NIFTY 50 Company and the link returns the data in string that has the json in it.

The task is also available at https://github.com/JitenSabharwal/fusionchart   

