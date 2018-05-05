'use strict';

angular.module('myApp.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'registerController'
  });
}])

.controller('registerController', ['$scope',function($scope) {
	$scope.message = "welcome to register";
	console.log($scope.message);
}]);