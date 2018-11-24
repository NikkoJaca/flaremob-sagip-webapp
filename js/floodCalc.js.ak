//initialize data object
var timeFramesChart = ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"];
var timeFramesChart2 = new Array();
var timeFrames = ["0", "3", "6", "9", "12", "15", "18", "21"];
var rainPerDayArray = new Array();
var rainPerHour = 0.000;
var rainPer3Hour = 0.000;
var rainPerDay = 0.000;
var maxFloodDischarge3hr = 0.000;
var maxFloodDischarge1hr = 0.000;
var severityCondition;
var timeStamp = DateTimeNow(9);
var timeStamp2 = new Date().toISOString().substr(0, 19).replace('T', ' ');
var waterLevel;
var waterLevel1hr;

function forecastSelector() {
    //initialize date method
    var d = new Date();

    //timeframes for the 3-hour weather forecast


    var currentHour = d.getHours();
    var getDoubleDigitMonth = ("0" + (d.getMonth() + 1)).slice(-2);
    var getDoubleDigitDay = ("0" + d.getDate()).slice(-2);
    var currentYearMonthDay = d.getFullYear() + "-" + getDoubleDigitMonth + "-" + getDoubleDigitDay;

    //selector for the forecast range relative to the current date and time
    var forecastDateSelector = "";
    if (currentHour >= 0 && currentHour < 3) {
        forecastDateSelector = currentYearMonthDay + " " + "00:00:00";
    } else if (currentHour >= 3 && currentHour < 6) {
        forecastDateSelector = currentYearMonthDay + " " + "03:00:00";
    } else if (currentHour >= 6 && currentHour < 9) {
        forecastDateSelector = currentYearMonthDay + " " + "06:00:00";
    } else if (currentHour >= 9 && currentHour < 12) {
        forecastDateSelector = currentYearMonthDay + " " + "09:00:00";
    } else if (currentHour >= 12 && currentHour < 15) {
        forecastDateSelector = currentYearMonthDay + " " + "12:00:00";
    } else if (currentHour >= 15 && currentHour < 18) {
        forecastDateSelector = currentYearMonthDay + " " + "15:00:00";
    } else if (currentHour >= 18 && currentHour < 21) {
        forecastDateSelector = currentYearMonthDay + " " + "18:00:00";
    } else if (currentHour >= 21) {
        forecastDateSelector = currentYearMonthDay + " " + "21:00:00";
    } else {
        alert('There is something wrong with the dates!!!');
        console.log(forecastDateSelector);
    }

    // alert('' + forecastDateSelector);
    return forecastDateSelector;
}


//call the dataset of forecast and iterate through it with respect to current time and available time frame of the forecast
$(document).ready(function () {


    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/forecast?id=1692193&appid=59bddecf4406a9fc2c47eb776e574a20&units=metric',
        // url: 'http://api.openweathermap.org/data/2.5/forecast?lat=14.638&lon=121.03&appid=59bddecf4406a9fc2c47eb776e574a20&units=metric',
        // url: 'http://api.openweathermap.org/data/2.5/forecast?lat=14.6734&lon=121.1087&id=1692193&appid=59bddecf4406a9fc2c47eb776e574a20&units=metric',
        // url: 'http://api.openweathermap.org/data/2.5/forecast?lat=11.4128&lon=123.0708&id=1692193&appid=59bddecf4406a9fc2c47eb776e574a20&units=metric',
        type: "GET",
        dataType: "jsonp",
        success: function (data) {
            var arrLength = data.list.length;

            var dateSelector = forecastSelector();
            var accumulatedRainDay = 0;

            var currentDate = new Date().getDate();
            var currentHours = new Date().getHours();

            //iteration for building the time frames for the day
            var k;
            for (k = 0; k < arrLength; k++) {
                var jsonDate = new Date(data.list[k].dt_txt).getDate();
                if (currentDate == jsonDate) {
                    if (new Date(data.list[k].dt_txt).getHours() != undefined) {
                        timeFramesChart2.push(new Date(data.list[k].dt_txt).getHours() + ":00");
                    }
                }
            }

            //iteration for the whole json file
            var i;
            for (i = 0; i < arrLength; i++) {
                //sum rain of accumulation
                //get the date from the json file
                var jsonRain = 0;
                try {
                    jsonRain = data.list[i].rain['3h'];
                } catch (dataError) {
                    jsonRain = 0;
                }

                var jsonDate = new Date(data.list[i].dt_txt).getDate();
                if (currentDate == jsonDate) {
                    if (jsonRain != null) {
                        accumulatedRainDay = accumulatedRainDay + jsonRain;

                        rainPerDayArray.push(jsonRain);
                        console.log('rainPerDayArray ' + rainPerDayArray[i]);
                        console.log('timeFramesChart2: ' + timeFramesChart2[i]);
                    } else {
                        rainPerDayArray.push(0.000);
                    }

                    //forecast data selector for the current date only
                }
                if (dateSelector == data.list[i].dt_txt) {
                    var weatherForecastForToday = data.list[i].weather[0].description;
                    console.log('Time of calculation: ' + data.list[i].dt_txt);
                    console.log('Weather description: ' + data.list[i].weather[0].description);
                    if (jsonRain == null) {
                        rainPerHour = 0.000;
                        rainPer3Hour = 0.000;
                        console.log('Rain volume for the next 3 hours: 0 mm');
                    } else {
                        rainPerHour = jsonRain / 3.000;
                        rainPer3Hour = jsonRain;
                        console.log('Rain volume for the next 3 hours: ' + jsonRain + ' mm');
                    }
                }
            }
            console.log(timeFramesChart2);
            console.log('Total forecasted rain accumulation within the day: ' + accumulatedRainDay + ' mm');
            var rainIntensityLineChart = echarts.init(document.getElementById('rainIntensityLineChart'));
            var option = {
                title: {
                    text: ' '
                },
                tooltip: {},
                legend: {
                    data: ['Rain']
                },
                xAxis: {
                    name: 'Time (HH:mm)',
                    data: timeFramesChart2
                },
                yAxis: {
                    name: 'Rainfall Volume (mm/hr)'
                },
                series: [{
                    name: 'Rain',
                    type: 'line',
                    data: rainPerDayArray
                }]
            };

            rainIntensityLineChart.setOption(option);

            maxFloodDischarge3hr = Math.round(((0.53 * rainPer3Hour * 635) / (3.6) * 100)) / 100;
            maxFloodDischarge1hr = Math.round(((0.53 * rainPerHour * 635) / (3.6) * 100)) / 100;

            //water level using the rating curve of sto. nino monitoring station
            // waterLevel = Math.round(Math.pow(0.0003*maxFloodDischarge, 1.122)*100)/100;
            // 1.499 * maxFloodDischarge!!! <-- original
            //ADJUSTED:
            waterLevel = (Math.round(Math.pow((0.110 * maxFloodDischarge3hr), 0.3083) * 100) / 100) + 12;
            waterLevel1hr = (Math.round(Math.pow((0.110 * maxFloodDischarge1hr), 0.3083) * 100) / 100) + 12;

            severityCondition = checkSeverity(waterLevel);
            floodMsgControl(severityCondition);
            writeDataToFirebaseTblPosts(timeStamp, severityCondition, waterLevel);


            console.log("Max flood discharge:" + maxFloodDischarge3hr);

            document.getElementById("riverLevel3hr").innerHTML = waterLevel;
            document.getElementById("riverLevel1hr").innerHTML = waterLevel1hr;
            document.getElementById("maxDischargeLevel3hr").innerHTML = maxFloodDischarge3hr;
            document.getElementById("rainfallVolume").innerHTML = Math.round(rainPer3Hour * 100) / 100;
            document.getElementById("weatherForecast").innerHTML = weatherForecastForToday;
        }
    })

})

function checkSeverity(waterLevel) {
    if (waterLevel < 15) {
        return "normal";
    } else if (waterLevel >= 15 && waterLevel < 17) {
        return "medium";
    } else if (waterLevel >= 17) {
        return "critical"
    } else {
        return "There's something wrong with severity check...";
    }
}

function floodMsgControl(severityCondition) {
    if (severityCondition == "normal") {
        document.getElementById("floodCritical").style.display = 'none';
        document.getElementById("floodMedium").style.display = 'none';
        document.getElementById("floodNormal").style.display = 'block';
        document.getElementById("floodConditionTxt").innerHTML = severityCondition;
    } else if (severityCondition == "medium") {
        document.getElementById("floodCritical").style.display = 'none';
        document.getElementById("floodMedium").style.display = 'block';
        document.getElementById("floodNormal").style.display = 'none';
        document.getElementById("floodConditionTxt").innerHTML = severityCondition;
    } else if (severityCondition == "critical") {
        document.getElementById("floodCritical").style.display = 'block';
        document.getElementById("floodMedium").style.display = 'none';
        document.getElementById("floodNormal").style.display = 'none';
        document.getElementById("floodConditionTxt").innerHTML = severityCondition;
    } else {
        console.log('There is something wrong with floodMsgControl...');
    }
}

//gino's datetime format
function DateTimeNow(Zero29) {
    var datetoday = new Date();
    var year = datetoday.getFullYear(); // 0
    var mon = datetoday.getMonth() + 1; // 1
    var dayno = datetoday.getDate(); // 2
    var hour = datetoday.getHours(); // 3
    var min = datetoday.getMinutes(); // 4
    var sec = datetoday.getSeconds(); // to be used in option 8
    var milsec = datetoday.getMilliseconds();

    if (mon < 10) {
        mon = '0' + String(mon);
    }
    if (dayno < 10) {
        dayno = '0' + String(dayno);
    }
    if (hour < 10) {
        hour = '0' + String(hour);
    }
    if (min < 10) {
        min = '0' + String(min);
    }
    if (sec < 10) {
        sec = '0' + String(sec);
    }
    if (milsec < 10) {
        milsec = '00' + String(milsec);
    } else if (milsec < 100) {
        milsec = '0' + String(milsec);
    }

    var date = String(year + '-' + mon + '-' + dayno); // 5
    var YearMon = String(year + '-' + mon); // 6
    var time = String(hour + ':' + min); // 7
    var ISDateTime = String(date + ' ' + time + ':' + sec);
    var AutoID = String(mon + '/' + dayno + '/' + year + ' ' + hour + ':' + min);

    if (Zero29 == 0) {
        return year;
    } else if (Zero29 == 1) {
        return mon;
    } else if (Zero29 == 2) {
        return dayno;
    } else if (Zero29 == 3) {
        return hour;
    } else if (Zero29 == 4) {
        return min;
    } else if (Zero29 == 5) {
        return date; //returns YYYY-MM-DD
    } else if (Zero29 == 6) {
        return YearMon; //returns YYYY-MM
    } else if (Zero29 == 7) {
        return time; //returns hh:mm
    } else if (Zero29 == 8) {
        return ISDateTime; //returns YYYY-MM-DD hh:mm:ss
    } else if (Zero29 == 9) {
        return AutoID; //returns YYYYMMDDhhmmssiii <-- i changed it hehe
    } else {
        return date + ' ' + time;
    } //returns YYYY-MM-DD hh:mm
}

function writeDataToFirebaseTblPosts(timeStamp, severityCondition, waterLevel) {
    if (severityCondition == "medium") {
        firebase.database().ref('tblPosts/').push({
            postDate: timeStamp,
            postDesc: 'BABALA! Inaasahang lagpas tuhod na pag-baha at kalat-kalat na pag-ulan ay posibleng maranasan. Mga lugar na malapit sa Marikina River at iba pang ilog ay maaring makaranas ng mabilis na pag-baha. Humanda at pumunta sa pinakamalapit na evacuation center! Estimated river level: ' + waterLevel + 'm',
            postName: 'SAGIP Flood Alerts',
            postTitle: 'Flood Alert - Moderate Flooding'
        });
    } else if (severityCondition == "critical") {
        firebase.database().ref('tblPosts/').push({
            postDate: timeStamp,
            postDesc: 'ALERTO! Kritikal na lebel ng pagbabaha at malakas na pag-ulan ay posibleng maranasan. Iwasan ang mga daanan na kasalukuyang may lagpas tao na baha lalo na sa mga lugar na malapit sa Marikina River. Kaagarang lumikas sa pinakamalapit na evacuation center! Estimated river level: ' + waterLevel + 'm',
            postName: 'SAGIP Flood Alerts',
            postTitle: 'Flood Alert - Critical Flooding'
        });
    } else if (severityCondition == "normal") {
        console.log('Flood levels are normal!');
    } else {
        console.log('There is something wrong with Firebase push...');
    }
}

//manual send of warnings (modal view)
$('#btnManualSendCriticalWarning').on('click', function (event) {
    firebase.database().ref('tblPosts/').push({
        postDate: timeStamp,
        postDesc: 'ALERTO! Kritikal na lebel ng pagbabaha at malakas na pag-ulan ay posibleng maranasan. Kaagarang lumikas sa pinakamalapit na evacuation center!',
        postName: 'SAGIP Flood Alerts',
        postTitle: 'Flood Alert - Critical Flooding'
    });
});

$('#btnManualSendModerateWarning').on('click', function (event) {
    firebase.database().ref('tblPosts/').push({
        postDate: timeStamp,
        postDesc: 'BABALA! Inaasahang lagpas tuhod na pag-baha at kalat-kalat na pag-ulan ang posibleng maranasan. Humanda at pumunta sa pinakamalapit na evacuation center!',
        postName: 'SAGIP Flood Alerts',
        postTitle: 'Flood Alert - Moderate Flooding'
    });
});