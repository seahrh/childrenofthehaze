var Haze = {};

Haze.Viz = {};

Haze.Viz.PM25 = {
	dataSourceUrl : "//docs.google.com/spreadsheet/pub?key=0ArgBv2Jut0VxdHVWSFpQYkY1NG0tTlVTR2VHVUdadXc&headers=1&gid=1"
};

Haze.Viz.PM25.query = function() {
	var query = new google.visualization.Query(
			Haze.Viz.PM25.dataSourceUrl);
	
	query.setQuery("select A, max(C), max(D) group by A order by A "
			+ "label max(C) 'PSI', max(D) 'PM2.5' "
			+ "format A 'EEE ha, d MMM yyyy' ");
	
	query.send(Haze.Viz.PM25.dashboard);
};

Haze.Viz.PM25.dashboard = function(response) {
	var containerId = "dashboard-pm25";
	var data = response.getDataTable();
	
	// Create dashboard

	var dashboard = new google.visualization.Dashboard(document
			.getElementById(containerId));

	var dateControl = new google.visualization.ControlWrapper({
		"controlType" : "ChartRangeFilter",
		"containerId" : "pm25-date-filter",
		"options" : {
			"filterColumnIndex" : 0,
			"ui" : {
				"chartType" : "AreaChart",
				"chartOptions" : {
					'enableInteractivity' : false,
					'chartArea' : {
						'height' : '100%'
					},
					'legend' : {
						'position' : 'none'
					},
					'hAxis' : {
						'textPosition' : 'in'
					},
					'vAxis' : {
						'textPosition' : 'none',
						'gridlines' : {
							'color' : 'none'
						}
					},
					"series" : [ {
						"color" : "red"
					}, {
						"color" : "orange"
					} ]
				},
				"snapToData" : true
			}
		},
		"state" : {
			"range" : {
				// Selected range is 17 Jun 2013 to 24 Jun 2013
				"start" : new Date(2013, 5, 17),
				"end" : new Date(2013, 5, 24)
			}
		}
	});
	
	var chart = new google.visualization.ChartWrapper({
		"containerId" : "pm25",
		"chartType" : "AreaChart",
		"options" : {
			"title" : "PM2.5 vs. PSI 24-Hour Averages",
			"vAxis" : {
				"title" : "",
				"textPosition" : "in",
				"minValue" : 0,
				"maxValue" : 400,
				"gridlines" : {
					"count" : 5
				}
			},
			"hAxis" : {
				"textPosition" : "none",
				"textStyle" : {
					"fontSize" : 14
				}
			},
			"legend" : {
				"position" : "top",
				"alignment" : "left",
				"textStyle" : {
					"fontSize" : 14
				}
			},
			"chartArea" : {
				"width" : "99%",
				"height" : "85%",
				"left" : 0,
				"top" : 50
			},
			"focusTarget" : "category",
			"series" : [ {
				"color" : "red"
			}, {
				"color" : "orange"
			} ]

		}

	});

	dashboard.bind([ dateControl ], [ chart ]);

	dashboard.draw(data);

};

Haze.Viz.PSI = {
	dataSourceUrl : "//docs.google.com/spreadsheet/pub?key=0ArgBv2Jut0VxdHVWSFpQYkY1NG0tTlVTR2VHVUdadXc&headers=1&gid=0"
};

Haze.Viz.PSI.query = function() {
	var query = new google.visualization.Query(
			Haze.Viz.PSI.dataSourceUrl);

	query.setQuery("select A, B, E, F, C, D, G, H order by A "
			+ "label E '', F '', G '', H '' "
			+ "format A 'EEE ha, d MMM yyyy' ");

	query.send(Haze.Viz.PSI.chart);
};

Haze.Viz.PSI.chart = function(response) {
	var data = response.getDataTable();
	
	// Annotation for PSI 3-hr
	data.setColumnProperty(2, "role", "annotation");
	data.setColumnProperty(3, "role", "annotationText");
	
	// Annotation for PSI 24-hr MAX column
	data.setColumnProperty(6, "role", "annotation");
	data.setColumnProperty(7, "role", "annotationText");

	var chart = new google.visualization.ChartWrapper(
	{
		"containerId" : "psi-hourly",
		"chartType" : "AreaChart",

		"options" : {
			"title" : "PSI Hourly Updates",
			"vAxis" : {
				"title" : "",
				"textPosition" : "in",
				"minValue" : 0,
				"maxValue" : 500,
				"gridlines" : {
					"count" : 6
				}
			},
			"hAxis" : {
				"textPosition" : "none",
				"textStyle" : {
					"fontSize" : 14
				}
			},
			"legend" : {
				"position" : "bottom",
				"textStyle" : {
					"fontSize" : 14
				}
			},
			"chartArea" : {
				"width" : "99%",
				"height" : "85%",
				"left" : 0
			},
			"focusTarget" : "category",
			"series" : [ {
				"color" : "black",
				"pointSize" : 0
			}, {
				"color" : "red",
				"pointSize" : 0
			}, {
				"color" : "orange",
				"pointSize" : 0
			} ]				
			
		}

	});
	
	chart.setDataTable(data);
	
	chart.draw();
};

Haze.Viz.PSI24 = {
	dataSourceUrl : "//docs.google.com/spreadsheet/pub?key=0ArgBv2Jut0VxdHVWSFpQYkY1NG0tTlVTR2VHVUdadXc&headers=1&gid=1"
};

Haze.Viz.PSI24.query = function() {
	var query = new google.visualization.Query(
			Haze.Viz.PSI24.dataSourceUrl);

	query.setQuery("select A, min(C) group by A pivot B "
			+ "format A 'EEE ha, d MMM yyyy' ");

	query.send(Haze.Viz.PSI24.chart);
};

Haze.Viz.PSI24.chart = function(response) {
	var data = response.getDataTable();

	var chart = new google.visualization.ChartWrapper(
	{
		"containerId" : "psi-region",
		"chartType" : "LineChart",

		"options" : {
			"title" : "PSI 24-Hour Averages by Singapore Region",
			"vAxis" : {
				"title" : "",
				"textPosition" : "in"
			},
			"hAxis" : {
				"title" : "",
				"textPosition" : "none",
				"textStyle" : {
					"fontSize" : 14
				}
			},
			"legend" : {
				"position" : "bottom",
				"textStyle" : {
					"fontSize" : 14
				}
			},
			"chartArea" : {
				"width" : "99%",
				"height" : "85%",
				"left" : 0
			},				
			"focusTarget" : "category"
		}

	});
	
	chart.setDataTable(data);
	
	chart.draw();
};