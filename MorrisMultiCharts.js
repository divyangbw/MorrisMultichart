var MorrisMultiCharts = function () {
    
    //Graph Data
    var htmlId = "";
    var graphData = [];
    var xKeyG = "";
    var yKeysG = [];
    var toShowLabel = "";
    var toShowLabelVal = "";
    //Extra options
    var pointSizeG = 1;
    var smoothG = true;
    var hideHoverG = 'auto';
    
    var lineGraph = null;
    var areaGraph = null;
    var barGraph = null;
    
    var lineGraphInitialized = false;
    var areaGraphInitialized = false;
    var barGraphInitialized = false;
    
    return {
        
        InitializeGraphs: function (options, idVal, dataInput, xkeyInput, ykeysInput, labelsInput) {

            try {
                
                if (options.idVal === null || options.dataInput === null ||
                    options.xkeyInput === null || options.ykeysInput === null) {
                    console.log("One of the required inputs is null.");
					return;
                }

                // We need access to these later on, hence saving em :)
                htmlId = options.idVal;
                graphData = options.dataInput;
                xKeyG = options.xkeyInput;
                yKeysG = options.ykeysInput;

                if (labelsInput !== null) {
                    toShowLabel = "labels";
                    toShowLabelVal = labelsInput;
                }

                // By default, we will show a line graph
                lineGraph = Morris.Line({
                    element: htmlId,
                    data: graphData,
                    xkey: xKeyG,
                    ykeys: yKeysG,
                    toShowLabel: toShowLabelVal,
                    pointSize: pointSizeG,
                    smooth: smoothG,
                    hideHover: hideHoverG,
                });
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
                lineGraph = Morris.Line({
                    element: htmlId,
                    data: graphData,
                    xkey: xKeyG,
                    ykeys: yKeysG,
                    toShowLabel: toShowLabelVal,
                    pointSize: pointSizeG,
                    smooth: smoothG,
                    hideHover: hideHoverG,
                });
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
                areaGraph = Morris.Area({
                    element: htmlId,
                    data: graphData,
                    xkey: xKeyG,
                    ykeys: yKeysG,
                    toShowLabel: toShowLabelVal,
                    pointSize: pointSizeG,
                    smooth: smoothG,
                    hideHover: hideHoverG,
                });
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
                barGraph = Morris.Bar({
                    element: htmlId,
                    data: graphData,
                    xkey: xKeyG,
                    ykeys: yKeysG,
                    toShowLabel: toShowLabelVal,
                    pointSize: pointSizeG,
                    smooth: smoothG,
                    hideHover: hideHoverG,
                });
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
        
        //Extra options
        SetPointSize: function(size) {
            if (typeof size === 'number' && size % 1 === 0) {
                pointSizeG = size;
            } else {
                console.log("Point size can only be an integer.");
            }
        },
        ResetPointSize: function () {
            pointSizeG = 1;
        },
        AlwaysShowHoverLegend: function () {
            hideHoverG = false;
        },
        AutoShowHoverLegend: function () {
            hideHoverG = 'auto';
        },
        NeverShowHoverLegend: function () {
            hideHoverG = 'always';
        }

    };
}();
