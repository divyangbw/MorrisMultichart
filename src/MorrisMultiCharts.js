var MorrisMultiCharts = function () {
    
	var privateOptions = {
		element : null,
		data : null,
		xkey : null,
		ykeys : null,
		labels : null,
		lineColors : [],
		lineWidth : 1,
		pointSize : 3,
		pointFillColors : [""],
		pointStrokeColors : ["#fff"],
		ymax : "auto",
		ymin : "auto 0",
		smooth : true,
		hideHover : false,
		parseTime : true,
		postUnits : "",
		preUnits : "",
		xLabels : "",
		goals : [],
		goalStrokeWidth : 1,
		goalLineColors : [""],
		events : [],
		eventStrokeWidth : 1,
		eventLineColors : [""],
		continuousLine : false,
		axes : true,
		grid : true,
		gridTextColor : [""],
		gridTextSize : 12,
		gridTextFamily : "sans-serif",
		gridTextFamily : "normal",
		fillOpacity : null
	}
	
    
    var lineGraph = null;
    var areaGraph = null;
    var barGraph = null;
    
    var lineGraphInitialized = false;
    var areaGraphInitialized = false;
    var barGraphInitialized = false;
    
    return {
        
        InitializeGraphs: function (options) {

            try {
                
                if (options.element === null || options.data === null ||
                    options.xkey === null || options.ykeys === null) {
                    console.log("One of the required inputs is null.");
					return;
                }
				$.extend(privateOptions, options);

                // By default, we will show a line graph
                lineGraph = Morris.Line(privateOptions);
                lineGraphInitialized = true;
                areaGraphInitialized = false;
                barGraphInitialized = false;

            }
            catch (err) {
                console.log("Oops. Your data is corrupted :(");
            }
        },
        
        UpdateGlobalGraphsData: function(updatedDataForAll) {
            graphData = updatedDataForAll;
            if (lineGraphInitialized) {
                lineGraph.setData(updatedDataForAll);
            } else if (areaGraphInitialized) {
                areaGraph.setData(updatedDataForAll);
            } else if (barGraphInitialized) {
                barGraph.setData(updatedDataForAll);
            } else {
                console.log("Graphs Not Initialized :(");
            }
            
        },
        
        SwitchToLineGraphs: function() {
            Destroy();
            try {
                lineGraph = Morris.Line(privateOptions);
                barGraph = null;
                areaGraph = null;
                lineGraphInitialized = true;
                areaGraphInitialized = false;
                barGraphInitialized = false;
            }
            catch (err) {
                console.log("Oops. Your data is corrupted :(");
            }
        },
        
        SwitchToAreaGraphs: function () {
            Destroy();
            try {
                areaGraph = Morris.Area(privateOptions);
                barGraph = null;
                lineGraph = null;
                lineGraphInitialized = false;
                areaGraphInitialized = true;
                barGraphInitialized = false;
            }
            catch (err) {
                console.log("Oops. Your data is corrupted :(");
            }
        },
        
        SwitchToBarGraphs: function () {
            Destroy();
            try {
                barGraph = Morris.Bar(privateOptions);
                areaGraph = null;
                lineGraph = null;
                lineGraphInitialized = false;
                areaGraphInitialized = false;
                barGraphInitialized = true;
            }
            catch (err) {
                console.log("Oops. Your data is corrupted :(");
            }
        },

        Destroy: function() {
            $("#" + htmlId).html("");
        },
        
    };
	
}();
