(function(){
 'use strict'
angular.module('sm-candidateprofile')
  .controller('jobSearchCtrl', ['$scope',
     '$stateParams',
     'Pagination',
     'jobSearchFactory',
     '$rootScope',
  function($scope, $stateParams, Pagination,jobSearchFactory,$rootScope) {

      if ($stateParams.searchText !== undefined ) {
            $scope.searchJob($stateParams.searchText);
        }
      //   else{
      //     // $scope.searchJob($stateParams.searchText);
      //       // $scope.message = "Enter Text To Search For Jobs";
      //   }
        // console.log("directly calling fun "+$stateParams.searchText)
        $scope.foo=$rootScope.profession;
        // $scope.foo=$stateParams.profession;
        console.log("rootscope profession value in foo " + $scope.foo);
        var profs=$scope.foo;
        console.log("searchText params value after checking  "+ $stateParams.searchText);
        console.log("getting profession value from dashboardctrl " + profs);

        jobSearchFactory.searchJobsByProfession(profs).then(function successCallbackfun(response) {
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
             $scope.message="Showing " + response.data.length + " Results for Job Search";
             }
           },
          function errorCallbackfun(response) {
            console.log("some error occured");
            $scope.message = "Some Error Occured ";
          });
          function (err)
           {
            $scope.message = err;
            //console.log($scope.message);
           }
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

       $scope.searchJob = function(searchText) {
         //var arr=key.split(/[ ,]+/);
         console.log("params inside fun searchJob " + searchText);
            //jobSearchFactory.searchJobDetails()
            jobSearchFactory.searchJobs(searchText,profs)
             .then(function successCallbackfun(response) {
                $scope.result = response.data;
                console.log("result with searchtext and Prof");
                console.log($scope.result);
                $scope.pagination = Pagination.getNew(6);
                $scope.pagination.numPages = Math.ceil(response.data.length / $scope.pagination.perPage);
                $scope.message = "";
                if (response.data.length == 0) {
                  $scope.message = "No Result Found ! Enter Text to Get Jobs";
                }
                else{
                  $scope.message="Showing " + response.data.length + " Results for Job Search";
                }
                },
               function errorCallbackfun(response) {
                 console.log("some error occured");
                 $scope.message = "Some Error Occured ";
               });
               function (err)
                {
                 $scope.message = err;
                 //console.log($scope.message);
                }
             );
       };

      //  $scope.searchJob($stateParams.searchText);
   }]);
})();
