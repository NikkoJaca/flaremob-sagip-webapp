// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
// -- Area Chart Example
var ctx = document.getElementById("marikinaRiverLevelChart");
var marikinaRiverLevelChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["15:00", "16:00", "17:00", "18:00", "19:00"],
        datasets: [

            {
                label: "Marikina River Water Level",
                lineTension: 0.3,
                backgroundColor: "rgba(2,117,216,0.2)",
                borderColor: "rgba(2,117,216,1)",
                pointRadius: 5,
                pointBackgroundColor: "rgba(2,117,216,1)",
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(2,117,216,1)",
                pointHitRadius: 20,
                pointBorderWidth: 2,
                data: [10, 12, 13],
            },

            {
                label: "Predicted Water Level",
                lineTension: 0.3,
                backgroundColor: "rgba(153, 255, 0, 0.2)",
                borderColor: "rgba(68, 114, 0.2)",
                pointRadius: 5,
                pointBackgroundColor: "rgba(2,117,216,1)",
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(2,117,216,1)",
                pointHitRadius: 20,
                pointBorderWidth: 2,
                data: [12, 13, 14, 16, 17],
                borderDash: [10, 5]
            }
        ],
    },
    options: {
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "Hour (HH:mm)"
                },
                time: {
                    unit: 'date'
                },
                gridLines: {
                    display: false
                },
                ticks: {
                    maxTicksLimit: 7
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "Meters (m)"
                },
                ticks: {
                    min: 0,
                    max: 25,
                    maxTicksLimit: 8
                },
                gridLines: {
                    color: "rgba(0, 0, 0, .125)",
                }
            }],
        },
        legend: {
            display: true
        }
    }
});

$('#btn-mod-chart').click(function () {
    // marikinaRiverLevelChart.data.datasets[1].data[5] = 21;
    // marikinaRiverLevelChart.update();
    addData(marikinaRiverLevelChart, "20:00", 19);
    $.titleAlert("New alert!", {
        requireBlur: false,
        stopOnFocus: false,
        duration: 4000,
        interval: 700
    });
});

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
    document.getElementById('alert-water-level').style.display = 'block';
    document.getElementById('alerts-unread-badge').style.display = 'inline-block';
    document.getElementById('alerts-new').style.display = 'block';
    document.getElementById('alerts-none').style.display = 'none';
    document.getElementById('alerts-new-drrmo').style.display = 'block';
    $('#alert-unread-sound').get(0).play();
}