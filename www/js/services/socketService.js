services.factory('socketService', function($rootScope) {

  var socket = new function () {
  
    var socket = this;
    
    if ("WebSocket" in window) {
      console.log('Websockets supported.')
      
      socket.connect = function(){
        
        

        // Let us open a web socket
        socket.ws = new WebSocket('ws://' + document.location.host + '/sockets/');

          
        socket.ws.onopen = function () {
          // Web Socket is connected, send data using send()
          socket.socketOn = true

          socketSend = function (command, data, message, cb) {

            var sendThis = {

              command: command,
              data: data,
              message: message,
              socketID: socketID
            }

            if (!cb) {
              var cb = function () {}
            }

            socket.ws.send(JSON.stringify(sendThis), cb());

          }

          console.log("socket connected, let's say hello...")

          socketSend('Hello', {
            cookieIdRnd: cookieIdRnd,
            clientMongoId: clientMongoId
          }, 'Hello', function () {})

        };

        socket.ws.onmessage = function (evt) {
          wsOnmessageFunc(evt, $rootScope, $scope, ws, indexGlobals)
        }

       socket.ws.onclose = function () {
          // websocket is closed.

          socketOn = false

          socketID = undefined

          console.log("socketConnection is closed, retry in 2s..");

          window.setTimeout(function () {
            if (!socketOn && $rootScope.settingsTab.online) socket.connect()
          }, 2000)
        };
          
        
        
      };
      
      socket.disconnect = function () {
        
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
