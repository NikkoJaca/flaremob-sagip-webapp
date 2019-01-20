//this js file is used for every HTML document in the sagip web app except the flood html itself
//usage of this js should trigger the flood prediction even though the admin has navigated away from the flood HTML
//the nature of this js file should be the same with the floodCalc.js file
//formula used here should reflect the formula indicated in the floodCalc.js, as well as its approach!

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
var timeStamp2 = new Date().toISOString().substr(0, 19).replace('T', ' ');
var waterLevel;
var waterLevel1hr;
var weatherForecastForToday;
var constMaxDischargeMR = 78; //this is the daily maximum or peak discharge of marikina river. use this to achieve at least 12 meters of river level!

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
    if (severityCondition == "medium") {
        document.getElementById("floodCritical").style.display = 'none';
        document.getElementById("floodMedium").style.display = 'block';
    } else if (severityCondition == "critical") {
        document.getElementById("floodCritical").style.display = 'block';
        document.getElementById("floodMedium").style.display = 'none';
    } else {
        console.log('There is something wrong with floodMsgControl...');
    }
}

function refreshAt(hours, minutes, seconds) {
    var now = new Date();
    var then = new Date();

    if (now.getHours() > hours ||
        (now.getHours() == hours && now.getMinutes() > minutes) ||
        now.getHours() == hours && now.getMinutes() == minutes && now.getSeconds() >= seconds) {
        then.setDate(now.getDate() + 1);
    }
    then.setHours(hours);
    then.setMinutes(minutes);
    then.setSeconds(seconds);

    var timeout = (then.getTime() - now.getTime());
    setTimeout(function () {
        window.location.reload(true);
    }, timeout);
}

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

function writeDataToFirebaseTblPosts(severityCondition, waterLevel) {
    if (severityCondition == "medium") {
        firebase.database().ref('tblPosts/').push({
            postDate: getClock,
            postDesc: 'BABALA! Inaasahang lagpas tuhod na pag-baha at kalat-kalat na pag-ulan ay posibleng maranasan. ' +
                'Inaabiso ang mga residenteng nakatira malapit sa Marikina River na agarang lumikas: ' +
                '(Kabayani Rd., Balubad St., Millagros St., Buen-Mar Ave., Washington St., Moscow St., Mahogany St., Narra St., Kamagong St., Acacia St., Banaba St., Balimbing St., Kingston St., Rosal St., Bangkal St., Bignay St.) ' +
                'Humandang pumunta sa pinakamalapit na evacuation center! Estimated river level: ' + waterLevel + 'm',
            postName: 'Barangay Nangka Admin',
            postTitle: 'Flood Alert: Prepare Evacuation!'
        }).then(() => {
            firebase.database().ref('tblForecastReport/forecastLastReportDate').set(getClock, function (error) {
                if (error) {
                    console.log('Forecast report could not be overwritten! ' + error);
                } else {
                    console.log('Forecast has been sent, forecast report has been updated.');
                }
            });
        });
    } else if (severityCondition == "critical") {
        firebase.database().ref('tblPosts/').push({
            postDate: getClock,
            postDesc: 'ALERTO! Kritikal na lebel ng pagbabaha at malakas na pag-ulan ay posibleng maranasan. ' +
                'Inaabiso ang mga lahat residenteng nakatira sa flood-prone areas ay agarang lumikas na: ' +
                '(Kabayani Rd., Balubad St., Millagros St., Buen-Mar Ave., Washington St., Moscow St., Mahogany St., Narra St., Kamagong St., Acacia St., Banaba St., Balimbing St., Kingston St., Rosal St., Bangkal St., Bignay St., Dama de Noche St., Langka St., Manga St., Saint Claire St., Saint Martin St., Kingsway St. J.P. Rizal St.) ' +
                'Estimated river level: ' + waterLevel + 'm',
            postName: 'Barangay Nangka Admin',
            postTitle: 'Flood Alert: Forced Evacuation!'
        }).then(() => {
            firebase.database().ref('tblForecastReport/forecastLastReportDate').set(getClock, function (error) {
                if (error) {
                    console.log('Forecast report could not be overwritten! ' + error);
                } else {
                    console.log('Forecast has been sent, forecast report has been updated.');
                }
            });
        });
    } else if (severityCondition == "normal") {
        console.log('Flood levels are normal!');
    } else {
        console.log('There is something wrong with Firebase push...');
    }
}

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
                    weatherForecastForToday = data.list[i].weather[0].description;
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

            maxFloodDischarge3hr = Math.round(((0.53 * rainPer3Hour * 21.52) / (3.6) * 100)) / 100;
            maxFloodDischarge1hr = Math.round(((0.53 * rainPerHour * 21.52) / (3.6) * 100)) / 100;

            //water level using the rating curve of sto. nino monitoring station
            // waterLevel = Math.round(Math.pow(0.0003*maxFloodDischarge, 1.122)*100)/100;
            // 1.1499 * maxFloodDischarge!!! <-- original

            if (maxFloodDischarge3hr > constMaxDischargeMR) {
                waterLevel = (Math.round(Math.pow((1.1499 * maxFloodDischarge3hr), 0.3083) * 100) / 100) + 8;
                waterLevel1hr = (Math.round(Math.pow((1.1499 * maxFloodDischarge1hr), 0.3083) * 100) / 100) + 8;
            } else {
                waterLevel = (Math.round(Math.pow((1.1499 * constMaxDischargeMR), 0.3083) * 100) / 100) + 8;
                waterLevel1hr = (Math.round(Math.pow((1.1499 * constMaxDischargeMR), 0.3083) * 100) / 100) + 8;
            }

            severityCondition = checkSeverity(waterLevel);
            floodMsgControl(severityCondition);

            //get the forecast time selector and convert it into a date
            //the forecast time selector serves as point of reference for the refresh time
            //refresh time will be the forecast time selector plus 3 hours
            var getForecastSelector = new Date(forecastSelector());
            var currentSelectedHourForecast = getForecastSelector.getHours();
            var nextHourRefresh = currentSelectedHourForecast + 3

            //call the refresh function and pass the refresh time params
            //the refresh will be triggered based on the time param
            //i.e., refresh will be triggered at 21:00:00

            refreshAt(nextHourRefresh, 0, 0);

            //handler for automatic flood forecast send of notification
            //checks if the forecast reports have not been notified from the last 3 hours
            //otherwise will not fire
            //this is to prevent repetition of sending notifs
            firebase.database().ref().child('tblForecastReport').once('value', function (snapshot) {
                var firebaseLastForecastDate = "" + snapshot.child('forecastLastReportDate').val();
                var getAMPM = firebaseLastForecastDate.substr(17, 2);
                var currentAMPM = isAMPM;
                var get12HourForecastTime = firebaseLastForecastDate.substr(11, 2);
                var the24HourForecastTime;

                if (getAMPM == 'PM') {
                    the24HourForecastTime = parseInt(get12HourForecastTime) + 12;
                } else {
                    the24HourForecastTime = parseInt(get12HourForecastTime);
                }

                if (the24HourForecastTime < currentSelectedHourForecast) {
                    writeDataToFirebaseTblPosts(severityCondition, waterLevel);
                } else if (the24HourForecastTime > currentSelectedHourForecast && currentAMPM == 'AM') {
                    writeDataToFirebaseTblPosts(severityCondition, waterLevel);
                } else if (firebaseLastForecastDate == undefined) {
                    console.log('The last forecast report shows null/undefined!');
                } else {
                    console.log('The automatic flood alert has not been activated!');
                };
            });
        }
    })
})