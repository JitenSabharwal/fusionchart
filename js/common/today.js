//This sets the data for the chart and updates the values of the chart
function current_setdata()
{
		open_price = parseInt(data.prev_close);
		yaxisminvalue = open_price-100;
		yaxismaxvalue = open_price+50;
		var fusioncharts = new FusionCharts({
		id: "stockRealTimeChart",
		type: 'realtimeline',
		renderAt: 'chart-container',
		width: width,
		height: height ,
		dataFormat: 'json',
		dataSource: {
		    "chart": {
		        "caption": "Real-time stock price monitor",
		        "subCaption": data.company_name,
		        "xAxisName": "Time",
		        "yAxisName": "Stock Price",
		        "numberPrefix": "INR ",
		        "refreshinterval": "60",
		        "yaxisminvalue": yaxisminvalue.toString(),
		        "yaxismaxvalue": yaxismaxvalue.toString(),
		        "numdisplaysets": "10",
		        "labeldisplay": "rotate",
		        "showValues": "1",
		        "showRealTimeValue": "1",
		        "valueBgAlpha": "50",
		        "theme": "fint",
		        "formatNumberScale": "0",
		         "thousandSeparatorPosition": "2,3"
		    },
		    "categories": [{
		        "category": [{
		            "label": "Open Price"
		        }]
		    }],
		    "dataset": [{
		        "data": [{
		            "value": data.series.open.toString()
		        }]
		    }],
		    "trendlines": 
		    [
		        {
		            "line": [
		                {
		                    "startValue": open_price.toString(),
		                    "color": "#10de3a",
		                    "displayValue": "Previous{br}Close Value{br}(INR "+open_price+")"
		                }
		            ]
		        }
		    ],
		    "alerts":
		     {
	            "alert":
	            [
		            {
		                "minvalue": alert_min,
		                "maxvalue": open_price,
		                "action": "callJS",
		                "param": "showAlert('Fall in Stock Price','danger');"
		            }
	            ],
	            "alert":
	            [
		            {
		                "minvalue": open_price,
		                "maxvalue": alert_max,
		                "action": "callJS",
		                "param": "showAlert('Increase in Stock Price','success');"
		            }
	            ]
	        }
	    },
	    "events": {
	        'beforeRender': function(evt, args) {
	            var controllers = document.createElement('div');
	            controllers.setAttribute('id', 'tableView');
	            controllers.setAttribute('class', 'col-sm-offset-2 col-sm-6');
	            controllers.style.cssText = "";
	            
	            //Display container div and write table
	            args.container.parentNode.insertBefore(controllers, args.container.nextSibling);
	        },
	        'rendered': function(evt, args) {
	            window.showAlert = function(msg,css) {
	                var dispCon = document.getElementById("tableView"),
	                    str = "",
	                    tdStyle = "border:1px solid;border-color:#cccccc;width:100%;font-weight: bold;font-size: 14px;padding: 3px;text-align:center",
	                    tdStyle2 = "border:1px solid;border-color:#cccccc;width:100%;color:#aa0000;font-weight: bold;font-size: 14px;padding: 3px;text-align:center";

	                //Creating the table format
	                str += '<table cellpadding="1" width="600px" class="table" cellspacing="0">';
	                str += '    <tr class="' + css + '">';
	                str += '        <td style="' + tdStyle2 + '" >ALERT</td>';
	                str += '    </tr>';
	                str += '    <tr>';
	                str += '        <td  style="' + tdStyle + '">' + msg + '</td>';
	                str += '    </tr>';
	                str += '</table>';
	                //Showing the table
	                dispCon.style.cssText = "display:block";
	                //Adding html string in the div container
	                dispCon.innerHTML = str;
	            }
	            //Format minutes, seconds by adding 0 prefix accordingly
	            function addLeadingZero(time) {
	                (time < 10) ? (time = "0" + time) : (time = time);
	                return time;
	            }
	            evt.sender.chartInterval = setInterval(function() {
		            change_value();
	                //Get reference to the chart using its ID
	                var chartRef = evt.sender,
                	dispCon = document.getElementById("tableView");
	                //Hiding the table
	                dispCon.style.cssText = "display:none";
	                //We need to create a querystring format incremental update, containing
	                //label in hh:mm:ss format
	                //and a value (random).
	                currDate = new Date();
	                label = addLeadingZero(currDate.getHours()) + ":" +
	                        addLeadingZero(currDate.getMinutes()) + ":" +
	                        addLeadingZero(currDate.getSeconds());
	                
	                randomValue = data.series.close;
	                
	                strData = "&label=" + label + "&value=" + randomValue;
	                //Feed it to chart.
	                chartRef.feedData(strData);

	            }, 80000);
	        },
	        'disposed': function(evt, arg) {
	            clearInterval(evt.sender.chartInterval);
	        }
		}
	});
		fusioncharts.render();
}
