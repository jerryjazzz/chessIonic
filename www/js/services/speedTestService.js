services.factory('speedTestService', function($q, $timeout) {

  var quickTest = function () {
    return $q((resolve, reject) => {
      $timeout(() => {
        resolve('mocked speedtest 1s')
      }, 1000)
    })
  };

  return {

    quickTest: quickTest,

  };
});
