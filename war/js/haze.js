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
	var toDate = new Date();
	
	var fromDate = new Date();
	
	// Initial filter chart by the last 7 days
	
	fromDate.setDate(toDate.getDate() - 7);
	
	var containerId = "pm25";
	
	var data = response.getDataTable();

	var dashboard = new google.visualization.Dashboard(document
			.getElementById(containerId));

	var dateControl = new google.visualization.ControlWrapper({
		"controlType" : "ChartRangeFilter",
		"containerId" : "pm25-control1",
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
				"start" : fromDate,
				"end" : toDate
			}
		}
	});
	
	var chart = new google.visualization.ChartWrapper({
		"containerId" : "pm25-chart1",
		"chartType" : "AreaChart",
		"options" : {
			"title" : "PM2.5 vs. PSI 24-Hour Averages",
			"vAxis" : {
				"title" : "",
				"textPosition" : "in"
				//"minValue" : 0,
				//"maxValue" : 400,
				//"gridlines" : {"count" : 5}
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
				"height" : "90%",
				"left" : 0,
				"top" : 40
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

	query.send(Haze.Viz.PSI.dashboard);
};

Haze.Viz.PSI.dashboard = function(response) {
	var toDate = new Date();
	
	var fromDate = new Date();
	
	// Initial filter chart by the last 7 days
	
	fromDate.setDate(toDate.getDate() - 7);
	
	var containerId = "psi";
	var data = response.getDataTable();
	
	// Annotation for PSI 3-hr
	data.setColumnProperty(2, "role", "annotation");
	data.setColumnProperty(3, "role", "annotationText");
	
	// Annotation for PSI 24-hr MAX column
	data.setColumnProperty(6, "role", "annotation");
	data.setColumnProperty(7, "role", "annotationText");
	
	// Create dashboard

	var dashboard = new google.visualization.Dashboard(document
			.getElementById(containerId));
	
	var dateControl = new google.visualization.ControlWrapper({
		"controlType" : "ChartRangeFilter",
		"containerId" : "psi-control1",
		"options" : {
			"filterColumnIndex" : 0,
			"ui" : {
				"chartType" : "AreaChart",
				"chartView" : {
					"columns" : [0, 1]
				},
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
						"color" : "black"
					} ]
				},
				"snapToData" : true
			}
		},
		"state" : {
			"range" : {
				
				"start" : fromDate,
				"end" : toDate
			}
		}
	});

	var chart = new google.visualization.ChartWrapper(
	{
		"containerId" : "psi-chart1",
		"chartType" : "AreaChart",

		"options" : {
			"title" : "PSI Hourly Updates",
			"vAxis" : {
				"title" : "",
				"textPosition" : "in"
				//"minValue" : 0,
				//"maxValue" : 500,
				//"gridlines" : {"count" : 6}
			},
			"hAxis" : {
				"textPosition" : "none",
				"textStyle" : {
					"fontSize" : 14
				}
			},
			"legend" : {
				"position" : "top",
				"textStyle" : {
					"fontSize" : 14
				}
			},
			"chartArea" : {
				"width" : "99%",
				"height" : "90%",
				"left" : 0,
				"top" : 40
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
	
	dashboard.bind([ dateControl ], [ chart ]);

	dashboard.draw(data);
}

Haze.Viz.PSI24 = {
	dataSourceUrl : "//docs.google.com/spreadsheet/pub?key=0ArgBv2Jut0VxdHVWSFpQYkY1NG0tTlVTR2VHVUdadXc&headers=1&gid=1"
};

Haze.Viz.PSI24.query = function() {
	var query = new google.visualization.Query(
			Haze.Viz.PSI24.dataSourceUrl);

	query.setQuery("select A, min(C) group by A pivot B "
			+ "format A 'EEE ha, d MMM yyyy' ");

	query.send(Haze.Viz.PSI24.dashboard);
};

Haze.Viz.PSI24.dashboard = function(response) {
	var toDate = new Date();
	
	var fromDate = new Date();
	
	// Initial filter chart by the last 7 days
	
	fromDate.setDate(toDate.getDate() - 7);
	
	var containerId = "region";
	var data = response.getDataTable();

	// Create dashboard

	var dashboard = new google.visualization.Dashboard(document
			.getElementById(containerId));

	var dateControl = new google.visualization.ControlWrapper({
		"controlType" : "ChartRangeFilter",
		"containerId" : "region-control1",
		"options" : {
			"filterColumnIndex" : 0,
			"ui" : {
				"chartType" : "LineChart",
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
					}
				},
				"snapToData" : true
			}
		},
		"state" : {
			"range" : {
	
				"start" : fromDate,
				"end" : toDate
			}
		}
	});

	var chart = new google.visualization.ChartWrapper({
		"containerId" : "region-chart1",
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
				"position" : "top",
				"textStyle" : {
					"fontSize" : 14
				}
			},
			"chartArea" : {
				"width" : "99%",
				"height" : "90%",
				"left" : 0,
				"top" : 40
			},
			"focusTarget" : "category"
		}

	});
	dashboard.bind([ dateControl ], [ chart ]);

	dashboard.draw(data);
			
};

Haze.Map = {};

Haze.Map.Hotspot = {};

Haze.Map.Hotspot.getKmlUrl = function() {
	var prefix = "http://app2.nea.gov.sg/docs/default-source/anti-pollution-radiation-protection/air-pollution/hotspot-and-satellite-images/noaa18";
	var suffix = "-kml.kml";
	
	var today = new Date();
	var yesterday = new Date();
	yesterday.setDate(today.getDate() - 1);
	
	// Default kml url is yesterday's kml file
	
	var year = yesterday.getFullYear();
	
	var month = yesterday.getMonth() + 1;
	
	// Left padding with zero if month is single digit
	
	if (month < 10) {
		month = "0" + month;
	}
	
	var day = yesterday.getDate();
	
	// Left padding with zero if day of month is single digit
	
	if (day < 10) {
		day = "0" + month;
	}
	
	return prefix + day + month + year + suffix;
	
	
};

Haze.Map.Hotspot.draw = function() {
	var map;
	var kmlLayer;
	var src = Haze.Map.Hotspot.getKmlUrl();
	
	//console.log(src);

	map = new google.maps.Map(document.getElementById('map'), {
		// By default, map centered on Dumai, Riau province
		center : new google.maps.LatLng(1.6667, 101.4500),
		zoom : 8,
		mapTypeId : google.maps.MapTypeId.TERRAIN
	});
	kmlLayer = new google.maps.KmlLayer(src, {
		suppressInfoWindows : false,
		preserveViewport : true,
		map : map
	});

	// Set the map center to the center of the kml layer default viewport
	// Event is triggered when contents of the kml layer are loaded
	// and its default viewport is computed
		
	google.maps.event.addListener(kmlLayer, 'defaultviewport_changed',
			function() {
				var bounds = kmlLayer.getDefaultViewport();
				map.setCenter(bounds.getCenter());
			});

	map.setOptions({
		disableDefaultUI : false
	});
};
