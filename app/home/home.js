'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'homeController'
  });
}])

.controller('homeController', ['$scope','$http',function($scope,$http) {
	$scope.message = "welcome to home";
	console.log($scope.message);
	$scope.findItems = function(){
		console.log("You searched for " + $scope.searchField);
	};
	$http.get('../test.html')
	.then(function(response){
		$scope.data = response.data;
		console.log($scope.data);
	}),
	function(response) {
		console.log("page is invalid")};
}]);