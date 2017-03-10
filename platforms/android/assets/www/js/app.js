'use strict';
(function(){
  var weatherApp = angular.module('weatherApp', []);
weatherApp.controller('appController', ['$scope','$http', function($scope, $http){
  var app_id = 'd922845dcd4513501382bea63c99bc40';
  var api_url = 'http://api.openweathermap.org/data/2.5/forecast/daily?';
  var unit = 'metric';
  var api_key = 'AIzaSyAxEHFQsjjbBTX-bxto1QO5sI0o7K_cwFg';
  var geolocation_url = 'https://www.googleapis.com/geolocation/v1/geolocate?key=';
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var icon_url = 'http://openweathermap.org/img/w/';
  var icon_type = '.png';
  $scope.initializeTabs = function(){
    $http.post(geolocation_url+api_key).then(function(data){
      $scope.getWeatherForecast(data.data.location.lat, data.data.location.lng);
    }, function(error){

    });
  };
  $scope.selectedTab = function(index) {
    $ionicTabsDelegate.select(index);
    $scope.selectedIndex = index;
  };
  $scope.configIcon = function(icon){
    return {
      'background' : 'url('+icon_url+icon+icon_type+') no-repeat'
    }
  }

  $scope.getWeatherForecast = function(latitude, longitude) {
      var actual_url = api_url+'lat='+latitude+'&lon='+longitude+'&appid='+app_id+'&units='+unit+'&cnt=5';
      $http.get(actual_url).then(function(data) {
        if(data.status == '200'){
            $scope.cityName = data.data.city.name;
            $scope.country = data.data.city.country;
            console.log(data);
            $scope.weatherData = data.data.list;
            for(var i=0; i < $scope.weatherData.length; i++){
              var date = $scope.weatherData[i].dt;
              var formattedDate = new Date($scope.weatherData[i].dt*1000);
              $scope.weatherData[i].day = days[formattedDate.getDay()];
              $scope.weatherData[i].month = months[formattedDate.getMonth()];
              $scope.weatherData[i].date = formattedDate.getDate();
            }
            console.log($scope.weatherData);
            $scope.configureData(0);
        }
      }, function(error) {
          console.log(error);
      })
  };
  $scope.configureData = function(index){
    $scope.day = $scope.weatherData[index].day;
    $scope.month = $scope.weatherData[index].month;
    $scope.date = $scope.weatherData[index].date;
    $scope.max = $scope.weatherData[index].temp.max;
    $scope.min = $scope.weatherData[index].temp.min;
    $scope.desc = $scope.weatherData[index].weather[0].description;
    $scope.image = $scope.weatherData[index].weather[0].main;
    $scope.average = $scope.weatherData[index].temp.day;
    $scope.humidity = $scope.weatherData[index].humidity;
    $scope.pressure = $scope.weatherData[index].pressure;
    $scope.speed = $scope.weatherData[index].speed;
    $scope.degree = $scope.weatherData[index].deg;
    $scope.clouds = $scope.weatherData[index].clouds;
  };
}]);
})();
