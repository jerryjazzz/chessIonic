services.factory('socketService', function($rootScope, $timeout) {
//console.log($websocket)
  var socket = new function () {



    var socket = this;

    if ("WebSocket" in window) {
      console.log('Websockets found in window.')

      socket.connect = function(){

        // Let us open a web socket
        socket.ws = new WebSocket('ws://miki.ddns.net:3000/sockets/');//,["WebSocket"]);

        socket.ws.onmessage = function (evt) {
          var data = JSON.parse(evt.data);
          if(data.command === "reHello"){
            console.log('The server answered our HELLO.');
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

        socket.ws.onopen = function (openEvent) {
          // Web Socket is connected, send data using send()
          //this.send({a:1})
          console.log('WebSocket connected.')

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

  };
});
