var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
    .config(function ($routeProvider, $locationProvider, $provide) {
        $routeProvider.when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    });

/*app.factory('currentUser', ['$http', function ($http) {
    return {
        username: function (callback) {
            $http.get('/currentuser').success(function (response) {
                callback(response);
            })
                .error(function (error) {
                    alert("Something blew up!");
                });
        }
    };
}]);*/