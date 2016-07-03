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
                // socket.ws = new WebSocket('ws://localhost:3000/sockets/');//,["WebSocket"]);

        // var socket_host = 'http://localhost:3000'//window.location.origin + ':8080';

        // //use only websocket, disallow upgrade
        // var socket_args = {
        //     transports: ['websocket'],
        //     upgrade: false,
        //     cookie: false
        // };
        
        //Create socket
        // var socketIo = io(socket_host, socket_args);

        // //Listen for 'test' message
        // socketIo.on('test', function (data) {
        //     console.log(data);
        // });
        // //var socketIo = io.connect('http://localhost:3000', {path: '/socket.io/'});
        // //var socketIo = io.connect('http://localhost:3000', {path: '/sockets/'});
        // socketIo.emit({a:1})  
        
        socket.ws.onmessage = function (evt) {
          
          console.log('onmessage',evt)
          
          //wsOnmessageFunc(evt, $rootScope, $scope, ws, indexGlobals)
        }
        
        socket.ws.onerror = function (err, e2){
          console.log('Error:',err, e2)
          throw new Error(err);
          
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
        
        socket.ws.onopen = function (openEvent) {
          // Web Socket is connected, send data using send()
          //this.send({a:1})
          console.log('WebSocket opened, event.target:', openEvent.target)
          
          socket.openedSocket = openEvent.target;
          
          socket.socketOn = true
          
          
          
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
                    
          $timeout(function(){
           socket.send('Hello', {
             a:1
              // cookieIdRnd: cookieIdRnd,
              // clientMongoId: clientMongoId
            }, 'Hello', function () {})
 
          },4000)          
          

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
