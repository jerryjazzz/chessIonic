controllers.controller('appCtrl', function ($scope, $rootScope, $interval, $cordovaDevice, $ionicLoading, socketService, deviceService) {
  
  $rootScope.settingsTab = {
    
    desiredDepth: "2",
    publishGame: true,
    useOnlineGrid: true,
    goOnline:false,
    
    setPublishGame: function (setToTrue) {
      $rootScope.settingsTab.publishGame = setToTrue;
      
      if(!setToTrue){
        $rootScope.settingsTab.setUseOnlineGrid(false);
      }
     
    },
    
    setUseOnlineGrid: function (setToTrue) {
      $rootScope.settingsTab.useOnlineGrid = setToTrue;
      
      if(setToTrue){
        $rootScope.settingsTab.setPublishGame(true);
      }
        
    },
    
    setGoOnline: function (goOnline) {
      
      if(goOnline){
        $rootScope.settingsTab.goOnline = true;
        if(!socketService.isOnline()){
          socketService.goOnline();
        }
      } else {
        $rootScope.settingsTab.goOnline = false;
        
        socketService.goOffline();
      }
      
    }
    
  };
  
  $rootScope.settingsTab.setGoOnline(true); //connect on startup
  

  $rootScope.showLoading = function (text) {
    $ionicLoading.show({
      template: text,
      showBackdrop: false
    });
  };

  $rootScope.hideLoading = function () {
    $ionicLoading.hide();
  };
  
  deviceService.isReady().then(function (result) {
    console.log('deviceService.isReady().then ===> ', result);
  })
  
  
  

})
  