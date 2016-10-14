angular.module('sm-skillprofile')
    .config(['$stateProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider',
        function($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {
            $urlMatcherFactoryProvider.caseInsensitive(true);
            $stateProvider
                .state('skillprofile.skillhome.jobsearch', {
                    url: '/jobsearch',
                    views: {
                        "content2@": {
                            templateUrl: '/jobsearch/templates/jobsearch.html',
                            controller: 'jobsearchctrl'

                        }
                    }
                })
        }
    ])
