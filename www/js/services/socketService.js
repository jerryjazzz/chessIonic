services.factory('socketService', function($rootScope, $timeout) {
//console.log($websocket)
  var socket = new function () {
  
    
  
    var socket = this;
    
    if ("WebSocket" in window) {
      console.log('Websockets found in window.')
      console.log(WebSocket)
      
      socket.connect = function(){
        
        // Let us open a web socket
        socket.ws = new WebSocket('ws://miki.ddns.net:3000/sockets/');//,["WebSocket"]);
        
        socket.ws.onmessage = function (evt) {
          
          console.log('onmessage',evt)
          
          //wsOnmessageFunc(evt, $rootScope, $scope, ws, indexGlobals)
        }
        
        socket.ws.onerror = function (err){
          console.log('Error:',err)
          throw new Error(err);
          
        }

       socket.ws.onclose = function () {
          // websocket is closed.

          socket.socketOn = false
          $rootScope.isConnected = false;
          $rootScope.$apply();
          

          socketID = undefined

          if ($rootScope.settingsTab.online) {
            console.log("socketConnection is closed, retry in 2s..");
             $timeout(function () {
                if (!socket.socketOn && $rootScope.settingsTab.online) socket.connect()
              }, 2000)
          }
         
        };
        
        socket.ws.onopen = function (openEvent) {
          // Web Socket is connected, send data using send()
          //this.send({a:1})
          console.log('WebSocket opened, event.target:', openEvent.target)
          
          socket.openedSocket = openEvent.target;
          
          socket.socketOn = true
          $rootScope.isConnected = true;
          $rootScope.$apply();
          
          
          //var sender = this;

          socket.send = function (command, data, message, cb) {

            var sendThis = {

              command: command,
              data: data,
              message: message,
              //socketID: socketID
            }

            if (!cb) {
              var cb = function () {}
            }

            socket.ws.send(JSON.stringify(sendThis))//, cb);

          }

          console.log("socket connected, let's say hello...")

          //console.log(socket.ws)
         // socket.ws.send = socket.ws.__proto__.sendconsole.log(err)
                    
          socket.send('Hello', {
             //isIonicClient: $rootScope.device.ismobile,
             device: $rootScope.device
              // cookieIdRnd: cookieIdRnd,
              // clientMongoId: clientMongoId
            }, 'Hello', function () {})
 
        };

        
          
        
        
      };
      
      socket.disconnect = function () {
        socket.ws.close()
        socket.ws = undefined;
      }
      
     
    } else {
      // The browser doesn't support WebSocket
      console.log("WebSocket NOT supported by your Browser!");
    }
  }
  
  
  
  
  





  return {
    
    isOnline: function () {
      return socket.socketOn;
    },
    
    goOnline: function () {
      
      socket.connect();
      
    },
    goOffline: function () {
      socket.disconnect();
    },
    
  };
});
