'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'homeController'
  });
}])

.controller('homeController', ['$scope','$http','$interval',function($scope,$http,$interval) {

	$scope.cryptoTypes = ['BTC -BitCoin','LTC -LiteCoin','ETH -Ethereum','ZEC -ZCash','DASH-Dash','XRP -Ripple','MON -Monero'];
	$scope.currencyTypes = ['USD','AUD','EUR'];
	$scope.Crypto = 'BTC';
	$scope.Currency = 'USD';
	$scope.interval = 30000;


	$scope.selectedCurrencyChanged = function(){
    $scope.Currency = 'You selected number ' + $scope.selectedCurrency;
    console.log($scope.Currency);
    getTicker();
  }

  $scope.selectedCryptoChanged = function(){
    $scope.Crypto =  $scope.selectedCrypto.slice(0,3);
    console.log($scope.Crypto);
    getTicker();
  }

	$scope.getTicker = function(){
	
		$http.get(' https://api.cryptonator.com/api/full/' + $scope.Crypto + "-" + $scope.Currency)
		.then(function successCallback(response){
		$scope.data = response.data;
		console.log($scope.data);
		}),
		function errorCallback(response) {
			console.log("page is invalid")};
		$interval(function(){$scope.getTicker();},$scope.interval);
	}
	//$interval(getTicker,$scope.interval);
	 $scope.getTicker();




	$http.get(' https://api.cryptonator.com/api/full/' + $scope.Crypto + "-" + $scope.Currency)
	.then(function successCallback(response){
	$scope.data = response.data;
	console.log($scope.data);
	}),
	function errorCallback(response) {
		console.log("page is invalid")};
	
}]);