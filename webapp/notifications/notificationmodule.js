
angular.module('sm-skillprofile')
   .config(['$stateProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider',
       function($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {

           $urlMatcherFactoryProvider.caseInsensitive(true);

           $stateProvider
               .state('skillprofile.notifications', {
                   url: '/notifications',
                   views: {
                       "content@": {
                           templateUrl: '/notifications/templates/listnotifications.html',
                           controller: 'notificationctrl',
                           controllerAs: 'notfnCtrl'
                       }
                   }
               })
       }
   ])