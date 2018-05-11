'use strict';

angular.module('myApp.liveTable', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/liveTable', {
    templateUrl: 'liveTable/liveTable.html',
    controller: 'liveTableController'
  });
}])

.controller('liveTableController', ['$scope','$http','$interval',function($scope,$http,$interval) {

	$scope.dataArray = [];
	var tableData = function(){

		$http.get('https://api.coinmarketcap.com/v2/ticker/?limit=10')
		.then(function successCallback(response){
		$scope.result = response.data;
		$scope.dataArray = $scope.result.data;
		$scope.currentTime = Date();
		}),
		function errorCallback(response) {
			console.log(response.data)};
		
	}
	
	tableData();
	$interval(tableData,30000);
}]);