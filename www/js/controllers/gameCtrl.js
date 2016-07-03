controllers.controller('gameCtrl', function($scope, $timeout, $interval) {
  //console.log('ran')
  $scope.game = new Game(1,2,3);//id, wname, bname
  $scope.game.displayedTable= angular.copy($scope.game.table);
// xx=$scope.updateSizes
   $scope.scrw=window.screen.availWidth
  
//   $interval(function(){
   
//     console.log($scope.desiredDepth, $scope.multiThread)  
// },1000)

  var store = {
    oopsStates:[]
  };

  var tempMoveStr = '';
  
  $scope.wPlayer =true;
  //$scope.desiredDepth =3

			$scope.setDesiredDepth = function(desiredDepth){
        $timeout(function(){
          $scope.desiredDepth = desiredDepth;
        },1) 
      }
      
      
      
			$scope.makeAMove = function(whatMove, noAiMove) {
        $scope.clearHighlights($scope.game.table)
				var moveStr = whatMove

				game = $scope.game

				game.command = ''

				store.oopsStates[$scope.game._id] = angular.copy(game)

				$scope.clearHighlights(store.oopsStates[$scope.game._id].table)

				//console.log('before adding pastState:', game.allPastTables.length)
				var game = moveInTable(moveStr, game, false)
        
				//console.log('after adding pastState:', game.allPastTables.length)

				game._id = $scope.game._id
				// game.desiredDepth = 3//$rootScope.depth

				// if (game.wName == 'Computer' || game.bName == 'Computer') {

				// 	game.command = 'makeAiMove'
				// 	game.moveTask = new MoveTaskN(game)

				// }

			//	socketSend('moved', game, 'moved', function() {

					// $scope.game.table = game.table
					// $scope.game.wNext = game.wNext
					// $scope.game.moves = game.moves
          $scope.game=game
			//	})
      $timeout(function(){
        if(!noAiMove){
          $scope.makeAiMove();
          //$scope.showTable()
          //$scope.$apply()
        }
      })
      
      
      
			}

$scope.makeAiMove = function () {
	
	// if($scope.multiThread){
	// 	if($scope.fastMultiThread){
			thinker.fastMultiThreadAi($scope.game, $scope.desiredDepth, function(move){
				
				$scope.game = moveInTable(move.moveStr, $scope.game, false)
				$scope.showTable()
				$scope.$apply();
					
			});
	// 	}else{
	// 		thinker.multiThreadAi($scope.game, $scope.desiredDepth, function(move){
				
	// 			$scope.game = moveInTable(move.moveStr, $scope.game, false)
	// 			$scope.showTable()
	// 			$scope.$apply();
					
	// 		});
	// 	}
	// }else{
	// 	thinker.singleThreadAi($scope.game, $scope.desiredDepth, function(move){
			
	// 		$scope.game = moveInTable(move.moveStr, $scope.game, false)
	// 		$scope.showTable()
	// 		$scope.$apply();
				
	// 	});
		
	// }
}
	
//scope=$scope



$scope.showTable = function(cb) { //this will update the displayed table

				$scope.game.displayedTable = angular.copy($scope.game.table)
				if (cb) {
					cb()

				}

			}


			$scope.highLightThem = function(arrayOfCoords) {
				$scope.game.table[arrayOfCoords[0]][arrayOfCoords[1]][9] = true;
			}


			$scope.clearHighlights = function(onTable) {
				for (var i = 0; i < 8; i++) {
					for (var j = 0; j < 8; j++) {
						onTable[i][j][8] = false;
						onTable[i][j][9] = false;

					}
				}
			}


			$scope.clickedIt = function(clickedField, clickedString) {

				var x = clickedField[0]
				var y = clickedField[1]
				var clickedColor = false

				////console.log('testing',$scope.game.table[x][y][5] , tempMoveStr.length ,$scope.game.wNext , $scope.wPlayer)	
				if ((!($scope.game.table[x][y][5] == []) || tempMoveStr.length > 0) && $scope.game.wNext == $scope.wPlayer) {
					//console.log('clickeit called', clickedField, clickedString)

					if (clickedString == tempMoveStr) {
						$scope.game.table[x][y][8] = false
						$scope.clearHighlights($scope.game.table)
						$scope.showTable()
						tempMoveStr = ""
					} else {

						if ($scope.game.table[x][y][0] > 0 && tempMoveStr == "") {
							////console.log('testtesttesttesttesttesttesttest')

							for (var i = 0; i < 8; i++) {
								for (var j = 0; j < 8; j++) {
									$scope.game.table[i][j][15] = false

								}
							}

							$scope.game.table[x][y][5].forEach($scope.highLightThem) //5odik elem ahova lephet
							$scope.showTable()

						};
						if ($scope.game.table[x][y][0] > 0 || 0 < tempMoveStr.length) {

							tempMoveStr += clickedString

							if (tempMoveStr.length < 3) {
								$scope.game.table[x][y][8] = true;
							}

						}
						if (tempMoveStr.length > 3) {

							if ($scope.game.table[x][y][9] == true) {

								$scope.makeAMove(tempMoveStr)
								

								tempMoveStr = ""

							} else {
								tempMoveStr = tempMoveStr[0] + tempMoveStr[1]
							}

						}
						$scope.showTable()

					}
				}
			}








  $scope.clickedItTrans = function(i, j) {

				//console.log('clickedItTrans',i,j)

				var clickedField = [j, 8 - i]
				var clickedString = dletters[j] + (9 - i)

				if (!($scope.opponentsName == "Spectator")) {
					$scope.clickedIt(clickedField, clickedString)
				}

			}

  
})








