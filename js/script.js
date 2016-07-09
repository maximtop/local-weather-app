/**
 * Created by maxim on 07.07.2016.
 */

const WEATHER_APP_KEY = '51e580c83a42e14ac0a593f7ae0814e9'; 

$(document).ready(function () {


    function dataByIp() {
        return $.getJSON('http://ipinfo.io');
    }

    dataByIp().done(function (ipData) {
        $('#location').text(ipData.city + ', ' + ipData.country);
        var location = ipData.loc;
        var locationArray = location.split(',');
        var cityLat = locationArray[0];
        var cityLon = locationArray[1];
        console.log(cityLat, cityLon);

        var tempUnits = 'metric';
        var metrics = $("#metrics");

        metrics.click(function () {
            if (metrics.text() == "C") {
                tempUnits = "imperial";
                metrics.text("F");
            } else {
                tempUnits = "metric";
                metrics.text("C");
            }
            getTemp(tempUnits);
        });

        function getTemp(tempUnits) {

            var weatherApi = "http://api.openweathermap.org/data/2.5/weather";
            console.log(tempUnits);
            var data = {
                lat : cityLat,
                lon : cityLon,
                units: tempUnits,
                lang: 'ru',
                appid : WEATHER_APP_KEY
            };

            $.getJSON(weatherApi, data, function(data) {
                console.log(data);
                console.log(data.main.temp);
                console.log(data.weather[0].main);
                $('#description').text(data.weather[0].main);
                $('#temp').text(Math.round(data.main.temp));
            })
        }

        getTemp(tempUnits);

    });

    // function getTemp() {
    //     var weatherApi = "http://api.openweathermap.org/data/2.5/weather";
    //     var data = {
    //         lat : '55.7522',
    //         lon : '37.6156',
    //         units: 'metric',
    //         appid : '51e580c83a42e14ac0a593f7ae0814e9'
    //     };
    //
    //     $.getJSON(weatherApi, data, function(data) {
    //         console.log(data.main.temp);
    //         $('#temp').text(Math.round(data.main.temp));
    //     })
    // }
    //
    // getTemp();
});