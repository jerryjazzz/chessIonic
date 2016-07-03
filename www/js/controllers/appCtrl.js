controllers.controller('appCtrl', function ($scope, $rootScope, $interval, $cordovaDevice, $ionicLoading, socketService, deviceService) {
  $rootScope.settingsTab = {
    desiredDepth: "2"
  };
  

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
  