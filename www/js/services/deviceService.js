services.factory('deviceService', function($cordovaDevice, $q) {

  var waitingPromiseResolvers = [];

  var isDevice = function () {
    return (window.cordova || window.PhoneGap || window.phonegap) &&
      /^file:\/{3}[^\/]/i.test(window.location.href) &&
      /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
  };

  var device = {
    isReady: false,
    isDevice: isDevice()
  };

  var startEventLinstener = function () {

    console.log('Adding eventListener..')
    document.addEventListener("deviceready", function () {

      console.log('Device is ready.')

      device.isReady = true;

      device.deviceInfo = $cordovaDevice.getDevice();
      device.cordova = $cordovaDevice.getCordova();
      device.model = $cordovaDevice.getModel();
      device.platform = $cordovaDevice.getPlatform();
      device.uuid = $cordovaDevice.getUUID();
      device.version = $cordovaDevice.getVersion();

      console.log('Device read:', device);

      waitingPromiseResolvers.forEach(function (resolve) {
        console.log('resolving promise waiting for deviceready event...')
        resolve({isDevice: true});

      })


    }, false);

  }

  var isReady = function () {
    return $q(function (resolve, reject) {

      waitingPromiseResolvers.push(resolve);

      if(!device.isDevice) return resolve({isDevice: false});
      if(device.isDevice && device.isReady) return resolve({isDevice: true});
      if(!device.eventListenerStarted) return reject('eventListener did not start');

    })
  };

  if (isDevice()) {

    console.log('Device Found, trying to add eventListener..');
    startEventLinstener();
    device.eventListenerStarted = true;

  }



  return {

    isDevice: isDevice,

    device: device,

    isReady: isReady,

  };
});
