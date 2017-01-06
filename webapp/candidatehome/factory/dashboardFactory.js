(function(){
 'use strict'
angular
  .module('sm-candidateprofile')
    .factory('dashboardFactory',dashboardFactory);

    function dashboardFactory($http) {
        var service = {
            getCandidatebyID: getCandidatebyID
        };
        return service;
        function getCandidatebyID(id) {
            // console.log(jpCode);
            return $http({
                method: 'GET',
                url: '/profile/'+ id
            })
        }
      }
  })();
