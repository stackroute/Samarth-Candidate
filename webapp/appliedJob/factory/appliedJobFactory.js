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
})();