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
      $scope.message ="";
      $scope.message1="";
      $scope.message2="";
      $scope.result=[];
      $scope.candidate=$rootScope.candidate;
      $scope.profession=$scope.candidate.profession;
      $scope.candidateid=$rootScope.candidate.candidateid;
      var profs=$scope.profession;
      console.log("candidate obj");
      console.log($scope.candidate);
      console.log($scope.candidateid);
      console.log("searchText params value after checking  "+ $stateParams.searchText);
      console.log("getting profession value from dashboardctrl " + profs);

      if (($stateParams.searchText !== undefined) && ($stateParams.searchText !== '')) {
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
           
             for(var i=0;i<$scope.result.length;i++)
                 {  
                 jobSearchFactory.status($scope.candidateid,$scope.result[i].jb.jobcode)
                  .then(function(response){
                     console.log("result and status");
                     $scope.result.forEach(function(job)
                     {
                     if(job.jb.jobcode==response.data[0].jobcode)
                     {
                     console.log(job.jb.jobcode);
                     if(response.data[0].status=="applied")
                     {
                      job.jb.applyStatus=true
                      console.log(job.jb.applyStatus);
                     }
                     else{
                      job.jb.applyStatus=false
                      }
                     console.log(job.jb.applyStatus);
                      }
                     })
                   })
                    .catch(function(error) {
                    $scope.message = "Some Error Occured "+err;
                });
                console.log($scope.result[i].jb.jobcode+"status"+$scope.candidateid);
               }

               if (response.data.length == 0) {
             $scope.message = "Sorry! Currently No New Job available for "+profs+" profession";
           }
           else{
             // $scope.message="Showing " + response.data.length + " Results for your "+profs+" Profession in Job Search";
             $scope.message="Showing " + response.data.length + " Results for "+profs+" Profession in Job Search";

             $state.go('candidate.jobSearch.results', {'obj':'result'});
             }
           })
          .catch(function(error) {
            $scope.message = "Some Error Occured "+err;
          });
        };
  
        function searchJob(searchText) {
         //var arr=key.split(/[ ,]+/);
         console.log("params inside fun searchJob " + searchText);
            //jobSearchFactory.searchJobDetails()
            jobSearchFactory.searchJobs(searchText,profs)
             .then(function(response) {
              let temp = [];
                for( let a = 0; a < response.data.length; a = a + 1)
                {
                  if(profs === response.data[a].jb.profession[0])
                  {
                    temp.push(response.data[a]);
                  }
                }
                $scope.message="";
                $scope.result = temp;
                console.log("result with searchtext and Prof");
                console.log($scope.result);
                $scope.pagination = Pagination.getNew(6);
                $scope.pagination.numPages = Math.ceil(temp.length / $scope.pagination.perPage);
                // $scope.message = "";
                if (temp.length == 0) {
                  // $scope.message = "No Result Found for "+" "+"'"+ searchText+"'"+" "+"! Try more general keywords. ";
                  $scope.message = "No Result Found for "+" "+"'";
                  $scope.message1 =searchText
                  $scope.message2="'"+" "+"! Try more general keywords. ";
                }
                else{
                  $scope.message="Showing " + temp.length + " Results for Job Search";
                  // console.log($scope.message);
                }
                for(var i=0;i<$scope.result.length;i++)
                 {  
                 jobSearchFactory.status($scope.candidateid,$scope.result[i].jb.jobcode)
                  .then(function(temp){
                     // console.log("result and status");
                     $scope.result.forEach(function(job)
                     {
                     if(job.jb.jobcode==temp[0].jobcode)
                     {
                     // console.log(job.jb.jobcode);
                     if(temp[0].status=="applied")
                     {
                      job.jb.applyStatus=true
                      // console.log(job.jb.applyStatus);
                     }
                     else{
                      job.jb.applyStatus=false
                      }
                     // console.log(job.jb.applyStatus);
                      }
                     })
                   })
                    .catch(function(error) {
                    $scope.message = "Some Error Occured "+err;
                });
                // console.log($scope.result[i].jb.jobcode+"status"+$scope.candidateid);
               }
              })
               .catch(function(error) {
                 // console.log("some error occured "+err);
                 $scope.message = "Some Error Occured "+err;
              });      
          };

         $scope.flag=[];
         $scope.applyToJob = function(jobcode,key)
         {
         var confirm = $mdDialog.confirm()
           .title('Apply')
           .textContent('You are about to apply for job "' + jobcode + '", please confirm..!')
           .ok('Confirm')
           .cancel('Cancel');

           $mdDialog.show(confirm).then(function() {
           $scope.flag[key]=true;
           jobSearchFactory.applyJob($scope.candidateid,jobcode)
            .then(function(temp){
             console.log(temp);
            })
            .catch(function(error){
              console.log(error);
           });
        });
       }
   }]);
})();