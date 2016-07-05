services.factory('socketService', function($rootScope, $timeout, $q) {
//console.log($websocket)
  var socket = new function () {



    var socket = this;
    
    socket.waitingPromiseResolvers = [];


    if ("WebSocket" in window) {
      console.log('Websockets found in window.')

      socket.connect = function(){

        // Let us open a web socket
        socket.ws = new WebSocket('ws://miki.ddns.net:3000/sockets/');//,["WebSocket"]);

        socket.ws.onmessage = function (evt) {
          var data = JSON.parse(evt.data);
          if(data.command === "reHello"){
            console.log('The server answered our HELLO.');
            
            // resolve waiting promises here
            var i = socket.waitingPromiseResolvers.length;
            while (i--) {
              var resolve = socket.waitingPromiseResolvers.pop();
              resolve ({isDevice: true});
            };
          }

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
          console.log("Socket is disconnected.");
          if ($rootScope.settingsTab.goOnline) {
            console.log("Will try to reconnect in 2s..");
             $timeout(function () {
                if (!socket.socketOn && $rootScope.settingsTab.goOnline) socket.connect()
              }, 2000)
          }

        };
        
        socket.whenReady = function (command) {
          
          
          
          return $q(function (resolve, reject) {

            if(command === 'Hello') return resolve();

            switch(socket.ws.readyState){
              
              case 1:
                return resolve();
               
              case 0:
                waitingPromiseResolvers.push(resolve);
                break;
                
              default:
                return reject('WS is closing or closed')
                //could wait here if trying to reconnect / no net
            }

          })
        };
              
        socket.send = function (command, data, message, cb) {
console.log(cb)
          var sendThis = {

            command: command,
            data: data,
            message: message,
            
          }

          if (!cb) {
            var cb = function () {}
          }
          socket.whenReady(sendThis.command).then(function(){
            socket.ws.send(JSON.stringify(sendThis), function(){ console.log('nem fut le'); cb(); });
            cb();
          }, function(err){
            //cant send message, socket is closed
            throw err;
          })

        }

        socket.ws.onopen = function (openEvent) {
          // Web Socket is connected, send data using send()
          //this.send({a:1})
          console.log('WebSocket connected.')

          socket.openedSocket = openEvent.target;

          socket.socketOn = true
          $rootScope.isConnected = true;
          $rootScope.$apply();

          console.log("Socket connection initialised, let's say HELLO...")

          //console.log(socket.ws)
         // socket.ws.send = socket.ws.__proto__.sendconsole.log(err)

          socket.send('Hello', {
             //isIonicClient: $rootScope.device.ismobile,
             device: $rootScope.device,
             cookieIdRnd: JSON.stringify($rootScope.device),
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
    
    send: function (command, data, message, cb) {
      return socket.send(command, data, message, cb);
    }

  };
});
