/**
 * Created by maxim on 07.07.2016.
 */

$(document).ready(function () {

    const WEATHER_APP_KEY = '51e580c83a42e14ac0a593f7ae0814e9';

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
    });

    function getTemp() {
        var weatherApi = "http://api.openweathermap.org/data/2.5/weather";
        var data = {
            lat : '55.7522',
            lon : '37.6156',
            units: 'metric',
            appid : '51e580c83a42e14ac0a593f7ae0814e9'
        };
        $.getJSON(weatherApi, data, function(data) {
            console.log(data.main.temp);
            $('#temp').text(Math.round(data.main.temp));
        })
    }

    getTemp();
});