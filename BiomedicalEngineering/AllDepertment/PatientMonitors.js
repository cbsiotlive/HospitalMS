
// ------------------------side ber----------------------------------
const mobileScreen = window.matchMedia("(max-width: 990px )");
$(document).ready(function () {
    $(".dashboard-nav-dropdown-toggle").click(function () {
        $(this).closest(".dashboard-nav-dropdown")
            .toggleClass("show")
            .find(".dashboard-nav-dropdown")
            .removeClass("show");
        $(this).parent()
            .siblings()
            .removeClass("show");
    });
    $(".menu-toggle").click(function () {
        if (mobileScreen.matches) {
            $(".dashboard-nav").toggleClass("mobile-show");
        } else {
            $(".dashboard").toggleClass("dashboard-compact");
        }
    });
});


$(document).ready(function () {
    $(".dashboard-nav-item").click(function () {
        // Remove the "active" class from all items
        $(".dashboard-nav-item").removeClass("active");

        // Add the "active" class to the clicked item
        $(this).addClass("active");
    });
});
// ------------------------side ber End----------------------------------
/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// Themes begin
// am4core.useTheme(am4themes_spiritedaway);
am4core.useTheme(am4themes_animated);
// Themes end



// Create chart instance
var chart = am4core.create("chartdiv", am4charts.RadarChart);

// Add data
chart.data = [{
  "category": "",
  "value": 80,
  // "value1": 40,
  "full":100
},];

// Make chart not full circle
chart.startAngle = 0;
chart.endAngle = 360;
chart.innerRadius = am4core.percent(80);

// Set number format
chart.numberFormatter.numberFormat = "";

// Create axes
var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "category";
// categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.grid.template.strokeOpacity = 0;
// chart.addChartCursor(chartCursor);
// chartCursor.enabled=false;
// categoryAxis.renderer.labels.template.adapter.add("text", function(text,dataItem, target) {
//   return ">>> " + text + " <<<";
// });
// categoryAxis.renderer.labels.template.horizontalCenter = "left";
// categoryAxis.renderer.labels.template.fontWeight = 500;
// categoryAxis.renderer.labels.template.adapter.add("fill", function(fill, target) {
//   return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
//  {
//   return ">>> " + text + " <<<";
// });
// var chartCursor = new AmCharts.ChartCursor();           


categoryAxis.renderer.minGridDistance = 100;

var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.grid.template.strokeOpacity = 0;
valueAxis.min = 0;
valueAxis.max = 100;
categoryAxis.renderer.grid.push(new am4charts.Grid()).disabled = true;
valueAxis.renderer.grid.push(new am4charts.Grid()).disabled = true;
// valueAxis.strictMinMax = false;

// Create series
var series1 = chart.series.push(new am4charts.RadarColumnSeries());
series1.dataFields.valueX = "full";
series1.dataFields.categoryY = "category";
series1.clustered = false;
series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
series1.columns.template.fillOpacity = 0.08;
series1.columns.template.cornerRadiusTopLeft = 100;
series1.columns.template.strokeWidth = 0;
series1.columns.template.radarColumn.cornerRadius = 100;

// chart.innerRadius = 100;
var label = chart.seriesContainer.createChild(am4core.Label);
label.text = "98";
label.horizontalCenter = "middle";
label.verticalCenter = "middle";
label.fontSize = 20;
// label.renderer.labels.template.rotation = 90;

var series2 = chart.series.push(new am4charts.RadarColumnSeries());
series2.dataFields.valueX = "value";
series2.dataFields.categoryY = "category";
series2.clustered = false;
series2.columns.template.strokeWidth = 0;
series2.columns.template.radarColumn.cornerRadius = 100;


var series3 = chart.series.push(new am4charts.RadarColumnSeries());
series3.dataFields.valueX = "value1";
series3.dataFields.categoryY = "category";
series3.clustered = false;
series3.columns.template.strokeWidth = 0;
series3.columns.template.radarColumn.cornerRadius = 0;


// Add cursor
chart = new am4charts
chart.cursor.lineY.strokeOpacity = 0;
chart.cursor.linex.strokeOpacity = 0;
chart.cursor.lineX.strokeOpacity = 0;


