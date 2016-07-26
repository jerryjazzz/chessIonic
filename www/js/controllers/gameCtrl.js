controllers.controller('gameCtrl', function($scope, $rootScope, $timeout, $interval, socketService) {
  
	socketService.addOnmessageFunc('saveYourGameId', function(data1){
		
		console.log('Game published.', data1);
		$scope.game._id = data1.newId;

		// add handler
		socketService.addOnmessageFunc('updateView', (data) => {
			if(data.subViewName == data1.newId){
			console.log(data)
				if(data.viewPart.substring(0,8) === 'dbTable.') {
					$scope.game[data.viewPart.substring(8)] = data.data
					$scope.showTable()
					$scope.$apply()
				}

			} else {
				console.log('something unhandled')
			}
		})

		// subscribe
		socketService.send('showView', {

			oldViewName: '',//$rootScope.loginVals.viewName,
			oldSubViewName: '',//$rootScope.subViewName,
			oldViewParts: [],//$rootScope.activeViewParts.slice(),

			newViewName: 'board.html',
			newSubViewName: data1.newId,
			newViewParts: [
				'dbTable.table',
				'dbTable.chat',
				'dbTable.moves',
				'busyThinkers',
				'dbTable.wNext',
				'wPlayer',
				'dbTable.allPastTables'
			]

		})
		
	})

  $scope.scrw = window.screen.availWidth
  
	$scope.game = new Game(Math.random() ,'Unknown player', 'Computer');//id, wname, bname
  $scope.game.displayedTable= angular.copy($scope.game.table);
	$rootScope.activeGame = $scope.game;		//TODO: make game handler a service

  var store = {
    oopsStates:[]
  };

  var tempMoveStr = '';
  
  $scope.wPlayer =true;
  //$scope.desiredDepth =3

		
      
      
      
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

				game._id = $scope.game._id	//TODO: remove this bugfix, moveintable should keep _id
			
				if ($rootScope.settingsTab.publishGame && socketService.isOnline() ) {	
					console.log('in publishgame')
					
					
					
					if ($rootScope.settingsTab.useOnlineGrid) {			// && AI is on
						console.log('in useOnlineGrid')
						game.desiredDepth = $rootScope.settingsTab.desiredDepth;
						
						game.command = 'makeAiMove'
						game.moveTask = new MoveTaskN(game)
						
					}
					
					socketService.send('moved', game, 'moved', function() {
						
						console.log('lefut')
						//here the game might not have an _id yet, server will register it first and send updateGamId command
						$scope.game = game;	//update view
						
						if(!$rootScope.settingsTab.useOnlineGrid){
							
							$scope.game = game;	//update view
							
							$timeout(function(){	//let update finish
								if(!noAiMove){
									
									$scope.makeAiMove();	
									
								}
							})
									
							
						}
						
					})
					
				} else {
					// not publishing game, offline AI or no ai
					$scope.game = game;	//update view
					
					$timeout(function(){	//let update finish
						if(!noAiMove){
							
							$scope.makeAiMove();	
							
						}
					})
					
				}
				
					

        
      
      
      
			}

$scope.makeAiMove = function () {
	
			thinker.fastMultiThreadAi($scope.game, $rootScope.settingsTab.desiredDepth, function(move){
				
				$rootScope.stats['Last AI move stats'].items = move.result;
				$scope.game = moveInTable(move.moveStr, $scope.game, false)
				$scope.showTable()
				$scope.$apply();
				
				if($rootScope.settingsTab.publishGame){
					//publish offline AIs move here
				}
					
			});

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








