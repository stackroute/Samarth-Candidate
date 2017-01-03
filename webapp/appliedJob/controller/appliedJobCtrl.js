(function(){
 'use strict'
 angular.module('sm-candidateprofile')
 	.controller('appliedJobCtrl', ['$scope',
   '$stateParams',
   'Pagination',
   'appliedJobFactory',
   '$rootScope',
   "offeredDetails",
   "joinFactory",
   'declineFactory',
   "$mdDialog",
   function($scope, $stateParams, Pagination,appliedJobFactory,$rootScope,offeredDetails,joinFactory,declineFactory,$mdDialog) {
    $scope.candidateid=$rootScope.candidate.candidateid;

    appliedJobFactory.appliedJobs($scope.candidateid)
      .then(function(results) {
        $scope.results = results.data;
        console.log($scope.results);
        console.log("results:values"+$scope.candidateid);
        console.log(results);

        offeredDetails.offers($scope.candidateid) 
        .then(function(results)
        {
          $scope.results.forEach(function(job)
          {
            results.data.forEach(function(offer){
            if(job.jb.jobcode==offer.jobcode)
            {
              job.jb.offer=true;
            }
            })
          })
          $scope.offersResult = results.data;
          if(results.data.length>0)
          {
            var alert = $mdDialog.alert()
          .title('huhooo')
          .textContent('You got the offer..!')
          .ok('ok')

             $mdDialog.show(alert);
          }
          
        })
        .catch(function(err){console.log(err)})

        $scope.pagination = Pagination.getNew(3);
        $scope.pagination.numPages = Math.ceil(results.data.length / $scope.pagination.perPage);
      }, function err(err) {
        $scope.message = err;
      });

    $scope.join=function(jobcode){

      var confirm = $mdDialog.confirm()
          .title('Join')
          .textContent('You are about to join!, please confirm..!')
          .ok('Confirm')
          .cancel('Cancel');

      $mdDialog.show(confirm).then(function() {
        joinFactory.join($scope.candidateid,jobcode)
        .then(function successCallbackfun(response){
          console.log(response);
        },function errorCallbackfun(error){
          console.log(error);
        })
        .catch(function(err){console.log(err)})
      })
    }

    $scope.decline=function(jobcode){

      var confirm = $mdDialog.confirm()
          .title('Decline')
          .textContent('You are about to decline job!, please confirm..!')
          .ok('Confirm')
          .cancel('Cancel');

      $mdDialog.show(confirm).then(function() {
        declineFactory.decline($scope.candidateid,jobcode)
        .then(function successCallbackfun(response){
          console.log(response);
        },function errorCallbackfun(error){
          console.log(error);
        })
        .catch(function(err){console.log(err)})
      })
    }
      
  }
  ])
})()