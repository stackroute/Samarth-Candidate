(function(){
 'use strict'
angular.module('sm-candidateprofile')
  .controller('jobSearchCtrl', ['$scope',
     '$stateParams',
     'Pagination',
     'jobSearchFactory',
     '$rootScope',
     '$state',
  function($scope, $stateParams, Pagination,jobSearchFactory,$rootScope,$state) {
      $scope.subheader="Discover opportunities and connect people who can help you to get jobs!";
      $scope.foo=$rootScope.profession;
        // $scope.foo=$stateParams.profession;
        // console.log("rootscope profession value in foo " + $scope.foo);
      var profs=$scope.foo;
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
             $scope.message = "No jobs found for "+profs+" profession";
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
    //  var profs="";
    //   dashboardFactory.getCandidatebyID()
    //      .then(function(response){
    //        $scope.profiling = response.data;
    //        $scope.profession=response.data[0].profession;
    //        profs=response.data[0].profession;
    //        console.log("hello from profesiion in jobsearch ctrl");
    //        console.log("$scope.profession " + profs);
    //      });
    //  professionService.profession()
    //     .then(function(response) {
    //        $scope.profiling = response.data;
    //        for(var i=0;i<response.data.length;i++)
    //        {
    //          console.log("hiii");
    //          profs+=response.data[i].name+"-";
    //        }
    //         console.log("circles arrray "+profs);
    //      },
    //      function(err) {
    //         console.log("circles array "+err);
    //      });

        function searchJob(searchText) {
         //var arr=key.split(/[ ,]+/);
         console.log("params inside fun searchJob " + searchText);
            //jobSearchFactory.searchJobDetails()
            jobSearchFactory.searchJobs(searchText,profs)
             .then(function successCallbackfun(response) {
                $scope.message="";
                $scope.result = response.data;
                console.log("result with searchtext and Prof");
                console.log($scope.result);
                $scope.pagination = Pagination.getNew(6);
                $scope.pagination.numPages = Math.ceil(response.data.length / $scope.pagination.perPage);
                $scope.message = "";
                if (response.data.length == 0) {
                  $scope.message = "No Result Found ! Enter Text to Get Jobs";
                  // console.log("in if");
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
   }]);
})();