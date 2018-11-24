function setup() {
    loadJSON("js/dataset.json", getData);
   
}

function gotData(data) {
    var weatherForecast = JSON.parse(data);
    document.getElementById("demo").innerHTML = weatherForecast.location;
}
