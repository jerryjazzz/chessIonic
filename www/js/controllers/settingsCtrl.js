controllers.controller('settingsCtrl', function($scope, $rootScope, $interval, socketService) {
 
  $rootScope.settingsTab.online = socketService.isOnline()
 
  // $interval(function () {
  //   console.log($rootScope.settingsTab)
  // },1000)
  
  $scope.changeOnlineStatus = function (goOnline) {
    
    if(goOnline){
      if(!socketService.isOnline()){
        socketService.goOnline();
      }
    } else {
      socketService.goOffline();
    }
    
  }
  
})








