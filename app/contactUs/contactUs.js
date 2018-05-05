'use strict';

angular.module('myApp.contactUs', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contactUs', {
    templateUrl: 'contactUs/contactUs.html',
    controller: 'contactUsController'
  });
}])

.controller('contactUsController', ['$scope',function($scope) {
	$scope.message = "welcome to contactUs";
	console.log($scope.message);
}]);