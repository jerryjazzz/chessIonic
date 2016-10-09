services.factory('socketService', function($rootScope, $timeout, $q, speedTestService) {

  var serverAddress = 'ws://miki.ddns.net/sockets/'
  var altServerAddress = 'ws://192.168.1.90/sockets/'

  var toggleServerAddress = () => {
    var tempAddress = serverAddress
    serverAddress = altServerAddress
    altServerAddress = tempAddress
  }

  var socket = new function () {

    var socket = this;
    
    if ("WebSocket" in window) {
      console.log('Websockets found in window.');
      
      socket.waitingPromiseResolvers = [];
      socket.onmessageFuncs = {
        
        reHello: function(data){
          console.log('The server answered our HELLO.'); 
          
          // resolve waiting promises here
          var i = socket.waitingPromiseResolvers.length;
          while (i--) {
            var resolve = socket.waitingPromiseResolvers.pop();
            resolve ({isDevice: true});
          };
          
        },

        refreshBrowser: function(data){
          console.log('SERVER: refreshBrowser'); 
          window.location.reload()
        },

        speedTest: (data) => {
          console.log('SERVER: speedTest');
          speedTestService.quickTest().then((result) => {
            socket.send('speedTestResult', result)
          })
        },
        
        log: function(data){
          console.log('SERVER: ', data);
        },

        error: function(data){
          console.log('SERVER ERROR: ', data.message, data.stack, data);
        },
        
      };
      
      socket.addOnmessageFunc = function(funcName, func){
        if (!(funcName in socket.onmessageFuncs)) socket.onmessageFuncs[funcName] = func; 
      };
      
      socket.doOnmessageFunc = function(funcName, data){
        try{
          socket.onmessageFuncs[funcName] (data);
        } catch(err) {
          throw err;
        }
      };
      
      socket.handleMessage = function (data) {
        socket.doOnmessageFunc(data.command, data.data);
      };

      socket.connect = function(){
        
        $timeout(() => {
          if (!socket.socketOn) {
            console.log('5 sec passed, no socketOn, trying alt...')
            toggleServerAddress()
            socket.connect()
          }
        }, 5000)

        // Let us open a web socket
        socket.ws = new WebSocket(serverAddress);

        socket.ws.onmessage = function (evt) {
          var data = JSON.parse(evt.data);
          // checkIfReHello(data);
          
          socket.handleMessage(data); //this has command, data message
          //wsOnmessageFunc(evt, $rootScope, $scope, ws, indexGlobals)  //from old server
        
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
            if(!socket.ws) return reject(['Would send, but no available socket.', command])
            
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
          
          var sendThis = {

            command: command,
            data: data,
            message: message,
            
          }

          if (!cb) {
            var cb = function () {}
          }
          socket.whenReady(sendThis.command).then(function(){
            
            //TODO: implement try/catch error handling for the below
            socket.ws.send(JSON.stringify(sendThis))//, function(){ console.log('nem fut le'); cb(); });  //callback throws error in cordova
            cb();
            
          }, function(err){
            //cant send message, socket is closed
            throw err;
          })

        }

        socket.ws.onopen = function (openEvent) {
          // Web Socket is connected, send data using send()
          
          console.log('WebSocket connected.')

          socket.openedSocket = openEvent.target;

          socket.socketOn = true
          $rootScope.isConnected = true;
          $rootScope.$apply();

          console.log("Socket connection initialised, let's say HELLO...")

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
    },
    
    addOnmessageFunc: function (funcName, func){
      return socket.addOnmessageFunc (funcName, func);
    }

  };
});
