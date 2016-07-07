/**
 * Created by maxim on 07.07.2016.
 */

var key = '51e580c83a42e14ac0a593f7ae0814e9';

function getTemp(metrics) {
    
}

function dataByIp() {
    return $.getJSON('http://ipinfo.io');
}

$(document).ready(function () {
    dataByIp().done(function(ipData) {
        $('#location').text(ipData.city + ', ' + ipData.country);
    });
});