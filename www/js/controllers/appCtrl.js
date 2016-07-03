controllers.controller('appCtrl', function($scope, $rootScope, $interval, $cordovaDevice, socketService) {
  $rootScope.settingsTab = {}
  $rootScope.device={}
  
  $rootScope.isDevice = function () {
    
  
        return (window.cordova || window.PhoneGap || window.phonegap) 
        && /^file:\/{3}[^\/]/i.test(window.location.href) 
        && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
    }

  
  if ($rootScope.isDevice()) console.log('this is a device')
  
  
  document.addEventListener("deviceready", function(vmi) {
          //whenDeviceReady();
          console.log('Device is ready')
          
          $rootScope.device.isMobile = true;
          //$rootScope.device.isReady = true;
          $rootScope.device.deviceInfo = $cordovaDevice.getDevice();
          $rootScope.device.cordova = $cordovaDevice.getCordova();
          $rootScope.device.model = $cordovaDevice.getModel();
          $rootScope.device.platform = $cordovaDevice.getPlatform();
          $rootScope.device.uuid = $cordovaDevice.getUUID();
          $rootScope.device.version = $cordovaDevice.getVersion();
          
          console.log('DDDDDDDDDDDDDDDDDDDDDDDDDD $rootScope.device', $rootScope.device)
            //resolve()
        }, false);
  
  
  
})








