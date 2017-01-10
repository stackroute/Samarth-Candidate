(function(){
 'use strict'
angular
  .module('sm-candidateprofile')
  .factory("appliedJobFactory", ['$http',function($http) {
   var obj = {};
   obj.appliedJobs = function(candidateid){
        console.log("it is calling the appliedjobs")
       return $http({
       method : 'GET',
       url : 'placementprocess/appliedJobs/'+candidateid
       })
   }
   return obj;
	}])

  .factory("offeredDetails", ['$http',function($http) {
   var obj = {};
   obj.offers = function(candidateid){
        console.log("it is calling the offered detail jobs")
       return $http({
       method : 'GET',
       url : 'placementprocess/offeredDetails/'+candidateid
       })
   }
   return obj;
  }])

  .factory("joinFactory", ['$http',function($http) {
   var obj = {};
   obj.join = function(cid,jobcode){
        console.log("it is calling the joinjobs"+jobcode+cid)
       return $http({
       method : 'POST',
       url : '/placementprocess/join',
       data:{
        candidateid:cid,
        jobcode:jobcode
       }
       })
   }
   return obj;
  }])

  .factory("declineFactory", ['$http',function($http) {
   var obj = {};
   obj.decline = function(cid,jobcode){
        console.log("it is calling the declinejobs"+jobcode+cid)
       return $http({
       method : 'POST',
       url : '/placementprocess/decline',
       data:{
        candidateid:cid,
        jobcode:jobcode
       }
       })
   }
   return obj;
  }])

})();