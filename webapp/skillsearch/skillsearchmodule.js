angular.module('sm-skillprofile')
    .config(['$stateProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider',
        function($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {

            $urlMatcherFactoryProvider.caseInsensitive(true);

            $stateProvider
                .state('skillprofile.skillsearch', {
                    url: '/skillsearch',
                    views: {
                        "content@": {
                            templateUrl: '/skillsearch/templates/skillsearch.html'
                        }
                    }
                })
        }
    ])
