app.controller('HomeController', [ '$scope', '$http', function ($scope, $http) {

    $scope.days = null;

    $scope.showForecast = false;

    $scope.validate = function (res) {
        if (res.cod == "200") {
            setDays(res);
        }
        else {
            alert("invalid");
        }
    }

    /*
     Does an http get to grab the JSON weather data from openweathermap.
     */
    $scope.getForecast = function () {
        var splitString = $scope.location.split(",");
        var city = splitString[0];
        var state = splitString[1];
        $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + ',' + state + '&units=imperial&cnt=5').success($scope.validate);
    }

    /*
     Sets the information for each day's forecast.
     */
    function setDays(forecast) {
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        var days = new Array();
        var list = forecast.list;

        for (var i = 0; i < list.length; i++) {
            var d = new Date(list[i].dt * 1000);
            days[i] = {icon: getIcon(list[i].weather[0].icon),
                day: weekday[d.getDay()],
                high: Math.round(list[i].temp.max),
                low: Math.round(list[i].temp.min),
                precipitation: list[i].weather[0].description,
                cond: list[i].weather[0].main,
                forecast: "This morning it will be " + Math.round(list[i].temp.morn) +
                    ", and will transition to " + Math.round(list[i].temp.day) +
                    ", later in the day. Temperatures in the evening will be around " +
                    Math.round(list[i].temp.eve) + ", and will transition to " +
                    Math.round(list[i].temp.night) + " as we get later into the night. " +
                    "The high for the day will be " + Math.round(list[i].temp.max) +
                    ", and the low will be " + Math.round(list[i].temp.min) + "."};
        }
        $scope.days = days;
    }

    /*
     Determines the weather icon to use based on the icon code provided.
     */
    function getIcon(icon) {
        if (icon == "01d") {
            return "wi-day-sunny";
        }
        else if (icon == "02d") {
            return "wi-day-cloudy"
        }
        else if (icon == "03d") {
            return "wi-cloud"
        }
        else if (icon == "04d") {
            return "wi-cloudy";
        }
        else if (icon == "09d") {
            return "wi-rain";
        }
        else if (icon == "10d") {
            return "wi-day-rain";
        }
        else if (icon == "11d") {
            return "wi-thunderstorm";
        }
        else if (icon == "13d") {
            return "wi-snow";
        }
        else if (icon == "50d") {
            return "wi-fog";
        }
        else if (icon == "01n") {
            return "wi-night-clear"
        }
        else if (icon == "02n") {
            return "wi-night-cloudy"
        }
        else if (icon == "03n") {
            return "wi-cloud"
        }
        else if (icon == "04n") {
            return "wi-cloudy";
        }
        else if (icon == "09n") {
            return "wi-rain";
        }
        else if (icon == "10n") {
            return "wi-night-rain";
        }
        else if (icon == "11n") {
            return "wi-thunderstorm";
        }
        else if (icon == "13n") {
            return "wi-snow";
        }
        else if (icon == "50n") {
            return "wi-fog";
        }
    }

}]);