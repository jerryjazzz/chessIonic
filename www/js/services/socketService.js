services.factory('socketService', function($rootScope, $timeout) {

  var socket = new function () {
  
    var socket = this;
    
    if ("WebSocket" in window) {
      console.log('Websockets supported.')
      
      socket.connect = function(){
        
        // Let us open a web socket
        socket.ws = new WebSocket('ws://' + document.location.hostname + ':3000/sockets/');

          
        socket.ws.onopen = function () {
          // Web Socket is connected, send data using send()
          socket.socketOn = true

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

            socket.ws.send(JSON.stringify(sendThis), cb());

          }

          console.log("socket connected, let's say hello...")

          socket.send('Hello', {
            // cookieIdRnd: cookieIdRnd,
            // clientMongoId: clientMongoId
          }, 'Hello', function () {})

        };

        socket.ws.onmessage = function (evt) {
          
          console.log('onmessage',evt)
          
          //wsOnmessageFunc(evt, $rootScope, $scope, ws, indexGlobals)
        }

       socket.ws.onclose = function () {
          // websocket is closed.

          socket.socketOn = false

          socketID = undefined

          if ($rootScope.settingsTab.online) {
            console.log("socketConnection is closed, retry in 2s..");
             $timeout(function () {
                if (!socketOn && $rootScope.settingsTab.online) socket.connect()
              }, 2000)
          }
         
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
