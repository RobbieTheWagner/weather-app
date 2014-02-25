var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
    .config(function ($routeProvider, $locationProvider, $provide) {
        $routeProvider.when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    });