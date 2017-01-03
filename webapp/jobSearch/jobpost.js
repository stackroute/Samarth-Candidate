(function (){
  'use strict';
    angular
        .module("sm-candidateprofile")
        .config(jobPostconfig);
        function jobPostconfig($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');
         $stateProvider
         .state('candidate.jobPost',{
            url:'jobPost',
            views: {
                'content@': {
                    templateUrl: './samarth-webcomponents/jobPost/template/jobPost.html',
                    controller: 'jobDataCtrl'
                }
            },
            params: {
                    'key': 'value1',
                    'key1': 'value2'
                }
          })
        }
     
 }());   
