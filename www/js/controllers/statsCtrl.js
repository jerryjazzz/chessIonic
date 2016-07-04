controllers.controller('statsCtrl', function($scope, $rootScope, deviceService, socketService) {

	var groupNames = ['Last AI move stats', 'more crap']
	$rootScope.stats = [];

  groupNames.forEach(function(name, index){

    $rootScope.stats[index] = {
      name: name,
      items: []
    };

  })

  console.log($scope.groups)

  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

})