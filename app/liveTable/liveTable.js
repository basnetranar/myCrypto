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
	$scope.searchedData = "";
	$scope.updatedDataArray = [];
	
	var tableData = function(){

		$http.get('https://api.coinmarketcap.com/v2/ticker/?limit=50')
		.then(function successCallback(response){

//save datas in order of name, price, volume 24 hour traded, percent change in 1 hour, percent change in 24 hr, percent change in 7day

		$scope.result = (response.data);
		$scope.dataArray = [];

		for(var datas in $scope.result.data){
			var tempDataArray = [];
			tempDataArray.push($scope.result.data[datas].name);
			tempDataArray.push($scope.result.data[datas].quotes.USD.price);
			tempDataArray.push($scope.result.data[datas].quotes.USD.volume_24h);
			tempDataArray.push($scope.result.data[datas].quotes.USD.percent_change_1h);
			tempDataArray.push($scope.result.data[datas].quotes.USD.percent_change_24h);
			tempDataArray.push($scope.result.data[datas].quotes.USD.percent_change_7d);

			$scope.dataArray.push(tempDataArray);
		};
		updateTableData();
		$scope.currentTime = Date();

		}),
		function errorCallback(response) {
			console.log(response.data)};
		
	};
	
	tableData();
	$interval(tableData,30000);

	var updateTableData = function () {

		$scope.updatedDataArray = [];
		if($scope.searchedData!=""){

			for(var datas in $scope.dataArray){
				var tempDataArray = [];
				var tempSearchInput = "";
				($scope.searchedData.length === 1)? tempSearchInput = $scope.searchedData.charAt(0).toUpperCase() : tempSearchInput = $scope.searchedData.charAt(0).toUpperCase() + $scope.searchedData.slice(1);
					
					if($scope.dataArray[datas][0].startsWith(tempSearchInput)){
						tempDataArray.push($scope.dataArray[datas][0]);
						tempDataArray.push($scope.dataArray[datas][1]);
						tempDataArray.push($scope.dataArray[datas][2]);
						tempDataArray.push($scope.dataArray[datas][3]);
						tempDataArray.push($scope.dataArray[datas][4]);
						tempDataArray.push($scope.dataArray[datas][5]);

						$scope.updatedDataArray.push(tempDataArray);
					};
			};
			
		}
		else{
			$scope.updatedDataArray = $scope.dataArray.slice();
		}
	};
	updateTableData();
	$interval(updateTableData,1000);
}]);