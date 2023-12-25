$(document).ready(function () {
    // Fetch data from device.json using AJAX
    $.getJSON("device.json", function (data) {
        if (!data || data.length === 0) {
            console.error("No data found in device.json");
            return;
        }
        // Loop through the data and create cards for each device
        $.each(data, function (index, device) {
            var cardHtml = `
                <!-- ... (unchanged) ... -->

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
                                <div id="chartdiv_${index}"></div>
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

            // Call lineChart for each index after creating the cards
            lineChart(index, device.weekly_value); // Pass the weekly_value data
        });
    });
});

function togglePopup(index) {
    var popup = document.getElementById(`popup_${index}`);
    popup.style.display = popup.style.display === 'none' ? 'block' : 'none';
}

function lineChart(index, weeklyData) {
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create(`chartdiv_${index}`, am4charts.XYChart);
    
    // Check if weeklyData is defined
    if (weeklyData) {
        // Add data
        chart.data = [
            { "dayData": "Su", "value": weeklyData.su },
            { "dayData": "Mo", "value": weeklyData.mo },
            { "dayData": "Tu", "value": weeklyData.tu },
            { "dayData": "We", "value": weeklyData.we },
            { "dayData": "Th", "value": weeklyData.th },
            { "dayData": "Fr", "value": weeklyData.fr },
            { "dayData": "Sa", "value": weeklyData.sa }
        ];

        // Rest of your chart code remains unchanged
        // ...

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
    } else {
        console.error(`Weekly data is undefined for index ${index}`);
    }
}