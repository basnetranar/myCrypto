'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'loginController'
  });
}])

.controller('loginController', ['$scope',function($scope) {
	$scope.message = "welcome to login";
	$scope.passwordType = "password";
	console.log($scope.message);

	$scope.displayPassword = function(){

		if($scope.passwordType == "text"){
			$scope.passwordType = "password";
		}

		else{
			$scope.passwordType = "text";
		}
	};

	$scope.rememberUser = function(){
		console.log(" this rememberUser fucntion is yet to be implemented");
	};
}]);