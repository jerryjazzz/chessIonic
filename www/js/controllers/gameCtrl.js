angular.module('starter.controllers', [])

.controller('gameCtrl', function($scope, $interval) {
  console.log('gameCtrl started.')
  
  $scope.game = new Game(1,2,3);
  
  // 			$scope.updateSizes = function(cb) {

	// 			//console.log('updateSizes')

	// 			var sw = window.innerWidth
	// 			var sh = window.innerHeight

	// 			var sr = sh / sw

	// 			if (sr < 0.8) {
	// 				$scope.screenRatio = 0
	// 			} else {

	// 				if (sr < 1.1) {
	// 					$scope.screenRatio = 1
	// 				} else {

	// 					if (sr < 1.5) {
	// 						$scope.screenRatio = 2
	// 					} else {
	// 						$scope.screenRatio = 3
	// 					}

	// 				}

	// 			}

	// 			var nw = $('.navvv').width()
	// 			var sbh = $('.statusBox').height()

	// 			$('.frame-table').css({
	// 				'width': nw + 'px'
	// 			});
	// 			$('.frame-table').css({
	// 				'height': (sh - 50) + 'px'
	// 			});

  //       $scope.screenRatio = 99

	// 			switch ($scope.screenRatio) {

	// 				case 99:

	// 					// $('.leftBar').css({
	// 					// 	'width': 130 + 'px'
	// 					// });

	// 					$('.iderakd').css({
	// 						'height': (1) + 'px'
	// 					});
	// 					$('.iderakd').css({
	// 						'width': (1) + 'px'
	// 					});

	// 					$('.main-table').css({
	// 						'height': (100) + 'px'
	// 					});
	// 					$('.main-table').css({
	// 						'width': (100) + 'px'
	// 					});

	// 					// $('.chatCell').css({
	// 					// 	'width': (sw - sh - 90) + 'px'
	// 					// });
	// 					// $('.chatCell').css({
	// 					// 	'height': (sh - 92) + 'px'
	// 					// });

	// 					// $('.chatInpt').css({
	// 					// 	'width': (sw - sh - 144) + 'px'
	// 					// });

	// 					// $('.moves').css({
	// 					// 	'height': (sh - sbh - 75) + 'px'
	// 					// });

	// 					break;
            
  //         case 0:

	// 					$('.leftBar').css({
	// 						'width': 130 + 'px'
	// 					});

	// 					$('.iderakd').css({
	// 						'height': (1) + 'px'
	// 					});
	// 					$('.iderakd').css({
	// 						'width': (1) + 'px'
	// 					});

	// 					$('.main-table').css({
	// 						'height': (sh - 72) + 'px'
	// 					});
	// 					$('.main-table').css({
	// 						'width': (sh - 72) + 'px'
	// 					});

	// 					$('.chatCell').css({
	// 						'width': (sw - sh - 90) + 'px'
	// 					});
	// 					$('.chatCell').css({
	// 						'height': (sh - 92) + 'px'
	// 					});

	// 					$('.chatInpt').css({
	// 						'width': (sw - sh - 144) + 'px'
	// 					});

	// 					$('.moves').css({
	// 						'height': (sh - sbh - 75) + 'px'
	// 					});

	// 					break;

	// 				case 1:

	// 					$('.leftBar').css({
	// 						'width': 230 + 'px'
	// 					});

	// 					$('.tableAndChat').css({
	// 						'width': (nw - 241) + 'px'
	// 					});

	// 					$('.chatCell').css({
	// 						'width': (nw - 214) + 'px'
	// 					});
	// 					$('.chatCell').css({
	// 						'height': (sh - sw + 342) + 'px'
	// 					});

	// 					$('.chatInpt').css({
	// 						'width': (nw - 268) + 'px'
	// 					});

	// 					$('.iderakd').css({
	// 						'height': (1) + 'px'
	// 					});
	// 					$('.iderakd').css({
	// 						'width': (1) + 'px'
	// 					});

	// 					$('.main-table').css({
	// 						'height': (nw - 215) + 'px'
	// 					});
	// 					$('.main-table').css({
	// 						'width': (nw - 215) + 'px'
	// 					});

	// 					$('.moves').css({
	// 						'height': (sh - sbh + 112) + 'px'
	// 					});

	// 					break;

	// 				case 2:

	// 					$('.leftBar').css({
	// 						'width': 130 + 'px'
	// 					});

	// 					$('.tableAndChat').css({
	// 						'width': (1) + 'px'
	// 					});

	// 					$('.iderakd').css({
	// 						'height': (1) + 'px'
	// 					});
	// 					$('.iderakd').css({
	// 						'width': (1) + 'px'
	// 					});

	// 					$('.chatCell').css({
	// 						'width': (nw - 150) + 'px'
	// 					});
	// 					$('.chatCell').css({
	// 						'height': (sh - nw + 42) + 'px'
	// 					});

	// 					$('.chatInpt').css({
	// 						'width': (nw - 214) + 'px'
	// 					});

	// 					$('.main-table').css({
	// 						'height': (nw - 150) + 'px'
	// 					});
	// 					$('.main-table').css({
	// 						'width': (nw - 150) + 'px'
	// 					});

	// 					$('.moves').css({
	// 						'height': (sh - sbh - 82) + 'px'
	// 					});

	// 					break;

	// 				case 3:

	// 					$('.leftBar').css({
	// 						'height': (sh - nw - 68) + 'px'
	// 					});

	// 					$('.chatCell').css({
	// 						'width': (nw - 148) + 'px'
	// 					});
	// 					$('.chatInpt').css({
	// 						'width': (nw - 202) + 'px'
	// 					});

	// 					$('.chatCell').css({
	// 						'height': (sh - nw - 90) + 'px'
	// 					});

	// 					$('.iderakd').css({
	// 						'height': (1) + 'px'
	// 					});
	// 					$('.iderakd').css({
	// 						'width': (1) + 'px'
	// 					});

	// 					$('.main-table').css({
	// 						'height': (nw - 8) + 'px'
	// 					});
	// 					$('.main-table').css({
	// 						'width': (nw - 8) + 'px'
	// 					});

	// 					$('.moves').css({
	// 						'height': (sh - sbh - nw - 73) + 'px'
	// 					});

	// 					break;

	// 			}

	// 			if (cb) {

	// 				cb()
	// 			}
	// 			if (!$scope.$$phase) {
	// 				$scope.$apply()
	// 			}
	// 		}

	// 		window.onresize = function() {

	// 			//http://stackoverflow.com/questions/14902321/how-to-determine-if-a-resize-event-was-triggered-by-soft-keyboard-in-mobile-brow

	// 			var t = $(document.activeElement).prop('type')
	// 			if (t === 'text' || t === 'password') {
	// 				// Logic for while keyboard is shown
	// 			} else {
	// 				// Logic for while keyboard is hidden

	// 				setTimeout($scope.updateSizes(), 800)

	// 			}

	// 		}

  
  // xx=$scope.updateSizes
   $scope.scrw=window.screen.availWidth
  
//   $interval(function(){
   
//     //console.log(window.screen.availWidth)  
// },1000)
  
})
