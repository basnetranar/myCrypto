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
	
	var tableData = function(){

		$http.get('https://api.coinmarketcap.com/v2/ticker/?limit=50')
		.then(function successCallback(response){

//save datas in order of name, price, volume 24 hour traded, percent change in 1 hour, percent change in 24 hr, percent change in 7day

		$scope.result = (response.data);
		$scope.dataArray = [];

		if($scope.searchedData==""){
			//console.log("empty string");

			for(var datas in $scope.result.data){
				var tempDataArray = [];
				//console.log($scope.result.data[datas].name);
				tempDataArray.push($scope.result.data[datas].name);
				tempDataArray.push($scope.result.data[datas].quotes.USD.price);
				tempDataArray.push($scope.result.data[datas].quotes.USD.volume_24h);
				tempDataArray.push($scope.result.data[datas].quotes.USD.percent_change_1h);
				tempDataArray.push($scope.result.data[datas].quotes.USD.percent_change_24h);
				tempDataArray.push($scope.result.data[datas].quotes.USD.percent_change_7d);

				$scope.dataArray.push(tempDataArray);
		}}
		else{
			//console.log($scope.searchedData);
			for(var datas in $scope.result.data){
				
				var tempDataArray = [];
				var tempSearchInput = "";
				($scope.searchedData.length === 1)? tempSearchInput = $scope.searchedData.charAt(0).toUpperCase() : tempSearchInput = $scope.searchedData.charAt(0).toUpperCase() + $scope.searchedData.slice(1);
					//console.log(tempSearchInput);
					if($scope.result.data[datas].name.startsWith(tempSearchInput)){
						tempDataArray.push($scope.result.data[datas].name);
						tempDataArray.push($scope.result.data[datas].quotes.USD.price);
						tempDataArray.push($scope.result.data[datas].quotes.USD.volume_24h);
						tempDataArray.push($scope.result.data[datas].quotes.USD.percent_change_1h);
						tempDataArray.push($scope.result.data[datas].quotes.USD.percent_change_24h);
						tempDataArray.push($scope.result.data[datas].quotes.USD.percent_change_7d);

						$scope.dataArray.push(tempDataArray);
						//console.log($scope.dataArray);
					};
		};
			// console.log('dataArray ready');
			// console.log($scope.dataArray);
			
		};

		// if($scope.searchedData !="")
		// {
		// 	for(var i=0;i<$scope.dataArray.length;i++){
		// 		if($scope.searchedData.length == 1){
		// 			if(!$scope.dataArray[i][0].startsWith($scope.searchedData.charAt(0).toUpperCase())){
		// 				$scope.dataArray.splice(i,1);
		// 				i--;
		// 				console.log($scope.dataArray);
		// 			}
		// 		}
		// 	}
	
		
		// };
		// $scope.getSearchData();

		$scope.currentTime = Date();

		}),
		function errorCallback(response) {
			console.log(response.data)};
		
	}
	
	tableData();
	$interval(tableData,30000);
}]);