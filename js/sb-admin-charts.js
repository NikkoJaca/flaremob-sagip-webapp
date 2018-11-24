// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
// -- Area Chart Example
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["15:00", "16:00", "17:00", "18:00", "19:00"],
    datasets: [{
      label: "Rain Density (mm/hr)",
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
      data: [50, 30, 25, 15, 10],
    }],
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
          labelString: "Milimmeters (mm)"
        },
        ticks: {
          min: 0,
          max: 90,
          maxTicksLimit: 5
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  }
});
// -- Bar Chart Example
var ctx = document.getElementById("myBarChart");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Arayat", "Bagong Silang", "Barcelona", "Del Carmen", "Italy", "J.P. Rizal", "Kamagong", "Langka", "Lower Balubad", "Monterey", "Moscow", "Paris"],
    datasets: [{
      label: "Flood Level (meters)",
      backgroundColor: "rgba(2,117,216,1)",
      borderColor: "rgba(2,117,216,1)",
      data: [0.9, 1.5, 0.7, 1.0, 1.0, 0.9, 0.5, 0.7, 0.5, 0.6, 0.8, 0.9, 0.8],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Areas"  
        },
        // time: {
        //   unit: 'month'
        // },
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Flood Level (meters)"
        },
        ticks: {
          min: 0,
          max: 2,
          maxTicksLimit: 5
        },
        gridLines: {
          display: true
        }
      }],
    },
    legend: {
      display: false
    }
  }
});
// -- Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ["Cloudy", "Heavy Rain", "Fog", "Clear Skies"],
    datasets: [{
      data: [8.21, 15.58, 9.25, 8.32],
      backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
    }],
  },
  options: {
    pieceLabel: {
      render: 'percentage',
      fontSize: 20,
      fontStyle: 'bold',
    }
  },  
});
