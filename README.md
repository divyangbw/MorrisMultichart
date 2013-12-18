MorrisMultichart
================

An extension for Morris charts, allowing users to display multiple charts from the same data source.


Example
-------

To see and example, please go to: [http://divyangbw.github.io/MorrisMultichart/](http://divyangbw.github.io/MorrisMultichart/)

Pre-requirements
----------------

1. JQuery. Tested with 1.9, older version might work.
2. Morris.js

Structure
---------

```html
CSS
<!--Morris required stylesheet (Local or CDN)-->
<link rel="stylesheet" href="http://cdn.oesmith.co.uk/morris-0.4.3.min.css">

<!--Multicharts required stylesheet (src)-->
<link rel="stylesheet" href="./src/MorrisMultiCharts.css">

JS
<!--Morris required javascript (Local or CDN)-->
<script src="http://cdn.oesmith.co.uk/morris-0.4.3.min.js"></script>

<!--Multicharts required javascript (src)-->
<script src="./src/MorrisMultiCharts.js"></script>

```

Basic Usage
-----------

This plugin is based of Morris.js: [http://www.oesmith.co.uk/morris.js/] (http://www.oesmith.co.uk/morris.js/). There are 3 types fo supported charts:
* Line Graphs
* Area Graphs
* Bar Graphs

Pie charts are not supported since the data structure is different. If you need to use pie charts, simply use Morris.js straight. 

```js
// To get all data options, see Morris.js project page
var options = {
    element: 'example-chart',
    data: [
        { y: '2006', a: 100, b: 90 },
        { y: '2007', a: 75,  b: 65 },
        { y: '2008', a: 50,  b: 40 },
        { y: '2009', a: 75,  b: 65 },
        { y: '2010', a: 50,  b: 40 },
        { y: '2011', a: 75,  b: 65 },
        { y: '2012', a: 100, b: 90 }
    ],
    xkey: 'y',
    ykeys: ['a', 'b'],
    labels: ['Series A', 'Series B']
};

var exampleChartOne = MorrisMultiCharts;
exampleChartOne.InitializeGraphs(options);

// If you decide to use only one instance of the chart on the page, you can infact call multicharts like this:
MorrisMultiCharts.InitializeGraphs(options);

```