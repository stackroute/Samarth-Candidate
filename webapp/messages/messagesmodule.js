angular.module('sm-skillprofile')
    .config(['$stateProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider',
        function($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {

            $urlMatcherFactoryProvider.caseInsensitive(true);

            $stateProvider
                .state('skillprofile.messages', {
                    url: '/messages',
                    views: {
                        "content@": {
                            templateUrl: '/messages/templates/listmessages.html',
                            controller: 'messagesctrl',
                            controllerAs: 'msgCtrl'
                        }
                    }
                })
        }
    ])
