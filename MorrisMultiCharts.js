var MorrisMultiCharts = function () {
    var privateOptions = {};
	
    var lineGraph = null;
    var areaGraph = null;
    var barGraph = null;
    
    var lineGraphInitialized = false;
    var areaGraphInitialized = false;
    var barGraphInitialized = false;
	var isInit = false;
    
    return {
        
        InitializeGraphs: function (options) {

            try {
                
                if(!IsErrorFree(options)){
					return;
                }
				$.extend(true, privateOptions, options);

				GenerateHtml();
				EventHandlers();
                // By default, we will show a line graph
                lineGraph = Morris.Line(privateOptions);
				isInit = true;
                lineGraphInitialized = true;
                areaGraphInitialized = false;
                barGraphInitialized = false;

            }
            catch (err) {
                console.log("Oops. Your options are corrupted :(");
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
			if(!CheckIfInitialized())
			{
				console.log("Not Initialized.");
				return false;
			}
            Destroy();
            try {
                lineGraph = Morris.Line(privateOptions);
                barGraph = null;
                areaGraph = null;
                lineGraphInitialized = true;
                areaGraphInitialized = false;
                barGraphInitialized = false;
				return true;
            }
            catch (err) {
                console.log("Oops. Your data is corrupted :(");
				return false;
            }
        },
        
        SwitchToAreaGraphs: function () {
            if(!CheckIfInitialized())
			{
				console.log("Not Initialized.");
				return false;
			}
			Destroy();
            try {
                areaGraph = Morris.Area(privateOptions);
                barGraph = null;
                lineGraph = null;
                lineGraphInitialized = false;
                areaGraphInitialized = true;
                barGraphInitialized = false;
				return true;
            }
            catch (err) {
                console.log("Oops. Your data is corrupted :(");
				return false;
            }
        },
        
        SwitchToBarGraphs: function () {
            if(!CheckIfInitialized())
			{
				console.log("Not Initialized.");
				return false;
			}
			Destroy();
            try {
                barGraph = Morris.Bar(privateOptions);
                areaGraph = null;
                lineGraph = null;
                lineGraphInitialized = false;
                areaGraphInitialized = false;
                barGraphInitialized = true;
				return true;
            }
            catch (err) {
                console.log("Oops. Your data is corrupted :(");
				return false;
            }
        },

        DestroyCurrentChartView: function() {
            Destroy();
        },
        
    };
	
	function Destroy(){
		if(CheckIfInitialized()) {
			$("#" + privateOptions.element).html("");
		} else {
			console.log("Not Initialized.");
		}
		
	}
	
	function CheckIfInitialized() {
		if(!isInit) {
			return false;
		}
		return true;
	}
	
	function GenerateHtml()	{
		$('#' + privateOptions.element).wrap( "<div class='mmc-graphs-wrapper'></div>" );		
		$("<div class='mmc-graphs-btn-wrapper'></div>").prependTo('.mmc-graphs-wrapper');
		$('.mmc-graphs-btn-wrapper').append( 
			"<a href='javascript:;' id='mmc-graphs-switch-line' class='mmc-graphs-active'> Line </a> " +
			"<a href='javascript:;' id='mmc-graphs-switch-area' class=''> Area </a> " +
			"<a href='javascript:;' id='mmc-graphs-switch-bar' class=''> Bar </a>"
		);		 
		
	}
	
	function EventHandlers() {
		$('#mmc-graphs-switch-line').click(function () {
			if(!$(this).hasClass( "mmc-graphs-active" )) {
				MorrisMultiCharts.SwitchToLineGraphs();
				RemoveAllActiveInButtons();
				$(this).addClass( "mmc-graphs-active" );
			}
		});
		$('#mmc-graphs-switch-area').click(function () {
			if(!$(this).hasClass( "mmc-graphs-active" )) {
				MorrisMultiCharts.SwitchToAreaGraphs();
				RemoveAllActiveInButtons();
				$(this).addClass( "mmc-graphs-active" );
			}
		});
		$('#mmc-graphs-switch-bar').click(function () {
			if(!$(this).hasClass( "mmc-graphs-active" )) {
				MorrisMultiCharts.SwitchToBarGraphs();
				RemoveAllActiveInButtons();
				$(this).addClass( "mmc-graphs-active" );
			}
		});
	}
	
	function RemoveAllActiveInButtons() {
		$('#mmc-graphs-switch-line').removeClass( "mmc-graphs-active" );
		$('#mmc-graphs-switch-area').removeClass( "mmc-graphs-active" );
		$('#mmc-graphs-switch-bar').removeClass( "mmc-graphs-active" );
	}
	
	function IsErrorFree(options) {
		if(typeof options === 'undefined' || !options) {
			console.log("options cannot be null.");
			return false;
		}
		if (typeof options.element !== 'undefined' && options.element || 
			typeof options.data !== 'undefined' && options.data   || 
			typeof options.xkey !== 'undefined' && options.xkey || 
			typeof options.ykeys !== 'undefined' && options.ykeys) {
			return true;
		}
		console.log("One of the required elements is null.");
		return false;
	}
	
}();
