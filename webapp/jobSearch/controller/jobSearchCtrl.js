(function(){
 'use strict'
angular.module('sm-candidateprofile')
  .controller('jobSearchCtrl', ['$scope',
     '$stateParams',
     'Pagination',
     'jobSearchFactory',
     '$rootScope',
     '$state',
     '$mdDialog',
  function($scope, $stateParams, Pagination,jobSearchFactory,$rootScope,$state,$mdDialog) {
      $scope.subheader="Discover opportunities and connect people who can help you to get jobs!";
     // I am using rootscope for getting candidate object , we can also get it by calling $auth.getPayload() and then calling dashboard factory
     //Another way by passing stateParams through navbarCtrl
      $scope.candidate=$rootScope.candidate;
      $scope.profession=$scope.candidate.profession;
      var profs=$scope.profession;

      console.log("candidate obj");
      console.log($scope.candidate);
      console.log("profession from candidate rootscope "+$scope.profession);
      console.log("searchText params value after checking  "+ $stateParams.searchText);
      console.log("getting profession value from dashboardctrl " + profs);

      if (($stateParams.searchText !== undefined) && ($stateParams.searchText !== '')) {
        // console.log('inside searchJobs')
            searchJob($stateParams.searchText);
        }
        else{
           searchJobProfs();
        }
       
        function searchJobProfs(){
          console.log('profs', profs);
          jobSearchFactory.searchJobsByProfession(profs).then(function(response) {
           $scope.result = response.data;
           console.log("jobs only with Profs");
           console.log($scope.result);
           $scope.pagination = Pagination.getNew(6);
           $scope.pagination.numPages = Math.ceil(response.data.length / $scope.pagination.perPage);
           $scope.message = "";
           if (response.data.length == 0) {
             $scope.message = "Oops! Currently No Job available for "+profs+" profession";
           }
           else{
             // $scope.message="Showing " + response.data.length + " Results for your "+profs+" Profession in Job Search";
             $scope.message="Showing " + response.data.length + " Results for "+profs+" Profession in Job Search";

             // $state.go('candidate.jobSearch.results', result);
             $state.go('candidate.jobSearch.results', {'obj':'result'});

             }
           })
          .catch(function(error) {
            console.log("some error occured "+err);
            $scope.message = "Some Error Occured "+err;
          });
        };
  
        function searchJob(searchText) {
         //var arr=key.split(/[ ,]+/);
         console.log("params inside fun searchJob " + searchText);
            //jobSearchFactory.searchJobDetails()
            jobSearchFactory.searchJobs(searchText,profs)
             .then(function(response) {
                $scope.message="";
                $scope.result = response.data;
                console.log("result with searchtext and Prof");
                console.log($scope.result);
                $scope.pagination = Pagination.getNew(6);
                $scope.pagination.numPages = Math.ceil(response.data.length / $scope.pagination.perPage);
                $scope.message = "";
                if (response.data.length == 0) {
                  $scope.message = "No Result Found for "+" "+"'"+ searchText+"'"+" "+"! Try more general keywords. ";
                }
                else{
                  $scope.message="Showing " + response.data.length + " Results for Job Search";
                  // console.log("in else");
                  console.log($scope.message);
                }
                })
               .catch(function(error) {
                 console.log("some error occured "+err);
                 $scope.message = "Some Error Occured "+err;
              });      
       };
      
        $scope.apply=function(jobcode)
         {
         jobSearchFactory.applyJob($scope.candidateid,jobcode)
          .then(function(response){
             $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title("Message")
            .textContent(jobcode+"suggested to the candidateid:"+$stateParams.candidateid)
            .ariaLabel('Alert Dialog Demo')
            .ok('Got it!')
            );
           })
          .catch(function(error) {
                 console.log("some error occured "+err);
                 $scope.message = "Some Error Occured "+err;
              }); 
        }

   }]);
})();