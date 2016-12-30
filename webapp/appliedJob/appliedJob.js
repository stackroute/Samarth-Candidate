(function(){
  'use strict'
angular
  .module('sm-candidateprofile')
  .config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
					.state("candidate.appliedJob",{
						url:"/appliedJob/",
						views: {
							'content@': {
								templateUrl:'./appliedJob/template/appliedJob.html',
								controller:"appliedJobCtrl"
							}
						}
					})
			}
	])
})();