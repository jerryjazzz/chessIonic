angular.module('starter.controllers', [])

.controller('gameCtrl', function($scope) {
  console.log('gameCtrl started.')
  
  $scope.game = new Game(1,2,3);
  
})