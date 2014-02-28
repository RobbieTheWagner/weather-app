app.controller('HomeController', [ '$scope', '$http', function ($scope, $http) {

    $scope.days = null;

    //Boolean to show the forecast or not.
    $scope.showForecast = false;

    //Boolean to show the alert for invalid input.
    $scope.showAlert = false;

    //Alert info
    $scope.alert = {type: 'danger', msg: 'Your input must be in the form of city,state.'};

    /*
     Alerts if the city or state are invalid.
     */
    $scope.validate = function (res) {
        if (res.cod == "200") {
            $scope.showAlert = false;
            setDays(res);
        }
        else {
            $scope.alert.msg = 'You entered an invalid city. Please try again.';
            $scope.showAlert = true;
        }
    }

    /*
     Does an http get to grab the JSON weather data from openweathermap.
     */
    $scope.getForecast = function () {
        var location = $scope.location;
        var re1 = '.*?,(\\s*)';
        var states='((?:(?:AL)|(?:AK)|(?:AS)|(?:AZ)|(?:AR)|(?:CA)|(?:CO)|(?:CT)|(?:DE)|(?:DC)|(?:FM)|(?:FL)|(?:GA)|(?:GU)|(?:HI)|(?:ID)|(?:IL)|(?:IN)|(?:IA)|(?:KS)|(?:KY)|(?:LA)|(?:ME)|(?:MH)|(?:MD)|(?:MA)|(?:MI)|(?:MN)|(?:MS)|(?:MO)|(?:MT)|(?:NE)|(?:NV)|(?:NH)|(?:NJ)|(?:NM)|(?:NY)|(?:NC)|(?:ND)|(?:MP)|(?:OH)|(?:OK)|(?:OR)|(?:PW)|(?:PA)|(?:PR)|(?:RI)|(?:SC)|(?:SD)|(?:TN)|(?:TX)|(?:UT)|(?:VT)|(?:VI)|(?:VA)|(?:WA)|(?:WV)|(?:WI)|(?:WY)))(?![a-z])';
        var regex = new RegExp(re1 + states,["i"]);
        if(location.match(regex))
        {
        var splitString = location.split(",");
            var city = splitString[0];
            var state = splitString[1];
            $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + ',' + state + '&units=imperial&cnt=5').success($scope.validate);
        }
        else {
            $scope.alert.msg = 'Your input must be in the form of city,XX and XX must be a valid two character state code.';
            $scope.showAlert = true;
        }
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