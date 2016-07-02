


importScripts('../classes.js')
importScripts('../brainz/engine.js')
//importScripts('../all/brandNewAi.js')
importScripts('../brainz/deepening.js')

onmessage = function(event) {

	var reqCommand = event.data.reqCommand
	var reqData = event.data.reqData;
	var reqMessage = event.data.reqMessage;

	var resData;
	var resCommand;
	var resMessage;


	switch (reqCommand) {
		case undefined:

			break;

		case 'echo':
//
			resMessage = 'echo'
			resData = reqData
			resCommand = 'reEcho'


			break;
			
			
			case 'longEcho':
//
			resMessage = 'toMain longEcho'
			resData = {
				command: 'retLongEcho'
			}
			resCommand = 'toMain'


			break;
			
			case 'solveDT':
			
			
				
				resCommand = 'toMain'
				resMessage = 'toMain solveDT'
				
                //console.log(reqData.progress)
        
        //var deepeningTask = new DeepeningTask(smallMoveTask)
        var deepeningTask = reqData;
        
        oneDeeper(deepeningTask) //this will make about 30 smalldeepeningtasks from the initial 1 and create deepeningtask.resolverarray
            //first item in deepeningtask.smalldeepeningtasks is trigger
console.log(deepeningTask)
        //!!!!!!!!!!!implement !!!!!!!!!!typedarray

        var res=[]
      
            while (deepeningTask.smallDeepeningTasks.length > 1) {

                var smallDeepeningTask = deepeningTask.smallDeepeningTasks.pop()
                
                smallDeepeningTask.progress=deepeningTask.progress
                
////////////////from subworker

                var res2=solveDeepeningTask(smallDeepeningTask,'sdt')
                
                res2.value=res2.score
              
                res.push(res2)
                
            }

            var tempResolveArray = []
                
                tempResolveArray[1] = []
                tempResolveArray[2] = res
                tempResolveArray[3] = []
                

            resolveDepth(2, tempResolveArray)

            
            
            
            var pushAgain = tempResolveArray[1][0]
            
            var moveStr=pushAgain.moveTree.slice(0, 4)
                
            var wouldLoop
            
            if(!deepeningTask.shouldIDraw){
                
                //console.log('i shouldn\'t draw')
                
                var movedTable=moveIt(moveStr,deepeningTask.startingTable)
                //console.log(movedTable)
                wouldLoop=evalFuncs.checkIfLooped(movedTable,deepeningTask.startingAllPastTables)
                //console.log(wouldLoop)
                
                
            }else{
                //console.log('i can draw')
            }
				if(wouldLoop)pushAgain.value-=Math.pow(wouldLoop,5)
				//pushAgain.moveIndex=resData.progress.moveIndex
				//pushAgain._id = workingOnGameNum
				pushAgain.score = pushAgain.value
				//pushAgain.thinker = sendID.toString() //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
				pushAgain.move = moveStr
                   
        
      var  result = pushAgain
           
           
           
           
           
                
                
                
                
                
				//var result=solveDeepeningTask(oneDeeper(reqData),'sdt')
               
				result.gameNum=reqData.gameNum
				
				
				resData = {
					command: 'dtSolved',
					data: result,
      	}
				
				
					

			break;
      
      	case 'solveSDT':
			
			
				
				resCommand = 'toMain'
				resMessage = 'toMain solveSDT'
				
                //console.log(reqData.progress)
				var result=solveDeepeningTask(reqData,'sdt')
               
				result.gameNum=reqData.gameNum
				
				
				resData = {
					command: 'sdtSolved',
					data: result,
                    
					
				}
				
				
					

			break;

		case 'speedTest':

			resMessage = 'speedTest done'
				//reqData=reqData
			resData = {
				speed: checkSpeed(),
				worker: reqData.worker
			}
			resCommand = 'speedTest'


			break;

		case 'init':

		
postMessage({
		// command:undefined,
		'resMessage': 'imUp',
		'resData': 'imUp',
		'resCommand': 'imUp'
	});


			break;
			
			case 'fastSplitMove':
		//	console.log('IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII')
			var smallMoveTask = reqData.smallMoveTask;
			var index = reqData.index;
			var dbTable = reqData.dbTable;
			
			var deepeningTask = new DeepeningTask(smallMoveTask)

        oneDeeper(deepeningTask) //this will make about 30 smalldeepeningtasks from the initial 1 and create deepeningtask.resolverarray
            //first item in deepeningtask.smalldeepeningtasks is trigger

        //!!!!!!!!!!!implement !!!!!!!!!!typedarray

        var res=[]
      
            while (deepeningTask.smallDeepeningTasks.length > 1) {

                var smallDeepeningTask = deepeningTask.smallDeepeningTasks.pop()
                
                smallDeepeningTask.progress=deepeningTask.progress
                
////////////////from subworker

                var res2=solveDeepeningTask(smallDeepeningTask,'sdt')
                
                res2.value=res2.score
              
                res.push(res2)
                
            }

            var tempResolveArray = []
                
                tempResolveArray[1] = []
                tempResolveArray[2] = res
                tempResolveArray[3] = []
                

            resolveDepth(2, tempResolveArray)

            
            
            
            var pushAgain = tempResolveArray[1][0]
            
            var moveStr=pushAgain.moveTree.slice(0, 4)
                
            var wouldLoop
            
            if(!dbTable.moveTask.shouldIDraw){
                
                //console.log('i shouldn\'t draw')
                
                var movedTable=moveIt(moveStr,dbTable.table)
                //console.log(movedTable)
                wouldLoop=evalFuncs.checkIfLooped(movedTable,dbTable.allPastTables)
                //console.log(wouldLoop)
                
                
            }else{
                //console.log('i can draw')
            }
				if(wouldLoop)pushAgain.value-=Math.pow(wouldLoop,5)
				//pushAgain.moveIndex=resData.progress.moveIndex
				//pushAgain._id = workingOnGameNum
				pushAgain.score = pushAgain.value
				//pushAgain.thinker = sendID.toString() //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
				pushAgain.move = moveStr
                   
									 
									 
				resCommand = 'toMain'
				resMessage = 'toMain fastSplitMoveSolved'
				
                //console.log(reqData.progress)
				// var result=solveDeepeningTask(reqData,'sdt')
               
				// result.gameNum=reqData.gameNum
				
				
				resData = {
					command: 'fastSplitMoveSolved',
					data: pushAgain,
                    
					
				}
				
			break;
			
			
			
			default:
			
				console.log('@@@unhandled:', reqCommand, reqData)

	}


	postMessage({
		// command:undefined,
		'resMessage': resMessage,
		'resData': resData,
		'resCommand': resCommand
	});


};

/////////////////////worker func end