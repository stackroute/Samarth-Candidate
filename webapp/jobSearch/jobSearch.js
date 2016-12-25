(function(){
  'use strict'
angular
  .module('sm-candidateprofile')
  .config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
          .state('candidate.jobSearch', {
            url:'/jobsearch',
            views: {
              "content@": {
                templateUrl: './jobSearch/template/jobSearch.html',
                controller: 'jobSearchCtrl'
               }
            }
            // resolve: {
            //     circleName: ['$stateParams', function($stateParams) {
            //                 return $stateParams.circleName;
            //     }],
            //     circleDomain: ['$stateParams', function($stateParams) {
            //                 return $stateParams.circleDomain;
            //     }]
            // }
           })
          .state('candidate.jobSearch.results', {
            url: 'jobslist/:searchText?',
              views: {
                "results": {
                   templateUrl: './jobSearch/template/jobSearchResult.html',
                   controller: 'jobSearchCtrl'
                  }
              },
              params: {
                 obj: null
                  },
           })
        }
    ]);
})();
