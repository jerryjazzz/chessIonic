appModule.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.game', {
    url: '/game',
    views: {
      'tab-game': {
        templateUrl: 'templates/game/tab-game.html',
        controller: 'gameCtrl'
      }
    }
  })

  .state('tab.stats', {
    url: '/stats',
    views: {
      'tab-stats': {
        templateUrl: 'templates/stats/tab-stats.html',
        controller: 'statsCtrl'
      }
    }
  })

  .state('tab.lobby', {
      url: '/lobby',
      views: {
        'tab-lobby': {
          templateUrl: 'templates/lobby/tab-lobby.html',
          controller: 'lobbyCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/settings/tab-settings.html',
        controller: 'settingsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/game');

});
