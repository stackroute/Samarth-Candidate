angular.module('sm-skillprofile')
    .config(['$stateProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider',
        '$compileProvider',
        function($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider,
            $compileProvider) {
            $urlMatcherFactoryProvider.caseInsensitive(true);

            $urlRouterProvider.otherwise('/signin');

            $stateProvider
                .state('skillprofile', {
                    url: '/signin',
                    views: {
                        "content@": {
                            templateUrl: '/auth/templates/signinpage.html',
                            controller: 'signinpageCtrl'
                        },
                        "navbar": {
                            templateUrl: '/home/templates/navbar.html',
                            controller: 'navCtrl'
                        },
                        "footer": {
                            templateUrl: '/home/templates/footer.html'
                        }
                    }
                });

            $compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
        }
    ])
