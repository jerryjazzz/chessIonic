services.factory('socketService', function($rootScope, $timeout) {

  var socket = new function () {
  
    var socket = this;
    
    if ("WebSocket" in window) {
      console.log('Websockets supported.')
      
      socket.connect = function(){
        
        // Let us open a web socket
        socket.ws = new WebSocket('ws://miki.ddns.net/sockets/');

          
        socket.ws.onopen = function (vmi) {
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

            socket.ws.send(JSON.stringify(sendThis), cb);

          }

          console.log("socket connected, let's say hello...",vmi)

          console.log(socket.ws.__proto__)
          socket.ws.send = socket.ws.__proto__.send
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
                if (!socket.socketOn && $rootScope.settingsTab.online) socket.connect()
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
