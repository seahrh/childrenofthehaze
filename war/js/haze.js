var Haze = {};

Haze.Viz = {};

Haze.Viz.PM25 = {
    dataSourceUrl : "//docs.google.com/spreadsheet/tq?key=0ArgBv2Jut0VxdHVWSFpQYkY1NG0tTlVTR2VHVUdadXc&headers=1&gid=1"
};

Haze.Viz.PM25.query = function() {
    var query = new google.visualization.Query(Haze.Viz.PM25.dataSourceUrl);

    query.setQuery("select A, max(C), max(D) group by A order by A " + "label max(C) 'PSI', max(D) 'PM2.5' " + "format A 'EEE ha, d MMM yyyy' ");

    query.send(Haze.Viz.PM25.dashboard);
};

Haze.Viz.PM25.dashboard = function(response) {
    var toDate = new Date(2013, 5, 27);

    var fromDate = new Date(2013, 5, 17);

    // Initial filter chart by the last 7 days

    //fromDate.setDate(toDate.getDate() - 7);

    var containerId = "pm25";

    var data = response.getDataTable();

    var dashboard = new google.visualization.Dashboard(document.getElementById(containerId));

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
                    "series" : [{
                        "color" : "red"
                    }, {
                        "color" : "orange"
                    }]
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
            "series" : [{
                "color" : "red"
            }, {
                "color" : "orange"
            }]

        }

    });

    dashboard.bind([dateControl], [chart]);

    dashboard.draw(data);

};

Haze.Viz.PSI = {
    dataSourceUrl : "//docs.google.com/spreadsheet/tq?key=0ArgBv2Jut0VxdHVWSFpQYkY1NG0tTlVTR2VHVUdadXc&headers=1&gid=0"
};

Haze.Viz.PSI.query = function() {
    var query = new google.visualization.Query(Haze.Viz.PSI.dataSourceUrl);

    query.setQuery("select A, B, E, F, C, D, G, H order by A " + "label E '', F '', G '', H '' " + "format A 'EEE ha, d MMM yyyy' ");

    query.send(Haze.Viz.PSI.dashboard);
};

Haze.Viz.PSI.dashboard = function(response) {
    var toDate = new Date(2013, 5, 27);

    var fromDate = new Date(2013, 5, 17);

    // Initial filter chart by the last 7 days

    //fromDate.setDate(toDate.getDate() - 7);

    var containerId = "psi";
    var data = response.getDataTable();

    // Annotation for PSI 3-hr
    data.setColumnProperty(2, "role", "annotation");
    data.setColumnProperty(3, "role", "annotationText");

    // Annotation for PSI 24-hr MAX column
    data.setColumnProperty(6, "role", "annotation");
    data.setColumnProperty(7, "role", "annotationText");

    // Create dashboard

    var dashboard = new google.visualization.Dashboard(document.getElementById(containerId));

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
                    "series" : [{
                        "color" : "black"
                    }]
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
            "series" : [{
                "color" : "black",
                "pointSize" : 0
            }, {
                "color" : "red",
                "pointSize" : 0
            }, {
                "color" : "orange",
                "pointSize" : 0
            }]

        }

    });

    dashboard.bind([dateControl], [chart]);

    dashboard.draw(data);
};

Haze.Viz.PSI24 = {
    dataSourceUrl : "//docs.google.com/spreadsheet/tq?key=0ArgBv2Jut0VxdHVWSFpQYkY1NG0tTlVTR2VHVUdadXc&headers=1&gid=1"
};

Haze.Viz.PSI24.query = function() {
    var query = new google.visualization.Query(Haze.Viz.PSI24.dataSourceUrl);

    query.setQuery("select A, min(C) group by A pivot B " + "format A 'EEE ha, d MMM yyyy' ");

    query.send(Haze.Viz.PSI24.dashboard);
};

Haze.Viz.PSI24.dashboard = function(response) {
    var toDate = new Date(2013, 5, 27);

    var fromDate = new Date(2013, 5, 17);

    // Initial filter chart by the last 7 days

    //fromDate.setDate(toDate.getDate() - 7);

    var containerId = "region";
    var data = response.getDataTable();

    // Create dashboard

    var dashboard = new google.visualization.Dashboard(document.getElementById(containerId));

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
    dashboard.bind([dateControl], [chart]);

    dashboard.draw(data);

};

Haze.Map = {};

Haze.Map.Hotspot = {};

Haze.Map.Hotspot.getKmlUrl = function() {

    var prefix = "http://childrenofthehaze.appspot.com/kml/noaa18";
    //var prefix = "http://app2.nea.gov.sg/docs/default-source/anti-pollution-radiation-protection/air-pollution/hotspot-and-satellite-images/noaa18";
    var suffix = "-kml.kml";

    var date = window.kmlDate;

    if (!date || !date instanceof Date) {
        //var today = new Date();
        //var yesterday = new Date();
        //yesterday.setDate(today.getDate() - 1);

        // Default kml url is yesterday's kml file
        //date = yesterday;

        date = new Date(2013, 7, 26);
    }

    // Remove time component, which allows for date comparison later
    // Save in global variable

    date.setHours(0, 0, 0, 0);
    window.kmlDate = date;
    console.log("kmlDate : " + date);

    var dateString = Haze.Util.toDateString(date);

    // URL typo correction for 24 July 2013

    var typoDate = new Date(2013, 6, 24);
    //console.log("typoDate : " + typoDate.getTime());

    if (date.getTime() === typoDate.getTime()) {
        suffix = "-km.kml";
    }

    return prefix + dateString + suffix;

};

Haze.Map.Hotspot.draw = function() {
    var map;
    var kmlLayer;
    var src = Haze.Map.Hotspot.getKmlUrl();

    console.log("kmlUrl : " + src);

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

    google.maps.event.addListener(kmlLayer, 'defaultviewport_changed', function() {
        var bounds = kmlLayer.getDefaultViewport();
        map.setCenter(bounds.getCenter());
    });

    // Display the date of the KML file
    // after map loading is completed

    google.maps.event.addListener(map, 'idle', function() {
        $('input#kml-date').val(Haze.Util.toDateString(window.kmlDate));
    });

    map.setOptions({
        disableDefaultUI : false
    });

    // Status of the KML Layer once loaded

    google.maps.event.addListener(kmlLayer, 'status_changed', function() {
        console.log("KML Layer Status : " + kmlLayer.getStatus());
    });

};

Haze.UI = {};

Haze.UI.LoadAnimation = {
    "start" : function() {
        var opts = {
            lines : 13, // The number of lines to draw
            length : 7, // The length of each line
            width : 4, // The line thickness
            radius : 10, // The radius of the inner circle
            corners : 1, // Corner roundness (0..1)
            rotate : 0, // The rotation offset
            color : '#000', // #rgb or #rrggbb
            speed : 1, // Rounds per second
            trail : 60, // Afterglow percentage
            shadow : false, // Whether to render a shadow
            hwaccel : false, // Whether to use hardware acceleration
            className : 'spinner', // The CSS class to assign to the spinner
            zIndex : 2e9, // The z-index (defaults to 2000000000)
            top : $(window).height() / 2.5, // Manual positioning in viewport
            left : "auto"

        };
        var target = $("body")[0];
        return new Spinner(opts).spin(target);
    },
    "stop" : function(spinner) {
        spinner.stop();
    }
};

Haze.Util = {};

// Return a DDMMYYYY string representation of a Date object

Haze.Util.toDateString = function(date) {
    var year = "";
    var month = "";
    var day = "";
    if (date && date instanceof Date) {
        year = date.getFullYear();

        month = date.getMonth() + 1;

        // Left padding with zero if month is single digit

        if (month < 10) {
            month = "0" + month;
        }

        day = date.getDate();

        // Left padding with zero if day of month is single digit

        if (day < 10) {
            day = "0" + day;
        }
        //console.log("Day : " + day);
    }
    return day + month + year;
};

/**
 * Hazy Namespace
 */
( function(hazy, $, undefined) {

    }(window.hazy = window.hazy || {}, jQuery)); ( function(viz, $, undefined) {

        viz.timeSeries = function(opts) {

            var defaults;

            defaults = {
                "overviewContainerId" : "",
                "regionalContainerId" : "",
                "dataSourceUrl" : "//docs.google.com/spreadsheet/tq?key=0ArgBv2Jut0VxdGdiMlJ6ZlM4NGFwUGpvR0RTdlAtRnc&headers=1&gid=5",
                "mostRecentDays" : 7,
                "slidingWindowLength" : 21, /* Length of the query sliding window (days) */ 
                "pm25Cols" : [0, 1, 2],
                "psiCols" : [0, 2, 3, 1],
                "regionalPm25Cols" : [0, 3, 4, 5, 6, 7],
                "regionalPsiCols" : [0, 4, 5, 6, 7, 8]
            };

            if ( typeof opts === "object") {
                opts = $.extend(defaults, opts);
            } else {
                opts = defaults;
            }

            query();

            function query() {
                var query, date;
                
                date = moment().subtract(opts.slidingWindowLength, "days").format("YYYY-MM-DD HH:mm:ss");
                
                query = new google.visualization.Query(opts.dataSourceUrl);

                query.setQuery("select A, I, J, K, L, M, N, O, P where A >= dateTime '" + date + "' order by A format A 'EEE ha, d MMM yyyy' ");

                query.send(draw);
            }

            function draw(response) {

                var data, overviewDb, regionalDb;

                if (response.isError()) {
                    console.log('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
                    return;
                }

                data = response.getDataTable();

                overviewDb = overviewDashboard(opts.overviewContainerId);
                regionalDb = regionalDashboard(opts.regionalContainerId);
                overviewDb.draw(data);
                regionalDb.draw(data);
            }

            function overviewDashboard(containerId) {

                var toDate, fromDate, dashboard, dateControl, chart;

                toDate = new Date();
                fromDate = new Date();
                fromDate.setDate(toDate.getDate() - opts.mostRecentDays);

                dashboard = new google.visualization.Dashboard(document.getElementById(containerId));
                dateControl = new google.visualization.ControlWrapper({
                    "controlType" : "ChartRangeFilter",
                    "containerId" : containerId + "-control1",
                    "options" : {
                        "filterColumnIndex" : 0,
                        "ui" : {
                            "chartType" : "AreaChart",
                            "chartOptions" : {
                                'enableInteractivity' : false,
                                'chartArea' : {
                                    'height' : '100%',
                                    'width' : '100%'
                                },
                                'legend' : {
                                    'position' : 'none'
                                },
                                'hAxis' : {
                                    'textPosition' : 'in',
                                    "format" : "d MMM y"
                                },
                                'vAxis' : {
                                    'textPosition' : 'none',
                                    'gridlines' : {
                                        'color' : 'none'
                                    }
                                },
                                "series" : [{
                                    "color" : "red"
                                }, {
                                    "color" : "orange"
                                }, {
                                    "color" : "black"
                                }]
                            },
                            "chartView" : {
                                'columns' : opts.psiCols
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

                chart = new google.visualization.ChartWrapper({
                    "containerId" : containerId + "-chart1",
                    "chartType" : "AreaChart",
                    "options" : {
                        "title" : "Singapore Hourly Air Quality",
                        "vAxis" : {
                            "title" : "",
                            "textPosition" : "in"
                            //"minValue" : 0,
                            //"maxValue" : 400,
                            //"gridlines" : {"count" : 5}
                        },
                        "hAxis" : {
                            "textPosition" : "in",
                            "format" : "d MMM y"
                        },
                        "legend" : {
                            "position" : "top",
                            "alignment" : "left",
                            "textStyle" : {
                                "fontSize" : 14
                            }
                        },
                        "chartArea" : {
                            "width" : "100%",
                            "height" : "90%",
                            "left" : 0,
                            "top" : 40
                        },
                        "focusTarget" : "category",
                        "series" : [{
                            "color" : "red"
                        }, {
                            "color" : "orange"
                        }, {
                            "color" : "black"
                        }]
                    }

                });

                chart.setView({
                    'columns' : opts.psiCols
                });

                dashboard.bind([dateControl], [chart]);

                // Attach listener before drawing the dashboard

                google.visualization.events.addOneTimeListener(dashboard, 'ready', function() {

                    $("#reading-toggle").change(function() {

                        var readingType;
                        readingType = $("#reading-toggle option:selected").val();
                        if (readingType === "psi") {
                            dateControl.setOption("ui.chartView.columns", opts.psiCols);
                            chart.setView({
                                "columns" : opts.psiCols
                            });
                        } else {
                            dateControl.setOption("ui.chartView.columns", opts.pm25Cols);
                            
                            /*dateControl.setState({
                                "range" : {
                                    "start" : new Date(2014, 2, 9),
                                    "end" : new Date(2014, 2, 11)
                                }
                            });*/
                            
                            chart.setView({
                                "columns" : opts.pm25Cols
                            });
                        }
                        dateControl.draw();
                        chart.draw();
                    });

                });

                return dashboard;
            }

            function regionalDashboard(containerId) {

                var toDate, fromDate, dashboard, dateControl, chart;

                toDate = new Date();
                fromDate = new Date();
                fromDate.setDate(toDate.getDate() - opts.mostRecentDays);

                dashboard = new google.visualization.Dashboard(document.getElementById(containerId));
                dateControl = new google.visualization.ControlWrapper({
                    "controlType" : "ChartRangeFilter",
                    "containerId" : containerId + "-control1",
                    "options" : {
                        "filterColumnIndex" : 0,
                        "ui" : {
                            "chartType" : "LineChart",
                            "chartOptions" : {
                                'enableInteractivity' : false,
                                'chartArea' : {
                                    'height' : '100%',
                                    'width' : '100%'
                                },
                                'legend' : {
                                    'position' : 'none'
                                },
                                'hAxis' : {
                                    'textPosition' : 'in',
                                    "format" : "d MMM y"
                                },
                                'vAxis' : {
                                    'textPosition' : 'none',
                                    'gridlines' : {
                                        'color' : 'none'
                                    }
                                }
                            },
                            "chartView" : {
                                'columns' : opts.regionalPsiCols
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

                chart = new google.visualization.ChartWrapper({
                    "containerId" : containerId + "-chart1",
                    "chartType" : "LineChart",
                    "options" : {
                        "title" : "Singapore Hourly Air Quality By Region",
                        "vAxis" : {
                            "title" : "",
                            "textPosition" : "in"
                            //"minValue" : 0,
                            //"maxValue" : 400,
                            //"gridlines" : {"count" : 5}
                        },
                        "hAxis" : {
                            "textPosition" : "in",
                            "format" : "d MMM y"
                        },
                        "legend" : {
                            "position" : "top",
                            "alignment" : "left",
                            "textStyle" : {
                                "fontSize" : 14
                            }
                        },
                        "chartArea" : {
                            "width" : "100%",
                            "height" : "90%",
                            "left" : 0,
                            "top" : 40
                        },
                        "focusTarget" : "category"
                    }

                });

                chart.setView({
                    'columns' : opts.regionalPsiCols
                });

                dashboard.bind([dateControl], [chart]);

                // Attach listener before drawing the dashboard

                google.visualization.events.addOneTimeListener(dashboard, 'ready', function() {

                    $("#reading-toggle").change(function() {

                        var readingType;

                        readingType = $("#reading-toggle option:selected").val();
                        if (readingType === "psi") {
                            dateControl.setOption("ui.chartView.columns", opts.regionalPsiCols);
                            chart.setView({
                                "columns" : opts.regionalPsiCols
                            });
                        } else {

                            dateControl.setOption("ui.chartView.columns", opts.regionalPm25Cols);

                            /*dateControl.setState({
                                "range" : {
                                    "start" : new Date(2014, 2, 9),
                                    "end" : new Date(2014, 2, 11)
                                }
                            });*/

                            chart.setView({
                                "columns" : opts.regionalPm25Cols
                            });
                        }
                        dateControl.draw();
                        chart.draw();
                    });

                });

                return dashboard;
            }

        };

    }(window.hazy.viz = window.hazy.viz || {}, jQuery));
