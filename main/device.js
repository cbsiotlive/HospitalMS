$(document).ready(function () {
    // Fetch data from device.json using AJAX
    $.getJSON("device.json", function (data) {
        // Loop through the data and create cards for each device
        $.each(data, function (index, device) {
            var cardHtml = `
            <div class="card" style="position: relative; margin-left: 20px;" onclick="togglePopup(${index})">
    <img class="card-img-top" src="img/Screenshot 2023-12-23 160844.png" alt="Card image cap" height="300px" width="100px">
    <div class="card-img-overlay" style="color: white;">
        <div class="container">
            <div class="row">
                <div class="col-sm">
                    <button type="button" class="btn btn-lg bg-light">
                        <span style="color: black;">Current :</span>
                        <samp style="color: blue" id="current_${index}">${device.current}</samp>
                    </button>
                    <hr>
                    <button type="button" class="btn btn-lg bg-light">
                        <span style="color: black;">Voltage :</span>
                        <samp style="color: green;" id="voltage_${index}">${device.voltage}</samp>
                    </button>
                    <hr>
                    <button type="button" class="btn btn-lg bg-light">
                        <span style="color: black;">Power :</span>
                        <samp style="color: red;" id="power_${index}">${device.power}</samp>
                    </button>
                </div>
                <div class="col-sm">
                    <p class="h1"><b>No Of</b></p>
                    <p><span id="device_name_${index}">${device.device_name}</span> done today</p>
                    <h1><b id="no_of_total_${index}">${device.no_of_total}</b></h1>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="popup_${index}" class="modal" style="display: none;">
    <div class="modal-dialog">
        <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">Popup Title</h4>
                <button type="button" class="close" data-dismiss="modal" onclick="togglePopup(${index})">&times;</button>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <p>This is the popup content.</p>
                <div style="height: 100%; width: 100%;" id="chartdiv_${index}"></div>
            </div>

            <div class="modal-body">
                <p>This is the popup content.</p>
                <div style="height: 100%; width: 100%;" id="chartdivmunth_${index}"></div>
            </div>
            <!-- Modal Footer -->
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="togglePopup(${index})">Close</button>
            </div>

        </div>
    </div>
</div>


            `;
            // Append the card HTML to the container
            $("#deviceInfoContainer").append(cardHtml);
        });
    });
});


function togglePopup(index) {
    var popup = document.getElementById(`popup_${index}`);
    lineChart(index); // Pass the index to the lineChart function
    lineChart2(index);
    popup.style.display = popup.style.display === 'none' ? 'block' : 'none';
}

const lineChart = (index) => {
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create(`chartdiv_${index}`, am4charts.XYChart);

    // Add data
    chart.data = [{
        "dayData": "Su",
        "value": 2025
    }, {
        "dayData": "Mo",
        "value": 1882
    }, {
        "dayData": "Tu",
        "value": 1809
    }, {
        "dayData": "We",
        "value": 1322
    }, {
        "dayData": "Th",
        "value": 1122
    }, {
        "dayData": "Fr",
        "value": 1114
    }, {
        "dayData": "Sa",
        "value": 984
    }];

    // Create axes

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "dayData";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
        if (target.dataItem && target.dataItem.index & 2 == 2) {
            return dy + 25;
        }
        return dy;
    });

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "dayData";
    series.name = "value";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
    
};




const lineChart2 = (index) => {
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create(`chartdivmunth_${index}`, am4charts.XYChart);

    // Add data
    chart.data = [{
        "monthlyData": "Jan",
        "value": 2025
    }, {
        "monthlyData": "Feb",
        "value": 1882
    }, {
        "monthlyData": "Mar",
        "value": 1809
    }, {
        "monthlyData": "Apl",
        "value": 1322
    }, {
        "monthlyData": "May",
        "value": 1122
    }, {
        "monthlyData": "Jun",
        "value": 1114
    }, {
        "monthlyData": "Jul",
        "value": 984
    }, {
        "monthlyData": "Aug",
        "value": 1809
    }, {
        "monthlyData": "Sept",
        "value": 1322
    }, {
        "monthlyData": "Oct",
        "value": 1122
    }, {
        "monthlyData": "Nov",
        "value": 1114
    }, {
        "monthlyData": "Dec",
        "value": 984
    }];

    // Create axes

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "monthlyData";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
        if (target.dataItem && target.dataItem.index & 2 == 2) {
            return dy + 25;
        }
        return dy;
    });

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "monthlyData";
    series.name = "value";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
    
};