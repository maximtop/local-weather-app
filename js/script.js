/**
 * Created by maxim on 07.07.2016.
 */

const WEATHER_APP_KEY = "51e580c83a42e14ac0a593f7ae0814e9";

$(document).ready(function () {


    function dataByIp() {
        return $.getJSON("http://ipinfo.io");
    }

    dataByIp().done(function (ipData) {
        $('#location').text(ipData.city + ', ' + ipData.country);
        var location = ipData.loc;
        var locationArray = location.split(',');
        var cityLat = locationArray[0];
        var cityLon = locationArray[1];

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
            var data = {
                lat: cityLat,
                lon: cityLon,
                units: tempUnits,
                lang: 'en',
                appid: WEATHER_APP_KEY
            };

            $.getJSON(weatherApi, data, function (data) {
                var prefix = 'wi wi-';
                var code = data.weather[0].id;
                var icon = weatherIcons[code].icon;
                if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
                    icon = 'day-' + icon;
                }
                icon = prefix + icon;
                $("#weather-icon").addClass(icon);
                $('#description').text(data.weather[0].description);
                $('#temp').text(Math.round(data.main.temp));
            })

        }

        getTemp(tempUnits);

    });

});
