(function(){
 'use strict'
angular
  .module('sm-candidateprofile')
  .factory("jobSearchFactory", ['$http',function($http) {
   var obj = {};
   obj.searchJobDetails = function(){
       return $http.get('/jobProfile/getJobs');
   }
  obj.searchJobs = function(searchTxt,profs){
       return $http({
       method : 'GET',
       url : '/jobProfile/searchJobs/'+searchTxt+'/'+profs,
       })
   }
  obj.searchJobsByProfession = function(profs){
     console.log("in jobs fac by pro");
     console.log(profs+"single val");
         return $http({
         method : 'GET',
         url : '/jobProfile/jobsByProfession/'+profs,
         })
     }
  obj.applyJob = function(cid,jobcode){
        console.log("it is calling the applyJobs")
       return $http({
       method : 'POST',
       url : '/placementprocess/apply/',
       data:{
        candidateid:cid,
        jobcode:jobcode
       }
       })
   }  
   return obj;
}]);
})();