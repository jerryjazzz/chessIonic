appModule.directive('ngTap', function() {
    return function(scope, element, attrs) {
      var tapping;
      tapping = false;
      element.bind('touchstart', function(e) {
        element.addClass('active');
        tapping = true;
      });
      element.bind('touchmove', function(e) {
        element.removeClass('active');
        tapping = false;
      });
      element.bind('touchend', function(e) {
        element.removeClass('active');
        if (tapping) {
          scope.$apply(attrs['ngTap'], element);
        }
      });
    };
  });



appModule.directive('wtable', function() {
			return {
				restrict: 'E',
				scope: {
					'input': '=',
					'clickfunc': '=',
					'myclass': '=',
          'headingclass': '=',
					'imgh': '=',
					'imgv': '=',
          'scrw': '='          
					
				},
                link: function(scope, element, attrs) {
                  
                    var origtable=undefined	
                  
                    scope.$watch('input',function(oldValue,newValue){
                        
                        if(scope.input&&oldValue&&newValue){
                       
                        var changed=false
                        
                         for (var i = 0; i < 8; i++) {
                            
                           
                            
                            for (var j = 0; j < 8; j++) {
                                
                                if(origtable==undefined || oldValue[i][j][0]!=newValue[i][j][0])changed=true
                        
                            }
                            
                         }
                        
                        if(changed){
                            
                            scope.outTable=new Array(8)
                        
                            for (var i = 0; i < 8; i++) {
                                
                                scope.outTable[i]=new Array(8)
                                
                                for (var j = 0; j < 8; j++) {
                                    
                                    if(oldValue&&oldValue[i][j][0] != newValue[i][j][0]) scope.input[i][j][15] = true       //highlight moved
                                    

                                    scope.outTable[i][j] = new Array(8)
                                    scope.outTable[i][j] = scope.input[j][7 - i]
                                   

                                    if ((i + j) & 1) scope.outTable[i][j][7] = true     //grey fields
                                    
                                    
                                }
                            }
                            
                            origtable = scope.outTable
                          
                            
                        }else{
                            
                            scope.outTable=new Array(8)
                        
                            for (var i = 0; i < 8; i++) {
                                
                                scope.outTable[i]=new Array(8)
                                
                                for (var j = 0; j < 8; j++) {
                                    
                                    if(origtable[i][j]&&origtable[i][j][15]) scope.input[j][7-i][15] = true       //highlight the old one
                                    

                                    scope.outTable[i][j] = new Array(8)
                                    scope.outTable[i][j] = scope.input[j][7 - i]
                                    

                                    if ((i + j) & 1) scope.outTable[i][j][7] = true     //grey fields
                                    
                                    
                                }
                            }
                         
                        }
                        
                                
                        ////console.log(scope.outTable)
                    }
                        
                    },true)
                   
                    
                   
                   
                   
                   
                },
				template: '<table class="{{myclass}}" onload="updateSizes()">\
							<tr class="heading row0" style="width:{{scrw}}px; height:1px">\
								<td class="heading"></td>\
								<td>A</td>\
								<td>B</td>\
								<td>C</td>\
								<td>D</td>\
								<td>E</td>\
								<td>F</td>\
								<td>G</td>\
								<td>H</td>\
							</tr>\
							<tr ng-repeat="(xIndex, x) in outTable track by $index" style="height: {{imgh || scrw*0.11950}}">\
								<td class="heading">{{8-$index}}</td>\
								<td ng-repeat="(yIndex, y) in x track by $index" ng-tap="clickfunc(xIndex+1,yIndex)" ng-class="{ darker: y[7], square: !y[7]}">\
									<div ng-class="divAroundIt" style="height: {{imgh || scrw*0.11950}}px">\
										<img ng-src="{{\'cPiecesPng/\'+y[0]+y[1]+\'.png\'}}" height="{{imgh || scrw*0.11950}}px" width="{{imgw || scrw*0.11950}}" ng-class="{ selected: y[8]||y[9], selected2: y[15]}">\
									</div>\
								</td>\
							</tr>\
						</table>'
        
        // template: '<div class="row heading row0">\
				// 				<div class="col-10 left-column {{headingclass}}"></div>\
				// 				<div class="col-10">A</div>\
				// 				<div class="col-10">B</div>\
				// 				<div class="col-10">C</div>\
				// 				<div class="col-10">D</div>\
				// 				<div class="col-10">E</div>\
				// 				<div class="col-10">F</div>\
				// 				<div class="col-10">G</div>\
				// 				<div class="col-10">H</div>\
				// 			</div>\
				// 			<div class="row" ng-repeat="(xIndex, x) in outTable track by $index">\
				// 				<div class="col-10 left-column {{headingclass}}">{{8-$index}}</div>\
				// 				<div  class="col-10" ng-repeat="(yIndex, y) in x track by $index" ng-click="clickfunc(xIndex+1,yIndex)" ng-class="{ darker: y[7], square: !y[7]}">\
				// 					<div ng-class="divAroundIt">\
				// 						<img ng-src="{{\'cPiecesPng/\'+y[0]+y[1]+\'.png\'}}" height="{{imgh}}" width="{{imgw}}" ng-class="{ selected: y[8]||y[9], selected2: y[15]}">\
				// 					</div>\
				// 				</div>\
				// 			</div>'
	
			}
		}
        )
appModule.directive('btable', function() {
			return {
				restrict: 'E',
				scope: {
					'input': '=',
					'clickfunc': '=',
					'myclass': '=',
                    'headingclass': '=',
					'imgh': '=',
					'imgv': '=',
					
				},
                link: function(scope, element, attrs) {
                    
                    
                    
                    var origtable=undefined	
                   
                    scope.$watch('input',function(oldValue,newValue){
                        
                        if(scope.input&&oldValue&&newValue){
                          
                        
                         var changed=false
                        
                         for (var i = 0; i < 8; i++) {
                            
                           
                            
                            for (var j = 0; j < 8; j++) {
                                
                                if(origtable==undefined || oldValue[i][j][0]!=newValue[i][j][0])changed=true
                        
                            }
                            
                         }
                         
                         
                        if(changed){
                        
                            scope.outTable=new Array(8)
                        
                            for (var i = 0; i < 8; i++) {
                                
                                scope.outTable[i]=new Array(8)
                                
                                for (var j = 0; j < 8; j++) {
                                    
                                    if(oldValue&&oldValue[i][j][0] != newValue[i][j][0]) scope.input[i][j][15] = true       //highlight moved
                                    
                                    

                                    scope.outTable[i][j] = new Array(8)
                                    scope.outTable[i][j] = scope.input[7-j][i]
                                    

                                    if ((i + j) & 1) scope.outTable[i][j][7] = true     //makes grey fields grey
                                    
                                }
                            }
                            
                            origtable = scope.outTable
                            
                            
                            
                        }else{
                            
                            scope.outTable=new Array(8)
                        
                            for (var i = 0; i < 8; i++) {
                                
                                scope.outTable[i]=new Array(8)
                                
                                for (var j = 0; j < 8; j++) {
                                    
                                    if(origtable[i][j]&&origtable[i][j][15]) scope.input[7-j][i][15] = true       //highlight the old one
                                    
                                    

                                    scope.outTable[i][j] = new Array(8)
                                    scope.outTable[i][j] = scope.input[7-j][i]
                                    

                                    if ((i + j) & 1) scope.outTable[i][j][7] = true     //makes grey fields grey
                                    
                                }
                            }
                            
                            
                            
                            
                        }
                        
                        
                    }
                    },true)
                   
                    
                   
                   
                   
                   
                },
				template: '<table class="{{myclass}}" onload="updateSizes()"">\
							<tr class="heading row0 {{headingclass}}">\
								<td class="left-column {{headingclass}}"></td>\
								<td>H</td>\
								<td>G</td>\
								<td>F</td>\
								<td>E</td>\
								<td>D</td>\
								<td>C</td>\
								<td>B</td>\
								<td>A</td>\
							</tr>\
							<tr ng-repeat="(xIndex, x) in outTable track by $index">\
								<td class="left-column {{headingclass}}">{{1+$index}}</td>\
								<td ng-repeat="(yIndex, y) in x track by $index" ng-click="clickfunc(8-xIndex,7-yIndex)" ng-class="{ darker: y[7], square: !y[7]}">\
									<div ng-class="divAroundIt">\
										<img ng-src="{{\'cPiecesPng/\'+y[0]+y[1]+\'.png\'}}" height="{{imgh}}" width="{{imgw}}" ng-class="{ selected: y[8]||y[9], selected2: y[15]}">\
									</div>\
								</td>\
							</tr>\
						</table>'
	
			}
		}  
        
        )

   