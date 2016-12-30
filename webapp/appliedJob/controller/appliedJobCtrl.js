(function(){
 'use strict'
 angular.module('sm-candidateprofile')
 	.controller('appliedJobCtrl', ['$scope',
   '$stateParams',
   'Pagination',
   'appliedJobFactory',
   '$rootScope',
   function($scope, $stateParams, Pagination,appliedJobFactory,$rootScope) {
    $scope.candidateid=$rootScope.candidate.candidateid;

    appliedJobFactory.appliedJobs($scope.candidateid)
      .then(function(results) {
        $scope.results = results.data;
        console.log($scope.results);
        console.log("results:values"+$scope.candidateid);
        console.log(results);
        $scope.pagination = Pagination.getNew(3);
        $scope.pagination.numPages = Math.ceil(results.data.length / $scope.pagination.perPage);
      }, function err(err) {
        $scope.message = err;
      });
  }
  ])
})()